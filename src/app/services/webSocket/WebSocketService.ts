import { IWebSocketConfig, IWebSocketMessage, WebSocketStatus } from '../../types/websocket';
import { IWebSocketService } from '../../interfaces/IWebSocketService';

export class WebSocketService implements IWebSocketService {
    private ws: WebSocket | null = null;
    private config: IWebSocketConfig;
    private status: WebSocketStatus = WebSocketStatus.DISCONNECTED;
    private eventListeners: Map<string, Set<(data: any) => void>> = new Map();

    constructor(config: IWebSocketConfig) {
        this.config = config;
    }

    async connect(): Promise<void> {
        if (this.ws?.readyState === WebSocket.OPEN) {
            console.log('Ya está conectado');
            return;
        }

        return new Promise((resolve, reject) => {
            try {
                this.updateStatus(WebSocketStatus.CONNECTING);
                console.log('Conectando a:', this.config.url);

                this.ws = new WebSocket(this.config.url);

                this.ws.onopen = () => {
                    console.log('Conectado exitosamente');
                    this.updateStatus(WebSocketStatus.CONNECTED);
                    resolve();
                };

                this.ws.onmessage = (event) => {
                    console.log('Mensaje recibido:', event.data);
                    try {
                        const data = JSON.parse(event.data);
                        
                        this.emit('message', data);
                        
                        if (data.type) {
                            this.emit(data.type, data);
                        }
                        
                        if (data.type === 'notification' || data.verb) {
                            this.emit('notification', data);
                        }
                        
                    } catch (error) {
                        console.error('Error parsing message:', error);
                        this.emit('message', event.data);
                    }
                };

                this.ws.onerror = (error) => {
                    console.error('Error:', error);
                    this.updateStatus(WebSocketStatus.ERROR);
                    reject(error);
                };

                this.ws.onclose = () => {
                    console.log('Desconectado');
                    this.updateStatus(WebSocketStatus.DISCONNECTED);
                    this.ws = null;
                };

            } catch (error) {
                console.error('Error al conectar:', error);
                reject(error);
            }
        });
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.updateStatus(WebSocketStatus.DISCONNECTED);
    }

    send(message: IWebSocketMessage): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }

    subscribe(event: string, callback: (data: any) => void): () => void {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event)!.add(callback);

        return () => {
            this.eventListeners.get(event)?.delete(callback);
        };
    }

    getStatus(): WebSocketStatus {
        return this.status;
    }

    isConnected(): boolean {
        return this.status === WebSocketStatus.CONNECTED;
    }

    private updateStatus(newStatus: WebSocketStatus): void {
        this.status = newStatus;
        this.emit('status_change', newStatus);
    }

    private emit(event: string, data: any): void {
        this.eventListeners.get(event)?.forEach(callback => callback(data));
    }
}
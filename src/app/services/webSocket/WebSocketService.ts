import { IWebSocketService } from "../../interfaces/IWebSocketService";
import { IWebSocketConfig, IWebSocketMessage, WebSocketStatus } from "../../types/websocket";

export class WebSocketService implements IWebSocketService {
    private ws: WebSocket | null = null;
    private status: WebSocketStatus = WebSocketStatus.DISCONNECTED;
    private eventListeners: Map<string, Set<(data: any) => void>> = new Map();
    private config: IWebSocketConfig;
  
    constructor(config: IWebSocketConfig) {
      this.config = config;
    }
  
    async connect(): Promise<void> {
      if (this.ws?.readyState === WebSocket.OPEN) {
        return; // Ya está conectado
      }
  
      return new Promise((resolve, reject) => {
        try {
          this.status = WebSocketStatus.CONNECTING;
          this.notifyStatusChange();
          
          this.ws = new WebSocket(this.config.url);
          
          // Timeout de conexión
          const timeout = setTimeout(() => {
            this.ws?.close();
            reject(new Error('Connection timeout'));
          }, 10000);
  
          this.ws.onopen = () => {
            clearTimeout(timeout);
            this.status = WebSocketStatus.CONNECTED;
            this.notifyStatusChange();
            console.log('✅ WebSocket conectado');
            resolve();
          };
  
          this.ws.onmessage = (event) => {
            try {
              const message: IWebSocketMessage = JSON.parse(event.data);
              console.log('📨 Mensaje recibido:', message);
              this.handleMessage(message);
            } catch (error) {
              console.error('❌ Error parsing message:', error);
            }
          };
  
          this.ws.onclose = (event) => {
            clearTimeout(timeout);
            this.status = event.wasClean ? WebSocketStatus.DISCONNECTED : WebSocketStatus.ERROR;
            this.notifyStatusChange();
            console.log('🔌 WebSocket desconectado:', event.code, event.reason);
          };
  
          this.ws.onerror = (error) => {
            clearTimeout(timeout);
            this.status = WebSocketStatus.ERROR;
            this.notifyStatusChange();
            console.error('❌ WebSocket error:', error);
            reject(new Error('WebSocket connection failed'));
          };
  
        } catch (error) {
          reject(error);
        }
      });
    }
  
    disconnect(): void {
      if (this.ws) {
        this.ws.close(1000, 'Manual disconnect');
        this.ws = null;
      }
      this.status = WebSocketStatus.DISCONNECTED;
      this.notifyStatusChange();
    }
  
    send(message: IWebSocketMessage): void {
      if (!this.isConnected() || !this.ws) {
        throw new Error('WebSocket no está conectado');
      }
      
      console.log('📤 Enviando mensaje:', message);
      this.ws.send(JSON.stringify(message));
    }
  
    subscribe(event: string, callback: (data: any) => void): () => void {
      // Crear el conjunto de listeners para este evento si no existe
      if (!this.eventListeners.has(event)) {
        this.eventListeners.set(event, new Set());
      }
      
      // Agregar el callback
      this.eventListeners.get(event)!.add(callback);
      
      console.log(`🔔 Suscrito al evento: ${event}`);
      
      // Retornar función para desuscribirse
      return () => {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
          listeners.delete(callback);
          console.log(`🔕 Desuscrito del evento: ${event}`);
          
          // Limpiar si no hay más listeners
          if (listeners.size === 0) {
            this.eventListeners.delete(event);
          }
        }
      };
    }
  
    getStatus(): WebSocketStatus {
      return this.status;
    }
  
    isConnected(): boolean {
      return this.ws?.readyState === WebSocket.OPEN;
    }
  
    // Métodos privados
    private handleMessage(message: IWebSocketMessage): void {
      // Notificar a listeners específicos del evento
      const listeners = this.eventListeners.get(message.event);
      if (listeners) {
        listeners.forEach(callback => {
          try {
            callback(message.data);
          } catch (error) {
            console.error(`❌ Error en callback para evento ${message.event}:`, error);
          }
        });
      }
      
      // También notificar a listeners globales (si los hay)
      const globalListeners = this.eventListeners.get('*');
      if (globalListeners) {
        globalListeners.forEach(callback => {
          try {
            callback(message);
          } catch (error) {
            console.error('❌ Error en callback global:', error);
          }
        });
      }
    }
  
    private notifyStatusChange(): void {
      const statusListeners = this.eventListeners.get('status_change');
      if (statusListeners) {
        statusListeners.forEach(callback => {
          try {
            callback(this.status);
          } catch (error) {
            console.error('❌ Error en callback de status:', error);
          }
        });
      }
    }
  }
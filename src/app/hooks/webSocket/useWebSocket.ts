import { useEffect, useRef, useCallback, useState } from 'react';
import { IWebSocketConfig, IWebSocketMessage, WebSocketStatus } from '../../types/websocket';
import { IWebSocketService } from '../../interfaces/IWebSocketService';
import { WebSocketService } from '../../services/webSocket/WebSocketService';

interface UseWebSocketOptions {
    url: string;
    autoConnect?: boolean;
    reconnectAttempts?: number;
}

export const useWebSocket = (options: UseWebSocketOptions) => {
    const [status, setStatus] = useState<WebSocketStatus>(WebSocketStatus.DISCONNECTED);
    const webSocketServiceRef = useRef<IWebSocketService | null>(null);
    const subscriptionsRef = useRef<Set<() => void>>(new Set());

    const initializeService = useCallback(() => {
        if (!webSocketServiceRef.current) {
            const config: IWebSocketConfig = {
                url: options.url,
                autoConnect: options.autoConnect ?? true,
                reconnectAttempts: options.reconnectAttempts ?? 3
            };

            webSocketServiceRef.current = new WebSocketService(config);

            const unsubscribeStatus = webSocketServiceRef.current.subscribe(
                'status_change',
                (newStatus: WebSocketStatus) => {
                    console.log('Status changed:', newStatus);
                    setStatus(newStatus);
                }
            );

            subscriptionsRef.current.add(unsubscribeStatus);
        }
    }, [options.url, options.autoConnect, options.reconnectAttempts]);

    // Funciones públicas
    const connect = useCallback(async () => {
        initializeService();
        if (webSocketServiceRef.current) {
            try {
                await webSocketServiceRef.current.connect();
            } catch (error) {
                console.error('Error al conectar:', error);
                throw error;
            }
        }
    }, [initializeService]);

    const disconnect = useCallback(() => {
        if (webSocketServiceRef.current) {
            webSocketServiceRef.current.disconnect();
        }
    }, []);

    const send = useCallback((message: IWebSocketMessage) => {
        if (webSocketServiceRef.current) {
            webSocketServiceRef.current.send(message);
        }
    }, []);

    const subscribe = useCallback((event: string, callback: (data: any) => void) => {
        initializeService();
        if (webSocketServiceRef.current) {
            const unsubscribe = webSocketServiceRef.current.subscribe(event, callback);
            subscriptionsRef.current.add(unsubscribe);

            return () => {
                unsubscribe();
                subscriptionsRef.current.delete(unsubscribe);
            };
        }
        return () => { };
    }, [initializeService]);

    useEffect(() => {
        if (options.autoConnect !== false) {
            connect().catch(error => {
                console.error('Auto-connect failed:', error);
            });
        }

        return () => {
            console.log('Limpiando WebSocket hook...');

            subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
            subscriptionsRef.current.clear();

            if (webSocketServiceRef.current) {
                webSocketServiceRef.current.disconnect();
            }
        };
    }, [connect, options.autoConnect]);

    return {
        status,
        connect,
        disconnect,
        send,
        subscribe,
        isConnected: status === WebSocketStatus.CONNECTED
    };
};
import React, { createContext, useContext, ReactNode } from 'react';
import { IWebSocketMessage, WebSocketStatus } from '../types/websocket';
import { useWebSocket } from '../hooks/webSocket/useWebSocket';

interface WebSocketContextValue {
    status: WebSocketStatus;
    connect: () => Promise<void>;
    disconnect: () => void;
    send: (message: IWebSocketMessage) => void;
    subscribe: (event: string, callback: (data: any) => void) => () => void;
    isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
    wsBaseUrl: string;
    token: string;
    autoConnect?: boolean;
    reconnectAttempts?: number;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
    wsBaseUrl,
    token,
    autoConnect = true,
    reconnectAttempts = 3
}) => {
    const fullUrl = `${wsBaseUrl}/ws/notifications/?token=${token}`;
    console.log(fullUrl)

    const websocket = useWebSocket({
        url: fullUrl,
        autoConnect,
        reconnectAttempts
    });

    return (
        <WebSocketContext.Provider value={websocket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocketContext debe usarse dentro de WebSocketProvider');
    }
    return context;
};
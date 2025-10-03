export interface IWebSocketMessage {
    event: string;
    data: any;
    timestamp?: string;
}

export enum WebSocketStatus {
    DISCONNECTED = 'disconnected',
    CONNECTING = 'connecting',
    CONNECTED = 'connected',
    ERROR = 'error'
}

export interface IWebSocketConfig {
    url: string;
    autoConnect?: boolean;
    reconnectAttempts?: number;
}
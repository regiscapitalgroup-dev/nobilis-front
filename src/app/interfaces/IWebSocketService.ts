import { IWebSocketMessage, WebSocketStatus } from "../types/websocket";

export interface IWebSocketService {
    connect(): Promise<void>;
    disconnect(): void;
    send(message: IWebSocketMessage): void;
    subscribe(event: string, callback: (data: any) => void): () => void;
    getStatus(): WebSocketStatus;
    isConnected(): boolean;
}

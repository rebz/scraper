export declare class ErrorService {
    protected handler: (object: object) => void;
    contructor(): void;
    setHandler(callback: (ErrorHandlerInterface: any) => void): Promise<void>;
    handle(uri: string, error: object): Promise<void>;
}
export declare const ErrorServiceType: unique symbol;
export interface ErrorHandlerInterface {
    uri: string;
    error: object;
}
export interface ErrorInterface {
}

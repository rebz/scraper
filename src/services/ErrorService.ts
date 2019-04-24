import { injectable } from "inversify";

@injectable()
export class ErrorService {

    protected handler: (object: object) => void;

    contructor () {
        this.handler = console.error // default handler
    }

    public async setHandler(callback: (ErrorHandlerInterface) => void) {
        this.handler = callback
    }

    // @todo - cleanup, use Interface
    public async handle(uri: string, error: object) {
        this.handler({ 
            uri, 
            error: error['message'],
            name: error['name'],
            line: error['lineNumber'],
            stack: error['stack'],
        })
    }
}

export const ErrorServiceType = Symbol.for("ErrorService");

export interface ErrorHandlerInterface {
    uri: string;
    error: object;
}
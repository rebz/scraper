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
            error: error['message'] ? error['message'] : null,
            name: error['name'] ? error['name'] : null,
            line: error['lineNumber'] ? error['lineNumber'] : null,
            stack: error['stack'] ? error['stack'] : null,
        })
    }
}

export const ErrorServiceType = Symbol.for("ErrorService");

export interface ErrorHandlerInterface {
    uri: string;
    error: object;
}

// TODO : 
export interface ErrorInterface {

}
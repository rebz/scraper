import { injectable } from "inversify";

@injectable()
export class BrowserService {
    protected test: string;
    public constructor() {
        this.test = 'test';
    }
}

export const BrowserServiceType = Symbol.for("BrowserService");
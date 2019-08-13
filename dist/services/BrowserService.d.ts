import { ErrorService } from './ErrorService';
export declare class BrowserService {
    protected $browser: any;
    protected $page: any;
    errorService: ErrorService;
    constructor(errorService: ErrorService);
    goTo(uri: string, selector: string): Promise<any>;
    getValueFromSelector(selector: string): Promise<any>;
    getUrisFromSelector(selector: string): Promise<any>;
    hasSelector(selector: string): Promise<boolean>;
    private newPage;
    private browserCheck;
    private pageCheck;
    private openBrowser;
    closeBrowser(): Promise<void>;
}
export declare const BrowserServiceType: unique symbol;
export interface ISomeObject {
}

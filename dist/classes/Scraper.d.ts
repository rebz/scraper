import { BrowserService } from './../services/BrowserService';
import { ErrorService, ErrorHandlerInterface } from './../services/ErrorService';
import ScrapeSiteInterface from '../interfaces/ScrapeSiteInterface';
export default class Scraper {
    protected $data: object;
    protected $uri: string;
    protected $selectors: object;
    protected $paginationSelector: string;
    protected $paginationHandler: any;
    browserService: BrowserService;
    errorService: ErrorService;
    protected $listening: boolean;
    protected $listenHandler: (data: object) => void;
    constructor(browserService: BrowserService, errorService: ErrorService);
    setConfig(config: ScrapeSiteInterface): this;
    scrape(uri?: string): Promise<void>;
    listen(listenHandler: (data: object) => void): void;
    errors(errorHandler: (arg0: ErrorHandlerInterface) => void): void;
    autoScrape(): Promise<boolean>;
    private goToPage;
    private retrieveSelectorValues;
    hasNext(): Promise<boolean>;
    getNext(): Promise<any>;
    getData(): {
        uri: string;
        scraped: object;
    };
    stop(): Promise<void>;
}

import { inject, injectable } from "inversify"
import { BrowserService, BrowserServiceType } from './../services/BrowserService'
import { ErrorService, ErrorServiceType, ErrorHandlerInterface } from './../services/ErrorService'

import ScrapeSiteInterface from '../interfaces/ScrapeSiteInterface'
import { cloneObjectUpdateValues, cleanScrapedValue } from '../helpers/scrape'

@injectable()
export default class Scraper {

    protected $data: object;
    protected $uri: string;
    protected $selectors: object;
    
    protected $paginationSelector: string;
    protected $paginationHandler: any;
    
    public browserService: BrowserService;
    public errorService: ErrorService;

    protected $listening: boolean;
    protected $listenHandler: (data: object) => void;

    constructor (
        @inject(BrowserServiceType) browserService: BrowserService,
        @inject(ErrorServiceType) errorService: ErrorService
    ) {
        this.browserService = browserService;
        this.errorService = errorService;
        this.$listening = false
        this.$data = {}
    }
    
    /**
     *  Sets the Class config for scraping data
     *  @param {object} config - ScrapeSiteInterface
     */
    public setConfig(config: ScrapeSiteInterface) {
        this.$uri = config.uri
        this.$selectors = config.selectors
        const { selector, handler } = config.pagination
        this.$paginationHandler = handler
        this.$paginationSelector = selector
        return this
    }

    /**
     *  Returns scraped data, determined by config
     *  @param {string} uri
     */
    public async scrape(uri?: string) {
        if (uri) this.$uri = await uri

        try {
            await this.goToPage()
            this.$data = await this.retrieveSelectorValues()
            await this.$listening && this.$listenHandler(this.getData())

        } catch (e) {
            await this.errorService.handle(this.$uri, e)
        }
    }

    /**
     *  ...
     */
    public listen(listenHandler: (data: object) => void) {
        this.$listening = true
        this.$listenHandler = listenHandler;
    }

    /**
     *  ...
     */
    public errors(errorHandler: (ErrorHandlerInterface) => void) {
        this.errorService.setHandler(errorHandler)
    }

    /**
     *  Auto-Srape
     */
    public async autoScrape() {

        if (!this.$paginationHandler || !this.$paginationSelector) {
            return false
        }

        await this.scrape()

        while (await this.hasNext()) {
            const next = await this.getNext()
            const uri = await this.$paginationHandler(this.$uri, next)
            await this.scrape(uri)
        }
    }

    /**
     *  Navigate to a new Webpage
     */
    private async goToPage() {
        const selectorCheck = this.$selectors[Object.keys(this.$selectors)[0]] // get first element selector
        await this.browserService.goTo(this.$uri, selectorCheck)
    }

    /**
     *  Returns the innerHTML of a all selector values
     */
    private async retrieveSelectorValues() {
        const selectors = this.$selectors
        // const page = this.$page
        const page = this.browserService
        return await cloneObjectUpdateValues(selectors, async (selector) => 
            await cleanScrapedValue(
                await page.getValueFromSelector(selector)
            )
        );
    }

    /**
     *  Checks if there is an additional page to scrape
     */
    public async hasNext() {
        if (!this.$paginationSelector) {
            return false
        }
        return await this.browserService.hasSelector(this.$paginationSelector)
    }
    
    /**
     *  Checks if there is an additional page to scrape
     */
    public async getNext() {
        if (!this.$paginationSelector) {
            return false
        }
        return await this.browserService.getUrisFromSelector(this.$paginationSelector)
    }

    /**
     *  Return recently scraped data and the Uri where originated
     */
    public getData() {
        return {
            uri: this.$uri,
            scraped: this.$data
        }
    }

    /**
     *  Close the BrowserService Session
     */
    public async stop() {
        await this.browserService.closeBrowser();
    }
}
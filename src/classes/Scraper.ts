import { inject, injectable } from "inversify"
import { BrowserService, BrowserServiceType } from './../services/BrowserService'
import ScrapeSiteInterface from '../interfaces/ScrapeSiteInterface'
import { cloneObjectUpdateValues, cleanScrapedValue } from '../helpers/scrape'

@injectable()
export default class Scraper {

    protected $data: object;                // selector values
    protected $uri: string;                 // config
    protected $selectors: object;           // config
    protected $paginationSelector: string;  // selector value
    
    public browserService: BrowserService;

    constructor (
        @inject(BrowserServiceType) browserService: BrowserService
    ) {
        this.browserService = browserService;
        this.$data = {}
    }
    
    /**
     *  Sets the Class config for scraping data
     *  @param {object} config - ScrapeSiteInterface
     */
    public setConfig(config: ScrapeSiteInterface) {
        this.$uri = config.uri
        this.$selectors = config.selectors
        this.$paginationSelector = config.paginationSelector
        return this
    }

    /**
     * Returns scraped data, determined by config
     */
    public async scrape() {
        await this.goToPage()
        await this.retrieveSelectorValues()
        return Promise.resolve(this);
    }

    public async goToPage(uri?: string) {
        if (uri) this.$uri = uri
        const selectorCheck = this.$selectors[Object.keys(this.$selectors)[0]] // get first element selector
        await this.browserService.goTo(this.$uri, selectorCheck)
    }

    private async retrieveSelectorValues() {
        const selectors = this.$selectors
        // const page = this.$page
        const page = this.browserService
        this.$data = await cloneObjectUpdateValues(selectors, async (selector) => 
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
     *  Returns recently scraped data
     */
    public getData() {
        return this.$data
    }

    /**
     *  Closes BrowserService Session
     */
    public async stop() {
        await this.browserService.closeBrowser();
    }
}
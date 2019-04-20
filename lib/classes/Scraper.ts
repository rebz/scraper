import * as puppeteer from 'puppeteer';
import ScrapeSiteInterface from './../interfaces/ScrapeSiteInterface';
import { cloneObjectUpdateValues, cleanScrapedValue } from './../helpers/scrape'

/**
 *  Scraper allows for the scraping of a single 
 *  page or multiple using the same layout.
 */
export default class Scraper {

    protected $data: object;        // selector values

    protected $uri: string;         // config
    protected $selectors: object;   // config
    
    protected $browser: any;        // puppeteer browser instance
    protected $page: any;           // page object returned from this.$browser

    /**
     *  Instantiates the class.
     *  @param {object} config - ScrapeSiteInterface
     */
    constructor (config: ScrapeSiteInterface) {
        this.setConfig(config)
        this.$data = {}
    }

    /**
     *  Sets the Class config for scraping data
     *  @param {object} config - ScrapeSiteInterface
     */
    public setConfig(config: ScrapeSiteInterface) {
        this.$uri = config.uri
        this.$selectors = config.selectors
        return this
    }

    /**
     * Returns scraped data, determined by config
     */
    public async scrape() {
        await this.pageCheck()
        await this.$page.goto(this.$uri);
        const selectorCheck = this.$selectors[Object.keys(this.$selectors)[0]] // get first element selector
        await this.$page.waitForSelector(selectorCheck); // check if element has loaded
        await this.retrieveSelectorValues()
    }

    private returnInstance() {
        return this
    }

    private async browserCheck() {
        if (!this.$browser) {
            await this.openBrowser()
        }
    }

    private async pageCheck() {

        await this.browserCheck()

        if (!this.$page) {
            await this.newPage()
        }
    }

    /**
     *  Open a new Puppeteer Browser
     */
    private async openBrowser() {
        this.$browser = await puppeteer.launch();
    }

    /**
     *  Close Puppeteer Browser
     */
    // private async closeBrowser() {
    //     await this.$browser.close();
    // }

    /**
     *  Open a new Page in the Puppeteer Browser
     */
    private async newPage() {
        this.$page = await this.$browser.newPage();
    }


    /**
     *  ...
     */
    public getData() {
        return this.$data
    }

    public async retrieveSelectorValues() {
        const selectors = this.$selectors
        const page = this.$page
        this.$data = await cloneObjectUpdateValues(selectors, async (selector) => 
            await cleanScrapedValue(
                await page.evaluate(el => document.querySelector(el).innerHTML, selector)
            )
        );
    }


    // returns true or false
    // will check to if the pagination selector exists
    public hasNext() {
        console.log('has next')
        return this
    }

    // returns a URI
    public getNext() {
        console.log('get next')
        return this
    }
}
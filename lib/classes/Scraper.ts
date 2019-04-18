import * as cheerio from 'cheerio';
import axios from 'axios';
import ScrapeSiteInterface from './../interfaces/ScrapeSiteInterface';
import { cloneObjectUpdateValues, cleanScrapedValue } from './../helpers/scrape'

export default class Scraper {

    protected $uri: string;         // config
    protected $selectors: object;   // config
    protected $html: cheerio;       // cheerio instance, `this.$html('selector')`
    protected $data: object;        // selector values

    /**
     * Instantiates the class.
     * @param {object} config - ScrapeSiteInterface
     */
    constructor (config: ScrapeSiteInterface) {
        this.setConfig(config)
        this.$data = {}
    }

    /**
     * Returns scraped data, determined by config
     */
    public async scrape() {
        this.$html = await this.getHtml()
        this.$data = await this.retrieveSelectorValues()
        return this.$data
    }

    private async getHtml() {
        const { data: html } = await axios.get(this.$uri);
        return cheerio.load(html);
    }

    private async retrieveSelectorValues() {
        const selectors = this.$selectors
        const html = this.$html
        const scrapedData = await cloneObjectUpdateValues(selectors, selector => cleanScrapedValue(html(selector).html()));
        return scrapedData
    }

    /**
     * Sets the Class' config for scraping data
     * @param {object} config - ScrapeSiteInterface
     */
    public setConfig(config: ScrapeSiteInterface) {
        this.$uri = config.uri
        this.$selectors = config.selectors
    }

    // returns true or false
    // will check to if the pagination selector exists
    public hasNext() {

    }

    // returns a URI
    public getNext() {

    }
}


/** 
 *  @todo
 * 
 */
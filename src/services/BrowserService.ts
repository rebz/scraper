import { injectable } from "inversify";
import * as puppeteer from 'puppeteer';

@injectable()
export class BrowserService {
    
    protected $browser: any;        // puppeteer browser instance
    protected $page: any;           // page object returned from this.$browser

    constructor() {
    }
    
    /**
     *  @param {string} uri - URL to visit
     *  @param {string} selector - Wait for element to appear on page
     */
    public async goTo(uri: string, selector: string) {
        await this.pageCheck();
        await this.$page.goto(uri);
        await this.$page.waitForSelector(selector); // check if element has loaded
    }

    public async getValueFromSelector(selector: string) {
        return await this.$page.evaluate(el => document.querySelector(el).innerHTML, selector)
    }

    /**
     *  Check if the current page has an element
     */
    public async hasSelector(selector: string) {
        console.log('check for selector: ' + selector)
        try {
           await this.$page.waitForSelector(selector, { timeout: 5000 })
           console.log('found the selector')
           return true
        } catch (e) {
            console.log('return false dawg')

            return false
        }
    }


    /**
     *  Close Puppeteer Browser
     */
    public async closeBrowser() {
        if (this.$browser) await this.$browser.close();
    }

    /**
     *  Check if next page exists via 
     *  pagination selector
     */
    public hasNext() {
        console.log('browserService.hasNext()')
        console.log('@TODO - define pagination selector and logic')
        return this
    }

    // returns a URI
    public getNext() {
        console.log('browserService.getNext()')
        console.log('@TODO - define pagination selector and logic')
        return this
    }


    



    /**
     *  Open a new Page in the Puppeteer Browser
     */
    private async newPage() {
        this.$page = await this.$browser.newPage();
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
}

export const BrowserServiceType = Symbol.for("BrowserService");
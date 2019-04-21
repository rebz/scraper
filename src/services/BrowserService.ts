import { injectable } from "inversify";
import * as puppeteer from 'puppeteer';

@injectable()
export class BrowserService {
    
    protected $browser: any;        // puppeteer browser instance
    protected $page: any;           // page object returned from this.$browser

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

    public async getUrisFromSelector(selector: string) {
        return await this.$page.evaluate(el => {
            const anchors = document.querySelector(el).getElementsByTagName('a')
            const links = {};
            
            for (let i = 0, length = anchors.length; i < length; i++) {
                links[anchors[i].innerHTML] = anchors[i].getAttribute('href');
            }

            return links;
        }, selector)
    }

    /**
     *  Check if the current page has an element
     */
    public async hasSelector(selector: string) {
        try {
            await this.$page.waitForSelector(selector, { timeout: 5000 })
            return true
        } catch (e) {
            return false
        }
    }

    /**
     *  Open a new Page in the Puppeteer Browser
     */
    private async newPage() {
        this.$page = await this.$browser.newPage();
    }

    /**
     *  Open a new Browser if one does not exist
     */
    private async browserCheck() {
        if (!this.$browser) {
            await this.openBrowser()
        }
    }

    /**
     *  Open a new Page if one does not exist
     */
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
    public async closeBrowser() {
        if (this.$browser) await this.$browser.close();
    }
}

export const BrowserServiceType = Symbol.for("BrowserService");
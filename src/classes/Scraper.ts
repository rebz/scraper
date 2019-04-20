import { inject, injectable } from "inversify"
import { BrowserService, BrowserServiceType } from './../services/BrowserService'

@injectable()
export default class Scraper {

    public browserService: BrowserService;

    constructor (
        @inject(BrowserServiceType) browserService: BrowserService
    ) {
        console.log('construct Scraper')
    }
}
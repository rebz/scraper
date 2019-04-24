import "reflect-metadata";
import { Container } from "inversify";
import { BrowserService, BrowserServiceType } from "./services/BrowserService";
import { ErrorService, ErrorServiceType } from './services/ErrorService'
import Scraper from "./classes/Scraper";

declare global {
    type AnyClass = { new (): any };
}

export default () => {
    let container = new Container();
    container.bind<BrowserService>(BrowserServiceType).to(BrowserService).inSingletonScope();
    container.bind<ErrorService>(ErrorServiceType).to(ErrorService).inSingletonScope();
    const scraper = container.resolve(Scraper)
    return scraper
}
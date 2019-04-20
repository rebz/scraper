import "reflect-metadata";
import { Container } from "inversify";
import { BrowserService, BrowserServiceType } from "./services/BrowserService";
import Scraper from "./classes/Scraper";

declare global {
    type AnyClass = { new (): any };
}

export default () => {
    let container = new Container();
    container.bind<BrowserService>(BrowserServiceType).to(BrowserService).inSingletonScope();
    const scraper = container.resolve(Scraper)
    return scraper
}
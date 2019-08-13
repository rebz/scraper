import "reflect-metadata";
import Scraper from "./classes/Scraper";
declare global {
    type AnyClass = {
        new (): any;
    };
}
declare const _default: () => Scraper;
export default _default;

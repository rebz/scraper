// @TODO - further define config interface
export default interface ScrapeSite {
    uri: string;
    selectors: object;
    pagination?: any;
    // config: object;
}
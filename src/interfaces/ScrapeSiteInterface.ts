// @TODO - further define config interface
export default interface ScrapeSite {
    uri: string;
    selectors: object;
    paginationSelector?: string;
    // config: object;
}
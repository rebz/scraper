# Scraper

> WIP

Scrape data from a website, pass an object with `{key: '#selector'}` and receive `{key: 'selector value'}`

## Goals of Project

- Create `SiteModel` that will be fed into a new Scraper Class
- Scraper class will accept a URI and config defining what to scrape
- An optional pagination selector may be passed into the Scraper Class to enable pagination
- Scraped data will be passed back to `SiteModel` where data will be saved

# Example usage

```ts
// index.ts
import Scraper from './lib/classes/Scraper'
const config = {
    uri: 'http://example.com',
    selectors: {
        key1: 'span#key1selector',
        key2: 'span#key2selector',
        key3: 'span#key3selector',
    }
};
const site = new Scraper(config);
site.scrape().then(() => {
    console.log(site.getData())
})
```

`ts-node index.ts` will produce:


```
{
    key1: 'html content from span with an id of #key1selector',
    key2: 'html content from span with an id of #key2selector',
    key3: 'html content from span with an id of #key3selector',
}
```

# TODO
1. Abstract Puppeteer into `BrowserService`
1. Inject `BrowserService` into `Scraper`
1. Scraper Pagination
    - create `baseUri` from `uri`
    - create `path` from `uri`
    - define `paginationPath` selector
    - parse value returned from `paginationPath` selector
    - ...
1. Scraper Job
    - define `frequency` number
    - define `proxies` array
    - ...
1. Expand sanitization of retrieved values
1. Root configs setup (tslint, tsconfig, etc)
1. Unit Tests (Mocha)
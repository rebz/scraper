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

import Scraper from './src/index'

const config = {
    uri: 'http://example.com',
    pagination: {
        selector: 'div.prev_next',
        // custom handler for determining next page
        handler: async (currentUri: string, uris: any) => {
            const url = new URL(currentUri)
            const newPath = uris[Object.keys(uris).filter(k => k.indexOf('Prev') != -1)[0]]
            return url.origin+newPath
        }
    },
    selectors: {
        key1: 'span#key1selector',
        key2: 'span#key2selector',
        key3: 'span#key3selector',
    }
};

// your custom scrape function
(async () => {
    const scraper = Scraper().setConfig(config);

    // single scrape
    await scraper.scrape()
    console.log(scraper.getData())
    
    // go to another page and single scrape
    await scraper.goToPage('http://example2.com')
    await scraper.scrape()
    console.log(scraper.getData())

    // auto scrape and use config.pagination
    await scrapper.autoScrape()

    // end BrowserSession
    await scraper.stop()
})()
```

`ts-node index.ts` will produce:

```
{
    key1: 'example.com: innerHTML from selector',
    key2: 'example.com: innerHTML from selector',
    key3: 'example.com: innerHTML from selector',
}
{
    key1: 'example2.com: innerHTML from selector',
    key2: 'example2.com: innerHTML from selector',
    key3: 'example2.com: innerHTML from selector',
}
```

# TODO
1. `ScraperJob`
    - define `frequency` number
    - define `proxies` array
    - ...
1. `ScraperSiteInterface`
    - Used for Model
    - `save()` method to save to "DB"
    - ...
1. Expand sanitization of retrieved values
1. Root configs setup (tslint, tsconfig, etc)
1. Unit Tests (Mocha)
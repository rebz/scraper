# Scraper

> WIP &mdash; Scrape data from a website, pass an object with `{key: '#selector'}` and receive `{key: 'selector value'}`

## Goals of Project

- Create `SiteModel` that will be fed into a new Scraper Class
- Scraper class will accept a URI and config defining what to scrape
- An optional pagination selector may be passed into the Scraper Class to enable pagination
- Scraped data will be passed back to `SiteModel` where data will be saved

## Install

`npm i @rebz/scraper`

# Example usage

```js
// index.js
const Scraper = require('./dist/index').default

const config = {
    uri: 'http://example.com',
    pagination: { // custom pagination handler
        selector: 'div.prev_next', // element/classname selector of target
        // custom handler for determining next page
        handler: async (currentUri, uris) => {
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

    // Handler to save scraped data
    const saveData = (data) => console.log(data)

    // Handler for errors
    const customErrorHandler = (error) => console.error(error)

    // Setup Scraper
    const scraper = Scraper().setConfig(config);

    // Define a custom Error Handler, returns URI and Error
    await scraper.errors(customErrorHandler)

    // Scrape page and save
    await scraper.scrape()
    await saveData(scraper.getData())

    // ...go to another page, scrape, and save
    await scraper.scrape('http://example.com')
    await saveData(scraper.getData())

    // ...or listen for scrape and apply handler
    await scraper.listen(saveData)

    // if pagination is set you may auto scrape
    await scraper.autoScrape()

    // close the active browser session when finished
    await scraper.stop()
})()
```

`node index.js` will produce:

```
// scrape
{ 
    uri: 'http://example.com',
    scraped: { 
        key1: 'example.com: innerHTML from selector',
        key2: 'example.com: innerHTML from selector',
        key3: 'example.com: innerHTML from selector'
    } 
}
// scrape
{ 
    uri: 'http://example2.com',
    scraped: { 
        key1: 'example2.com: innerHTML from selector',
        key2: 'example2.com: innerHTML from selector',
        key3: 'example2.com: innerHTML from selector'
    } 
}
// ...auto scrape objects after
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

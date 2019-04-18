# Scraper

> WIP

Scrape data from a website, pass an object with `{key: '#selector'}` and receive `{key: 'selector value'}`

# Requirements

* `npm i -g ts-node` or  `npm i -D ts-node`
* `npm i -g typescript` or  `npm i -D typescript`

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
site.scrape().then(console.log)
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
1. Scraper Pagination
    - create `baseUri` from `uri`
    - create `path` from `uri`
    - define `paginationPath` selector
    - parse value returned from `paginationPath` selector
    - ...
1. Scraper Job
    - define `frequency`
    - ...
1. Remove axios
    - create `HttpService` class
1. Expand sanitization of retrieved values
1. Add root configs (tslint, tsconfig, etc)
1. Unit Tests
1. Possibly move to headless chrome, Puppeteer
1. Add to NPM
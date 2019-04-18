import Scraper from './lib/classes/Scraper'

// this is an example, it does not actually work
const config = {
    uri: 'http://www.example.com',
    selectors: {
        id: 'el#id',
        class: 'el.class',
        attr: 'el[attr="val"]',
    }
};
const site = new Scraper(config);
site.scrape().then(console.log)
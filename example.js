import Scraper from './src/index'

const config = {
    uri: 'https://www.example.com/',
    pagination: {
        selector: 'div.prev_next',
        handler: async (currentUri, uris) => {
            const url = new URL(currentUri)
            const newPath = uris[Object.keys(uris).filter(k => k.indexOf('Next') != -1)[0]]
            return newPath && url.origin+newPath
        }
    },
    selectors: {
        id: 'el#id',
        class: 'el.class',
        attr: 'el[attr="val"]',
        specifictychainsaresafehere: 'ul.news > li.first > p.title span[data-why-would-this-exist="..."]',
    }
};

(async () => {
    const scraper = Scraper().setConfig(config);
    scraper.errors(console.error)
    scraper.listen(console.log)
    await scraper.autoScrape() // or scrape a single page: `scraper.scrape()`
    if (scraper.stop()) {
        console.info('done scraping')
    }
})()

/*  Parse HTML using DOMParser
    var xmlString = "<div id='foo'><a href='#'>Link</a><span></span></div>";
    doc = new DOMParser().parseFromString(xmlString, "text/xml");
    console.log(doc.firstChild.innerHTML); // => <div id="foo">...
    console.log(doc.firstChild.firstChild.innerHTML); // => <a href="#">..
*/
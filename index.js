const ScraperApp = require("./PuppeteerScraper");

const scraper = new ScraperApp();
( async () => scraper.startScraper() ) ();
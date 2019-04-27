const puppeteer = require('puppeteer');
const randomUA = require('modern-random-ua');


module.exports = class PuppeteerScraper {
    constructor(configPath= "../config/scrapingConfig.json") {
        this.browser = null;
        this.page = null;
        this.url = "http://rivanimal.org/";
        require('dotenv').config();
    }

    async initializePuppeteer() {
        this.browser = await puppeteer.launch({
            userAgent: randomUA.generate(),
            headless: false,
            args: ['--no-sandbox']
        });
        this.page = await this.browser.newPage();
    }


    async startScraper() {
        await this.initializePuppeteer();

        console.log("---");
        console.log("extracting content of ");
        console.log(this.url);
        await this.page.goto(this.url, {waitUntil: 'load', timeout: 0});

        await this.extractUrls();
    }

    async extractUrls(){
        //extract all divs with animal data
        const divs = await this.page.$$('div.card-footer');
        for (const div of divs) {
            this.extractUrlFromDiv(div);
        }
    }

    async extractUrlFromDiv(div){
        const a = await div.$('a');
        const href =  await (await a.getProperty('href')).jsonValue();
        console.log(href);

    }


}

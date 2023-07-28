const puppeteer = require('puppeteer');
const config = require("./config");

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const url = config.API_URL;
    const containerSelector = config.CONTAINER_SELECTOR;


    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

    await page.waitForSelector(containerSelector, { timeout: 10000 });

    const reviews = await page.evaluate((config) => {

        const containSelector = config.CONTAIN_SELECTOR;
        const nameSelector = config.NAME_SELECTOR;
        const dateSelector = config.DATE_SELECTOR;
        const commentSelector = config.COMMENT_SELECTOR;
        const reviewElements = document.querySelectorAll(containSelector);

        const reviewsData = [];
        reviewElements.forEach((reviewElement) => {
            const name = reviewElement.querySelector(nameSelector)?.innerHTML || '';
            const date = reviewElement.querySelector(dateSelector)?.innerHTML || '';
            const comment = reviewElement.querySelector(commentSelector)?.innerHTML || '';

            reviewsData.push({
                name,
                date,
                comment,
            });
        });

        return reviewsData;
    }, config);

    console.log(reviews);

    await browser.close();
})();

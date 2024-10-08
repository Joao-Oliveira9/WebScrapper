"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require('puppeteer');
async function botTeste() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const URL = "https://www.youtube.com/watch?v=jDI1Z2PjOa0";
    // Navigate the page to a URL
    await page.goto(URL);
    await page.waitForSelector('yt-formatted-string.style-scope.ytd-watch-metadata', { timeout: 5_000 });
    const titulo = await page.evaluate(() => {
        return document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata').innerText;
    });
    console.log('The title of this blog post is "%s".', titulo);
    await browser.close();
}
async function teste2() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false, isMobile: false });
    const page = await browser.newPage();
    await page.goto("https://www.latamairlines.com/");
    try {
        await page.waitForSelector("#cookies-politics-button.sc-dCFHLb.cUCRQG.sc-kdBSHD.sc-hYmls.cQSA-dW.eISrvA", {
            timeout: 50000_000,
        });
        await page.click("#cookies-politics-button.sc-dCFHLb.cUCRQG.sc-kdBSHD.sc-hYmls.cQSA-dW.eISrvA");
        console.log("clicadinha");
    }
    catch {
        console.log("erro");
    }
    try {
        await page.waitForSelector("#lblInputOrigin.sc-jypuc.jomLGV", {
            timeout: 50000_000,
        });
        await page.type("#lblInputOrigin.sc-jeypuc.jomLGV", "SAO");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await page.type("#lblInputDestination.sc-jeypuc.jomLGV", "RIO");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await page.screenshot({ path: 'buddy-screenshot.png' });
    }
    catch {
        console.log("erro");
    }
    try {
        await page.waitForSelector("#header__profile__lnk-sign-in.sc-satoz.cQkIIy", {
            timeout: 5_000,
        });
        const title = await page.evaluate(() => {
            return document.querySelector("#header__profile__lnk-sign-in.sc-satoz.cQkIIy").innerText;
        });
        console.log(title);
    }
    catch {
        console.log("erro");
    }
    finally {
        await browser.close();
    }
}
teste2();
//# sourceMappingURL=index.js.map
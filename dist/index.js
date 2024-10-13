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
async function cookies(page) {
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
}
async function inserirOrigemDestino(page) {
    try {
        await page.waitForSelector(".Tabstyles__BottomDecoration-sc-oh5dk1-1.cRNsPM", {
            timeout: 50000_000,
        });
        await page.click(".Tabstyles__BottomDecoration-sc-oh5dk1-1.cRNsPM");
        console.log("puta");
    }
    catch {
        console.log("putinha");
    }
    try {
        await page.waitForSelector(".sc-dcCXRD.dxoMgK", {
            timeout: 50000_000,
        });
        await page.click(".sc-dcCXRD.dxoMgK");
    }
    catch { }
    try {
        await page.waitForSelector("#txtInputOrigin--text-field.sc-gdyeKB.gUMYPB.sc-bDpDS.coUuHR.sc-YysOf.hQQeCu", {
            timeout: 50000_000,
        });
        await page.type("#txtInputOrigin--text-field.sc-gdyeKB.gUMYPB.sc-bDpDS.coUuHR.sc-YysOf.hQQeCu", "SAO");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await page.click("#btnContinueCTA.sc-kUXCeW.sc-eRdibt.lpYpc.hPAZrU");
    }
    catch { }
    await page.click(".sc-crvIOg.dgMThn");
    await page.type("#txtInputDestination--text-field.sc-gdyeKB.gUMYPB.sc-bDpDS.coUuHR.sc-YysOf.hQQeCu", "RIO");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.click("#btnContinueCTA.sc-kUXCeW.sc-eRdibt.lpYpc.hPAZrU");
}
async function inserirIdaVolta(page) {
}
async function teste2() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false, isMobile: false });
    const page = await browser.newPage();
    await page.goto("https://www.latamairlines.com/");
    await cookies(page);
    try {
        await page.waitForSelector("", {
            timeout: 1000,
        });
    }
    catch { }
    await inserirOrigemDestino(page);
    await inserirIdaVolta(page);
    await page.screenshot({ path: 'buddy-screenshot.png' });
    await browser.close();
}
teste2();
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
async function teste() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer_1.default.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.youtube.com/watch?v=4W55nFDyIrc&t=82s");
    await page.waitForSelector("yt-formatted-string.style-scope.ytd-watch-metadata", { timeout: 5_000 });
    const title = await page.evaluate(() => {
        return document.querySelector("yt-formatted-string.style-scope ytd-watch-metadata").innerText;
    });
    console.log(title);
    await browser.close();
}
teste();
//# sourceMappingURL=index.js.map
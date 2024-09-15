"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const port = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.post("/", (req, res) => {
    console.log(req.body.data);
    res.send("Deu certo");
});
app.listen(port, () => {
    console.log("Servidor conectedo na porta 8000");
});
async function teste() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.youtube.com/watch?v=4W55nFDyIrc&t=82s");
    await page.waitForSelector("yt-formatted-string.style-scope.ytd-watch-metadata", { timeout: 5_000 });
    const title = await page.evaluate(() => {
        return document.querySelector("yt-formatted-string.style-scope.ytd-watch-metadata").innerText;
    });
    console.log(title);
    await browser.close();
}
/* teste(); */
//# sourceMappingURL=index.js.map
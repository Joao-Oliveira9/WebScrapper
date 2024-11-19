"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
golzinho();
//document.getElementById("lbl_priceValue_1_emission").innerText
//#lnk_orderBy_emission.a-linked-btn
//#3.a-radio__input
//#modal-filter-btn-apply.a-btn.a-btn--orange
//#lbl_priceValue_1_emission
//#btn_selectReturnFlight_emission.m-button.m-button--isEnabled
//origem,dataorigem,datasaida,destino
async function golzinho() {
    let url = "https://b2c.voegol.com.br/compra/busca-parceiros?pv=br&tipo=DF&de=GRU&para=BSB&ida=23-11-2024&volta=24-11-2024&ADT=1&ADL=0&CHD=0&INF=0&voebiz=0";
    let valor1 = "";
    let valor2 = "";
    let valor3 = "";
    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
        await page.goto(url);
        try {
            await page.waitForSelector("", {
                timeout: 5000,
            });
        }
        catch { }
        valor1 = await page.evaluate(() => {
            return document.querySelector("#opt_currentDate_emission").innerText;
        });
        try {
            await page.waitForSelector("", {
                timeout: 2300,
            });
        }
        catch { }
        await antiCookies(page);
        await passarPraVolta(page);
        try {
            await page.waitForSelector("", {
                timeout: 2300,
            });
        }
        catch { }
        valor2 = await page.evaluate(() => {
            return document.querySelector("#opt_currentDate_emission").innerText;
        });
        valor3 = await chupetaStringTotal(valor1, valor2);
        await browser.close().catch(() => null);
    }
    catch (e) {
        console.log(e);
    }
    return { url, valor3 };
}
async function chupetaStringTotal(valor1, valor2) {
    valor1 = valor1.replace(/[.]/g, "");
    valor2 = valor2.replace(/[.]/g, "");
    valor1 = valor1.replace(/[,]/g, ".");
    valor2 = valor2.replace(/[,]/g, ".");
    valor1 = parseFloat(valor1.slice(valor1.length - 7, valor1.length));
    valor2 = parseFloat(valor2.slice(valor2.length - 7, valor2.length));
    let valor = valor1 + valor2;
    return String(valor);
}
async function antiCookies(page) {
    await page.waitForSelector("#onetrust-accept-btn-handler", {
        timeout: 30000
    });
    await page.click("#onetrust-accept-btn-handler");
}
async function passarPraVolta(page) {
    await page.click("#lbl_priceValue_1_emission");
    await page.waitForSelector("#btn_selectReturnFlight_emission.m-button.m-button--isEnabled", {
        timeout: 3000000
    });
    await page.click("#btn_selectReturnFlight_emission.m-button.m-button--isEnabled");
}
//# sourceMappingURL=gol.js.map
import puppeteer_1 from "puppeteer";

export async function golzinho(origem, origemData, destinoData, destino) {
    origemData = formatarData(origemData);
    destinoData = formatarData(destinoData);
    console.log(destinoData)
    let url = `https://b2c.voegol.com.br/compra/busca-parceiros?pv=br&tipo=DF&de=${origem}&para=${destino}&ida=${origemData}&volta=${destinoData}&ADT=1&ADL=0&CHD=0&INF=0&voebiz=0`;
    let valor1 = "";
    let valor2 = "";
    let valor3 = "";
    console.log(url)
    try {
        const browser = await puppeteer_1.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
        await page.goto(url);
        try {
            await page.waitForSelector("#opt_currentDate_emission", {
                timeout: 50000,
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
        valor3 = "BRL " + valor3;
        await browser.close().catch(() => null);
    }
    catch (e) {
        console.log(e);
    }
    return [ url, valor3 ];
}
function formatarData(data) {
    // Separar a data original usando o hífen como delimitador
    const partes = data.split('-');
    // Reorganizar as partes no formato dd-mm-yy
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}
// yyyy-mm-dd
// dd-mm-yyyy
/* function arrumarData(origemData,destinoData){
    let oridata = new Array(10)
    let destdata = new Array(10)
    oridata[0] = origemData[8]
    oridata[1] = origemData[9]
    oridata[2] = "-"
    oridata[3] = origemData[5]
    oridata[4] = origemData[6]
    oridata[5] = "-"
    oridata[6] = origemData[1]
    oridata[7] = origemData[2]
    oridata[8] = origemData[3]
    oridata[9] = origemData[4]

    oridata[0] = origemData[8]
    oridata[1] = origemData[9]
    oridata[2] = "-"
    oridata[3] = origemData[5]
    oridata[4] = origemData[6]
    oridata[5] = "-"
    oridata[6] = origemData[1]
    oridata[7] = origemData[2]
    oridata[8] = origemData[3]
    oridata[9] = origemData[4]

} */
async function chupetaStringTotal(valor1, valor2) {
    valor1 = valor1.replace(/[.]/g, "");
    valor2 = valor2.replace(/[.]/g, "");
    valor1 = valor1.replace(/[,]/g, ".");
    valor2 = valor2.replace(/[,]/g, ".");
    valor1 = parseFloat(valor1.slice(valor1.length - 7, valor1.length));
    valor2 = parseFloat(valor2.slice(valor2.length - 7, valor2.length));
    let valor = String(valor1 + valor2);

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
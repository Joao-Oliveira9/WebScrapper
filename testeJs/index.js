import puppeteer from "puppeteer";

export async function testandoUrl(origem, dataOrigem, dataSaida, destino) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    /* console.log(origem);
    console.log(dataOrigem);
    console.log(dataSaida);
    console.log(destino); */
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    /* const origem = "SAO";
            const dataOrigem = "2024-11-19";
            const dataSaida = "2024-11-18";
            const destino = "RIO"  */

    const link = `https://www.latamairlines.com/br/pt/oferta-voos?origin=${origem}&inbound=${dataSaida}T12%3A00%3A00.000Z&outbound=${dataOrigem}T12%3A00%3A00.000Z&destination=${destino}&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc`;
    console.log(link);
    await page.goto(link);
    await cookies(page);
    await clicanaporradobotao(page);
    try {
      await page.waitForSelector("", {
        timeout: 3000,
      });
    } catch {}
    await clicanaporradobotao(page);
    try {
      await page.waitForSelector("", {
        timeout: 3000,
      });
    } catch {}
    await botaofinal(page);
    try {
      await page.waitForSelector(
        "#btn-next-flight.sc-gKsecS.gyPfWp.sc-jrAGKZ.jAJtAP",
        {
          timeout: 30000000,
        }
      );
    } catch {}

    let url = await page.url();
    console.log("url    " + url);
    let valor = await pegaPreco(page);
    console.log("Valor  " + valor);

    browser.close();
    return [url, valor];
  } catch (e) {
    console.log("erro");
  }
}
async function pegaPreco(page) {
  await page.waitForSelector(".sc-kehFMV.sc-fpIhkB.fioIDo.iHKBeW.amount", {
    timeout: 300000,
  });
  const valor = await page.evaluate(() => {
    return document.querySelector(".sc-kehFMV.sc-fpIhkB.fioIDo.iHKBeW.amount")
      .innerText;
  });
  return valor;
}
async function botaofinal(page) {
  await page.waitForSelector("#button9.sc-jlZhew.iYJAzJ.sc-dLMFU.KgRLu", {
    timeout: 300000,
  });
  try {
    await page.click("#button9.sc-jlZhew.iYJAzJ.sc-dLMFU.KgRLu");
  } catch {}
}
async function clicanaporradobotao(page) {
  await page.waitForSelector(
    ".cardFlightstyle__WrapperCardHeader-sc__sc-1fa5kbc-1.kKMdJR",
    {
      timeout: 3000000,
    }
  );
  await page.click(
    "div.flightInfostyle__WrapperFlightInfo-sc__sc-169zitd-2.deppNM"
  );
  await page.waitForSelector(
    "#bundle-detail-0-flight-select.sc-jlZhew.fwqGEb.sc-dLMFU.columnBrandstyle__SelectButton-sc__sc-1e0tr9m-14.KgRLu.brand-cta",
    {
      timeout: 5000000,
    }
  );
  await page.click(
    "#bundle-detail-0-flight-select.sc-jlZhew.fwqGEb.sc-dLMFU.columnBrandstyle__SelectButton-sc__sc-1e0tr9m-14.KgRLu.brand-cta"
  );
}
async function cookies(page) {
  try {
    console.log("passei aqui");
    await page.waitForSelector(
      "#cookies-politics-button.sc-jlZhew.fDgBBM.sc-dLMFU.sc-fwwElh.KgRLu.fYRGmA",
      {
        timeout: 500000,
      }
    );
    await page.click(
      "#cookies-politics-button.sc-jlZhew.fDgBBM.sc-dLMFU.sc-fwwElh.KgRLu.fYRGmA"
    );
    console.log("clicadinha");
    await page.screenshot({ path: "buddy-screenshot.png" });
  } catch {
    console.log("erro");
  }
}
//# sourceMappingURL=index.js.map



const puppeteer = require("puppeteer");
//teste2();
let array = testandoUrl();

let url = array[0]
let valor = array[1]
console.log(url)
console.log(valor)

async function testandoUrl() {
  let url = "";
  let valor = "";
  try {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    await page.goto(
      "https://www.latamairlines.com/br/pt/oferta-voos?origin=SAO&inbound=2024-11-19T12%3A00%3A00.000Z&outbound=2024-11-18T12%3A00%3A00.000Z&destination=RIO&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc"
    );
    //.sc-aXZVg dxSNap latam-typography latam-typography--heading-04 sc-gEvEer flightInfostyle__TextHourFlight-sc__sc-169zitd-4 fteAEG kvztEO
    await cookies(page);
    await clicanaporradobotao(page);
    try {
        await page.waitForSelector("", {
          timeout: 3_000,
        });
    } catch {}
    await clicanaporradobotao(page);
    try {
        await page.waitForSelector("", {
          timeout: 3_000,
        });
    } catch {}
    //await coletaDados(page);
    //await fecharcoiso(page);
    await botaofinal(page);
    try {
        await page.waitForSelector("#btn-next-flight.sc-gKsecS.gyPfWp.sc-jrAGKZ.jAJtAP", {
          timeout: 30000_000,
        });
    } catch {}

    url = await page.url();
    console.log(url);
    valor = await pegaPreco(page)
    console.log(valor);
    //await page.screenshot({ path: "buddy-screenshot.png" });
    //
    browser.close();
  } catch (e) {
    console.log("erro");
  }
  return [url,valor]
}

async function pegaPreco(page){
  await page.waitForSelector(
    ".sc-kehFMV.sc-fpIhkB.fioIDo.iHKBeW.amount",
    {
      timeout:300_000,
    }
  )
  
  const valor = await page.evaluate(() => {
    return (
      document.querySelector(
        ".sc-kehFMV.sc-fpIhkB.fioIDo.iHKBeW.amount"
      ) as HTMLElement
    ).innerText;
  });
  return valor;
}

async function botaofinal(page){
    await page.waitForSelector(
        "#button9.sc-jlZhew.iYJAzJ.sc-dLMFU.KgRLu",
        {
            timeout: 300_000,
        }
    )

    try{await page.click("#button9.sc-jlZhew.iYJAzJ.sc-dLMFU.KgRLu");}catch{}
}

async function fecharcoiso(page){
    
    await page.waitForSelector(
        ".close-sc.closeStyle1-sc",
        {
            timeout: 600_000,
        }
    )
    try{await page.click(".close-sc.closeStyle1-sc");}catch{}

}

async function clicanaporradobotao(page){
    await page.waitForSelector(
        ".cardFlightstyle__WrapperCardHeader-sc__sc-1fa5kbc-1.kKMdJR",
        {
          timeout: 3000_000,
        }
      );

    await page.click("div.flightInfostyle__WrapperFlightInfo-sc__sc-169zitd-2.deppNM");

    await page.waitForSelector(
        "#bundle-detail-0-flight-select.sc-jlZhew.fwqGEb.sc-dLMFU.columnBrandstyle__SelectButton-sc__sc-1e0tr9m-14.KgRLu.brand-cta",
        {
          timeout: 5000_000,
        }
    )
    
    await page.click("#bundle-detail-0-flight-select.sc-jlZhew.fwqGEb.sc-dLMFU.columnBrandstyle__SelectButton-sc__sc-1e0tr9m-14.KgRLu.brand-cta");
}
//sc-aXZVg.dxSNap.latam-typography latam-typography--heading-04.sc-gEvEer.flightInfostyleTextHourFlight-scsc-169zitd-4.fteAEG.kvztE
async function coletaDados(page) {
  try {
    await page.waitForSelector(
      ".sc-aXZVg.dxSNap.latam-typography.latam-typography--heading-06.sc-gEvEer.fteAEG",
      {
        timeout: 50000_000,
      }
    );
    //console.log("passei aqui2");
    /*const horarios = await page.evaluate(() => { 
      return Array.from(document.querySelectorAll(".sc-aXZVg.kFMrxo")).map(el => 
        (el as HTMLElement).innerText // Especifica que 'el' Ã© um HTMLElement
      );
    });*/

    /* const horarios = await page.evaluate(() => {
      return document.querySelectorAll(".sc-aXZVg.kFMrxo");
    }); */

    let [content, menorzinho, chupeta] = await page.evaluate(() => {
      let divs = [
        ...document.querySelectorAll(
          ".sc-aXZVg.dxSNap.latam-typography.latam-typography--heading-06.sc-gEvEer.fteAEG"
        ),
      ];
      console.log(typeof divs);

      //filter
      let arrayDiv = [];
      let j = 0;
      let arrayDiv1 = divs.map((div) => div.textContent.trim());
      for (let i = 0; i < arrayDiv1.length; i=i+2) {
        //i++
        arrayDiv[j] = arrayDiv1[i];
        console.log(arrayDiv[j]);
        j++;
      }


      //let menorPreço = arrayDiv.reduce((menorPreço,atual) => { return menorPreço < atual ? menorPreço : atual; })
      //let indexo = arrayDiv1.indexOf(menorPreço);
      //let chupeta = String(divs[indexo]);

    });
    console.log(chupeta)
    //await page.click(chupeta);

    console.log(menorzinho);
    console.log(content.length);

    //
    //console.log(content); // Exibe uma lista com o texto de cada elemento
  } catch (e) {
    console.log(e);
  }
}
//button#cookies-politics-button.sc-jlZhew.fDgBBM.sc-dLMFU.sc-fwwElh.KgRLu.fYRGMA
//cookies-politics-button.sc-jlZhew.fDgBBM.sc-dLMFU.sc-fwwElh.KgRLu.fYRGmA
async function cookies(page) {
  try {
    console.log("passei aqui");
    await page.waitForSelector(
      "#cookies-politics-button.sc-jlZhew.fDgBBM.sc-dLMFU.sc-fwwElh.KgRLu.fYRGmA",
      {
        timeout: 50000_000,
      }
    );
    await page.click(
      "#cookies-politics-button.sc-jlZhew.fDgBBM.sc-dLMFU.sc-fwwElh.KgRLu.fYRGmA"
    );
    console.log("clicadinha");
  } catch {
    console.log("erro");
  }
}

async function inserirOrigemDestino(page) {
  try {
    await page.waitForSelector(
      ".Tabstyles__BottomDecoration-sc-oh5dk1-1.cRNsPM",
      {
        timeout: 50000_000,
      }
    );

    await page.click(".Tabstyles__BottomDecoration-sc-oh5dk1-1.cRNsPM");
    console.log("puta");
  } catch {
    console.log("putinha");
  }

  try {
    await page.waitForSelector(".sc-dcCXRD.dxoMgK", {
      timeout: 50000_000,
    });
    await page.click(".sc-dcCXRD.dxoMgK");
  } catch {}

  try {
    await page.waitForSelector(
      "#txtInputOrigin--text-field.sc-gdyeKB.gUMYPB.sc-bDpDS.coUuHR.sc-YysOf.hQQeCu",
      {
        timeout: 50000_000,
      }
    );
    await page.type(
      "#txtInputOrigin--text-field.sc-gdyeKB.gUMYPB.sc-bDpDS.coUuHR.sc-YysOf.hQQeCu",
      "SAO"
    );
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.click("#btnContinueCTA.sc-kUXCeW.sc-eRdibt.lpYpc.hPAZrU");
  } catch {}

  await page.click(".sc-crvIOg.dgMThn");
  await page.type(
    "#txtInputDestination--text-field.sc-gdyeKB.gUMYPB.sc-bDpDS.coUuHR.sc-YysOf.hQQeCu",
    "RIO"
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.click("#btnContinueCTA.sc-kUXCeW.sc-eRdibt.lpYpc.hPAZrU");
}

async function inserirIdaVolta(page) {}

async function teste2() {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  await page.goto("https://www.latamairlines.com/");

  await cookies(page);
  try {
    await page.waitForSelector("", {
      timeout: 1000,
    });
  } catch {}
  await inserirOrigemDestino(page);

  await inserirIdaVolta(page);

  await page.screenshot({ path: "buddy-screenshot.png" });

  await browser.close();
}

//botTeste();
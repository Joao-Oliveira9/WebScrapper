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
  console.log("Servidor conectedo na porta 80001");
  botaoTeste();
});

async function botaoTeste() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.latamairlines.com/");

  await cookiesVerification(page);

  await formsAuthentication(page);

  await browser.close();
}

/* verificação dos cookies */
async function cookiesVerification(page) {
  let cookie = await page.waitForSelector(
    "#cookies-politics-button.sc-dCFHLb.cUCRQG.sc-kdBSHD.sc-hYmls.cQSA-dW.eISrvA",
    {
      timeout: 1000_000,
    }
  );
  await page.click(
    "#cookies-politics-button.sc-dCFHLb.cUCRQG.sc-kdBSHD.sc-hYmls.cQSA-dW.eISrvA"
  );
}

/* parte do forms */
async function formsAuthentication(page) {
  try {
    await page.waitForSelector("", {
      timeout: 1000,
    });
  } catch (e) {}

  await page.click(".Tabstyles__BottomDecoration-sc-oh5dk1-1.cRNsPM");
  await forms(page);

  await page.screenshot({ path: "teste.png" });
}

async function forms(page) {
  await page.click("#lblInputOrigin.sc-jeypuc.jomLGV");
}

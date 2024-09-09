import puppeteer from "puppeteer";

async function teste() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.youtube.com/watch?v=4W55nFDyIrc&t=82s");

  await page.waitForSelector(
    "yt-formatted-string.style-scope.ytd-watch-metadata",
    { timeout: 5_000 }
  );
  const title = await page.evaluate(() => {
    return (
      document.querySelector(
        "yt-formatted-string.style-scope.ytd-watch-metadata"
      ) as HTMLElement
    ).innerText;
  });
  console.log(title);
  await browser.close();
}

teste();

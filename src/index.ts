const puppeteer = require('puppeteer');

async function urubupix () {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    
    const URL = "https://www.youtube.com/watch?v=jDI1Z2PjOa0";

    // Navigate the page to a URL
    await page.goto(URL);
    await page.waitForSelector('yt-formatted-string.style-scope.ytd-watch-metadata', { timeout: 5_000 });
    
    const titulo = await page.evaluate(() => {
        return (document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata') as HTMLElement).innerText
    });

    console.log('The title of this blog post is "%s".', titulo);
  
    await browser.close();
  }

  urubupix();
import puppeteer from "puppeteer";

export default async function getSUrl(url) {
  try {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto(`https://vo.la/`);
    await page.waitFor(2000);

    await page.type("#single > div > div.shortfieldz > input", url); 
    const sBtn = await page.$("#shortenurl");
    sBtn.click();
    await page.waitFor(5000);

    const sUrl = await page.$eval(
      "#single > div > div.shortfieldz > input",
      (input) => input.value
    );

    await page.waitFor(1000);
    await browser.close();
    return sUrl;
  } catch (e) {
    console.log("e",e)
  }
}

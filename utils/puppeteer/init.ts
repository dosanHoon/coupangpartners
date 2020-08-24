import puppeteer from "puppeteer";
import pageDown from "../pageDown";

const args = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Safari/537.36",
  "--lang=ko,en-US;q=0.9,en;q=0.8,ko-KR;q=0.7,la;q=0.6",
];

const options = {
  args,
  headless: false,
  ignoreHTTPSErrors: true,
  userDataDir: "./tmp",
};

export default async function () {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    return page;
  } catch (e) {
    await page.screenshot({
      path: `./error.jpg`,
    });
    await browser.close();
    console.log("catch 에러 입니다.", e);
  }
}

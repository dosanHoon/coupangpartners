import puppeteer from "puppeteer";
import KEYS from "../keys";

const tistoryPost = async (postdata, postitle) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(
      `https://dane-itview.tistory.com/manage/newpost/?type=post&returnURL=%2Fmanage%2Fposts%2F`
    );
    // 네이버 로그인
    await page.type("#loginId", KEYS.ID, { delay: 100 });
    await page.type("#loginPw", KEYS.PASSWORD, { delay: 100 });
    await page.click('[type="submit"]');
    await page.waitFor(".textarea_tit");
    await page.waitFor("#mceu_18-open");

    await page.click("#mceu_18-open");
    await page.click("#mceu_32");

    await page.waitFor("#editorContainer > div.html-editor");

    await page.keyboard.type(postdata);
    await page.type(".textarea_tit", postitle, { delay: 10 });
    await page.click(".btn.btn-default");
    await page.waitFor("#open20");
    await page.click("#open20");
    await page.click('[type="submit"]');
    await page.waitFor(5000);
  } catch (e) {
    console.log("tistroy error=============", e);
  } finally {
    await browser.close();
  }
};

export default tistoryPost;

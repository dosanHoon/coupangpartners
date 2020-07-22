import puppeteer from "puppeteer";

const tistoryPost = async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const postdata = req.body.postdata;
    const page = await browser.newPage();
    await page.goto(
      `https://autosellpost.tistory.com/manage/newpost/?type=post&returnURL=%2Fmanage%2Fposts%2F`
    );
    // 네이버 로그인
    
    await page.click('[type="submit"]');
    await page.waitFor(".textarea_tit");

    await page.mouse.click(252, 238);

    console.log("postdata", postdata);
    await page.keyboard.type(postdata, { delay: 100 });

    await page.type(".textarea_tit", "골드 박스 목록 입니다.", { delay: 100 });
    await page.click(".btn.btn-default");
    await page.waitFor("#open20");
    await page.click("#open20");
    await page.click('[type="submit"]');
  } catch (e) {
    console.log("tistroy error=============", e);
  } finally {
    await browser.close();
  }
};

export default tistoryPost;

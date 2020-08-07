import puppeteer from "puppeteer";

const naverPost = async (postdata, title, id, pw) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(`http://blog.naver.com/${id}?Redirect=Write`);

    // 네이버 로그인
    await page.type("#id", id, { delay: 100 });
    await page.type("#pw", pw, { delay: 100 });
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    //제목 입력
    await page.mouse.click(240, 118);
    await page.keyboard.type(title, { delay: 100 });
    //HTML 선택
    await page.evaluate(
      `document.querySelector("#mainFrame").contentDocument.querySelector(".se2_to_html").click()`
    );
    //포스트 입력
    await page.mouse.click(132, 272);
    await page.keyboard.type(postdata, { delay: 100 });

    await page.evaluate(
      `document.querySelector("#mainFrame").contentDocument.querySelector("#btn_submit").click()`
    );

    await page.waitForNavigation();
  } catch (e) {
    console.log("naverPost error=============", e);
  } finally {
    await browser.close();
  }
};

export default naverPost;

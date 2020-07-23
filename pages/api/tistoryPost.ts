import puppeteer from "puppeteer";

const tistoryPost = async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const postdata = req.body.postdata;
    const title = req.body.title;
    const page = await browser.newPage();
    await page.goto(
      `https://autosellpost.tistory.com/manage/newpost/?type=post&returnURL=%2Fmanage%2Fposts%2F`
    );
    // 네이버 로그인
    await page.click('[type="submit"]');
    await page.waitFor(".textarea_tit");
    await page.waitFor("#mceu_18-open");

    await page.click("#mceu_18-open");
    await page.click("#mceu_32");

    await page.waitFor("#editorContainer > div.html-editor");

    await page.keyboard.type(
      `<style>
            td {
              padding: 10px;
              border: 1px solid grey;
            }
            td.rank {
              min-width: 30px;
            }
            td.price {
              padding: 10px;
            }
          </style>` +
        postdata +
        "<p>파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음</p>"
    );
    await page.type(".textarea_tit", title, { delay: 10 });
    await page.click(".btn.btn-default");
    await page.waitFor("#open20");
    await page.click("#open20");
    await page.click('[type="submit"]');
    res.status(200).json({ returnMessage: "성공", returnCode: 0 });
  } catch (e) {
    console.log("tistroy error=============", e);
  } finally {
    await browser.close();
    res.status(200).json({ returnMessage: "성공", returnCode: 0 });
  }
};

export default tistoryPost;

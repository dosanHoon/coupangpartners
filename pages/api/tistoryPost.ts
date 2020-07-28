import puppeteer from "puppeteer";
import KEYS from "../../keys";

const tistoryPost = async (req, res) => {
  try {
    res.status(200).json({ returnMessage: "성공", returnCode: 0 });
    const browser = await puppeteer.launch({ headless: false });
    const postdata = req.body.postdata;
    const title = req.body.postitle;
    console.log("req title", title);
    console.log("req.body", req.body);
    const page = await browser.newPage();
    await page.goto(
      `https://autosellpost.tistory.com/manage/newpost/?type=post&returnURL=%2Fmanage%2Fposts%2F`
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
    // await browser.close();
  } catch (e) {
    console.log("tistroy error=============", e);
    res.status(200).json({ returnMessage: "실패", returnCode: 0 });
  }
};

export default tistoryPost;

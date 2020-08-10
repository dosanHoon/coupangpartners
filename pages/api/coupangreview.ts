import puppeteer from "puppeteer";

export default async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const productUrl = req.query.productUrl;
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto(productUrl);
    await page.waitFor(3000);

    // await page.waitFor("#contents h2");

    const pTitle = await page.$("#contents h2");

    let productTitle = "";
    if (pTitle) {
      productTitle = await page.$eval(
        "#contents h2",
        (title) => title.innerText
      );
    }

    await page.evaluate(() => {
      document.documentElement.scrollTop += 2000;
    });
    await page.waitFor(2000);

    await page.waitFor("#btfTab > ul.tab-titles > li:nth-child(2)");
    const reviewBtn = await page.$("#btfTab > ul.tab-titles > li:nth-child(2)");
    await reviewBtn.click();

    await page.waitFor(2000);
    const reviews = await page.$$eval(
      "section.js_reviewArticleListContainer > article",
      (articles) => {
        console.log("labels", articles);
        return (
          articles &&
          articles.map((article, i) => {
            const imgs = article.querySelector(
              ".sdp-review__article__list__attachment"
            );
            const text = article.querySelector(
              ".sdp-review__article__list__review"
            );
            return {
              imgs: imgs ? imgs.outerHTML : "",
              text: text ? text.outerHTML : "",
              i,
            };
          })
        );
      }
    );
    // console.log("reviews", reviews);

    await page.waitFor(1000);
    await browser.close();

    res.json({
      returnMessage: "성공",
      returnCode: 0,
      reviews,
      productTitle,
    });
  } catch (e) {
    await browser.close();
    console.log("catch 에러 입니다.", e);
    res.json({
      returnMessage: "실패",
      returnCode: 0,
    });
  }
};

import puppeteer from "puppeteer";

export default async (productUrl) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
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
        return (
          articles &&
          articles.map((article, i) => {
            const imgsTag = article.querySelectorAll(
              ".sdp-review__article__list__attachment img"
            );
            const title = article.querySelector(
              ".sdp-review__article__list__headline"
            );

            const imgsHTML = [];
            if (imgsTag) {
              imgsTag.forEach((img) => {
                imgsHTML.push(
                  `<img src=${img.dataset.originPath} style="margin:10px 10px 0  0; width:calc(49% - 10px); display:inline-block"/>`
                );
              });
            }

            const imgs = `<div style="padding:30px 0;">${imgsHTML.join(
              ""
            )}</div>`;
            const text = article.querySelector(
              ".sdp-review__article__list__review"
            );
            return {
              imgs: imgs,
              title: title ? title.innerText : "",
              text: text ? text.innerText.split("\n").join("<br/>") : "",
              i,
            };
          })
        );
      }
    );
    // console.log("reviews", reviews);

    await page.waitFor(1000);
    await browser.close();

    return { reviews, productTitle };
  } catch (e) {
    await browser.close();
    console.log("catch 에러 입니다.", e);
  }
};

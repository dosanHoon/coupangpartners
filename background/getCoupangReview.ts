import puppeteer from "puppeteer";

const pageDown = async (page) => {
  const scrollHeight = "document.body.scrollHeight";
  let previousHeight = await page.evaluate(scrollHeight);
  await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
  await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
    timeout: 30000,
  });
};

export default async (productUrl) => {
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

  const browser = await puppeteer.launch(options);
  console.log(await browser.userAgent());
  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto(productUrl, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const pTitle = await page.$("#contents h2");
    let productTitle = "";
    if (pTitle) {
      productTitle = await page.$eval(
        "#contents h2",
        (title) => title.innerText
      );
    }
    console.log("productTitle", productTitle);

    await pageDown(page);
    await page.screenshot({
      path: `./pageDown1.jpg`,
    });
    await page.waitFor(2000);
    const reviewBtn = await page.$("#btfTab ul.tab-titles li:nth-child(2)");
    const propertyHandle = await reviewBtn.getProperty("innerText");
    const propertyValue = await propertyHandle.jsonValue();
    console.log("propertyValue", propertyValue);
    
    await reviewBtn.click();
    await page.waitFor(2000);
    await page.screenshot({
      path: `./after.jpg`,
    });
    pageDown(page);
    await page.waitFor(2000);
    await page.screenshot({
      path: `./scroll.jpg`,
    });

    await page.screenshot({
      path: `./after2.jpg`,
    });
    console.log("get reviews");
    const reviews = await page.$$eval(
      "section.js_reviewArticleListContainer > article",
      (articles) => {
        console.log("articles", articles);
        return (
          articles &&
          articles.map((article, i) => {
            const imgsTag = article.querySelectorAll(
              ".sdp-review__article__list__attachment img"
            );
            const title = article.querySelector(
              ".sdp-review__article__list__headline"
            );
            const name = article.querySelector(
              ".sdp-review__article__list__info .sdp-review__article__list__info__user__name"
            );
            const stars = article.querySelector(
              ".sdp-review__article__list__info .sdp-review__article__list__info__product-info__star-orange"
            );

            const imgsHTML = [];
            if (imgsTag) {
              imgsTag.forEach((img) => {
                imgsHTML.push(
                  `<img src=${img.dataset.originPath} style="margin:10px 10px 0  0; width:calc(49% - 10px); display:inline-block"/>`
                );
              });
            }

            const imgs = `<div style="padding:20px 0;">${imgsHTML.join(
              ""
            )}</div>`;
            const text = article.querySelector(
              ".sdp-review__article__list__review"
            );
            return {
              imgs: imgs,
              title: title ? title.innerText : "",
              text: text ? text.innerText.split("\n").join("<br/>") : "",
              name: name ? name.innerText : "",
              stars: stars.getAttribute("style"),
              i,
            };
          })
        );
      }
    );
    console.log("reviews", reviews);

    await page.waitFor(1000);
    await browser.close();

    return { reviews, productTitle };
  } catch (e) {
    await page.screenshot({
      path: `./error.jpg`,
    });
    await browser.close();
    console.log("catch 에러 입니다.", e);
  }
};

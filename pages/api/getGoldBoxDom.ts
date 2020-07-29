import puppeteer from "puppeteer";

export default async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(`https://www.coupang.com/np/goldbox`);

    const productsImg = await page.$$(".highlight-product");

    let i = 0;
    while (i < productsImg.length) {
      await productsImg[i].screenshot({
        path: `./public/goldbox/item_${i}.jpg`,
      });
      ++i
    }

    const data = await page.$$eval(".highlight-product", (products) =>
      products.map((product, i) => {
        return {
          href: product.querySelector("a").href,
          img: `./goldbox/item_${i}.jpg`,
        };
      })
    );

    await page.waitFor(2000);
    await browser.close();

    res.json({ returnMessage: "성공", returnCode: 0, data });
  } catch (e) {
    await browser.close();
    console.log("catch 에러 입니다.", e);
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};

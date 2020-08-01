import puppeteer from "puppeteer";
import fs from "fs";

export default async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const search = req.query.search;
    console.log("search", search);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.setViewport({ width: 1200, height: 1200 });
    await page.goto(`https://www.google.com/search?q=${search}`);
    await page.waitFor(2000);
    await page.waitFor(`#hdtb-msb-vis > div:nth-child(2) > a`);
    const btn = await page.$(`#hdtb-msb-vis > div:nth-child(2) > a`);
    btn.click();

    const IMAGE_SELECTOR = "#islrg > div.islrc > div";
    await page.waitFor(2000);
    await page.waitFor("#islrg > div.islrc");
    const images = await page.$$(IMAGE_SELECTOR);
    console.log("images", images[0]);

    const imgs = [];
    const getImg = async (img) => {
      try {
        await img.click();
        await page.waitFor(3000);
        await page.waitFor(
          "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img"
        );
        const i = await page.$eval(
          "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img",
          (img) => img.src
        );

        imgs.push(i);
      } catch (e) {
        console.log("catch", e);
      }
    };

    await images.reduce(async (promise, img) => {
      await promise.then();
      await getImg(img);
      return Promise.resolve();
    }, Promise.resolve());

    // await imgs.reduce(async (promise, img) => {
    //   await promise.then();
    //   const viewSource = await page.goto(img);
    //   fs.writeFile(img.split("/").pop(), await viewSource.buffer(), (err) =>
    //     console.log(err)
    //   );
    //   return Promise.resolve();
    // }, Promise.resolve({}));

    await page.waitFor(1000);
    await browser.close();

    res.json({
      returnMessage: "성공",
      returnCode: 0,
      imgs,
    });
  } catch (e) {
    await browser.close();
    console.log("catch 에러 입니다.", e);
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};

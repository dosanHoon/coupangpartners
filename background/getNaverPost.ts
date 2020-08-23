import puppeteer from "puppeteer";
import fs from "fs";

export default async function naverPost(keyword) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(
      `https://section.blog.naver.com/Search/Post.nhn?pageNo=1&keyword=${keyword}`
    );
    await page.waitFor(2000);
    const postLinks = await page.$$eval(
      "#content > section > div.area_list_search > div",
      (posts) =>
        posts.map(
          (post) =>
            post.querySelector(" div > div.info_post > div > a.desc_inner").href
        )
    );

    await postLinks.reduce(async (promise, link) => {
      await promise.then();
      await page.goto(link);
      await page.waitFor(2000);
      const t = link.split("/");
      const postId = t.pop();

      const postText = await page.$eval(
        "#mainFrame",
        (mainFrame, args) => {
          return mainFrame.contentDocument.querySelector(
            `#post-view${args[0]} > div`
          ).innerText;
        },
        [postId]
      );
      await fs.writeFile(
        `./newtest/${keyword}/${keyword}${postId}.txt`,
        `${postText}`,
        (err) => console.log("writeFile", err)
      );
      return Promise.resolve();
    }, Promise.resolve());

    await page.waitFor(1000);
    await browser.close();
  } catch (e) {}
}

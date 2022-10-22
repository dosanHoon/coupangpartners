import puppeteer from "puppeteer";
import fs from "fs";
import keys from "./keys.js";

export default async function naverPost() {
  try {
    console.log("sdfsdf");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto(
      `https://nid.naver.com/nidlogin.login?url=https%3A%2F%2Fsection.blog.naver.com%2FBlogHome.naver`
    );

    // 네이버 로그인
    await page.type("#id", keys.NAVERID, { delay: 100 });
    await page.type("#pw", keys.NAVERPW, { delay: 100 });
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    await page.goto(
      `https://section.blog.naver.com/ThemePost.naver?directoryNo=30&activeDirectorySeq=4&currentPage=1`
    );

    await page.waitFor(2000);

    console.log("goto section");

    const naverIds = await page.$$eval(
      "#content > section .list_post_article",
      (posts) =>
        posts.map((post) => {
          console.log("get naverIds");
          const link = post.querySelector("div.info_post > a.author").href;
          const lastElement = link.split("/").pop();
          return lastElement;
        })
    );

    console.log("naverIds", naverIds);

    for (let i = 0; i < naverIds.length; i++) {
      const id = naverIds[i];
      console.log("id", id);

      await page.evaluate(
        `window.location = https://blog.naver.com/BuddyAdd.naver?blogId=${id}`
      );

      console.log("id 2", id);

      await page.waitForNavigation();

      console.log("id 3", id);

      await page.evaluate(
        `document.querySelector("#content > div > form > fieldset > div.popup_text > div.buddy_state > p > span.wrap_radio.radio_bothbuddy > label").click()`
      );

      await page.evaluate(
        `document.querySelector("#content > div > form > fieldset > div.area_button > a.button_next._buddyAddNext").click()`
      );

      await page.waitForNavigation();

      await page.type(
        "#message",
        "안녕하세요. IT 테크 블로그를 운영중입니다. 같이 블로그 운영하면서 소통하면 좋을것 같아요!",
        { delay: 10 }
      );

      await page.evaluate(
        `document.querySelector("body > form > div > div > fieldset > div.area_button > a.button_next._addBothBuddy").click()`
      );
    }

    // await naverIds.map(async (id) => {
    //   await page.goto(`https://blog.naver.com/BuddyAdd.naver?blogId=${id}`);

    //   await page.waitForNavigation();

    //   await page.evaluate(
    //     `document.querySelector("#content > div > form > fieldset > div.popup_text > div.buddy_state > p > span.wrap_radio.radio_bothbuddy > label").click()`
    //   );

    //   await page.evaluate(
    //     `document.querySelector("#content > div > form > fieldset > div.area_button > a.button_next._buddyAddNext").click()`
    //   );

    //   await page.waitForNavigation();

    //   await page.type(
    //     "#message",
    //     "안녕하세요. IT 테크 블로그를 운영중입니다. 같이 블로그 운영하면서 소통하면 좋을것 같아요!",
    //     { delay: 10 }
    //   );

    //   await page.evaluate(
    //     `document.querySelector("body > form > div > div > fieldset > div.area_button > a.button_next._addBothBuddy").click()`
    //   );
    // });

    console.log("close");
    await browser.close();
  } catch (e) {}
}

naverPost();

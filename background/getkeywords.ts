import getNewKeyword from "../pages/api/getNewKeyword";
import getReviews from "../pages/api/getCoupangReview";
import getGoogleResource from "../pages/api/getGoogleResource";
import getNaverPost from "./getNaverPost";
import fs from "fs";

const res = {
  json() {},
  status() {
    return {
      json() {},
    };
  },
};

const scrapNew = (category) => {
  getNewKeyword({ query: { category } }, res).then(async (data: any) => {
    console.log("getNewKeyword", data.keywords);
    const { keywords } = data;
    // const data = "파일 생성 테스트";
    await keywords.reduce(async (promise, { keyword }) => {
      await promise.then();

      fs.mkdir("./newtest/" + keyword, (err) => {
        if (err) console.log(err);
      });
      const {
        reviews,
        firstProductLink,
        coupanglink,
        productTitle,
      } = await getReviews({ query: { search: keyword } }, res);
      fs.writeFile(`./newtest/${keyword}/reviews.html`, reviews, (err) =>
        console.log(err)
      );
      fs.writeFile(
        `./newtest/${keyword}/link.txt`,
        `firstProductLink={${firstProductLink}}, coupanglink={${coupanglink}}, productTitle={${productTitle}}`,
        (err) => console.log(err)
      );
      const { imgs } = await getGoogleResource(
        { query: { search: keyword } },
        res
      );
      fs.writeFile(
        `./newtest/${keyword}/imgs.html`,
        imgs.map((src)=>`<img src=${src}/>`).join("\n"),
        (err) => console.log(err)
      );

      await getNaverPost(keyword);

      return Promise.resolve();
    }, Promise.resolve());
  });
};


scrapNew("디지털/가전")
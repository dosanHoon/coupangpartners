import getNewKeyword from "../pages/api/getNewKeyword";
import getReviews from "../pages/api/getCoupangReview";
import getGoogleResource from "../pages/api/getGoogleResource";
import fs from "fs";

const res = {
  json() {},
  status() {
    return {
      json() {},
    };
  },
};

getNewKeyword({ query: { category: "패션잡화" } }, res).then(
  async (data: any) => {
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
        `./newtest/${keyword}/imgs.txt`,
        `${imgs.join("\n")}`,
        (err) => console.log(err)
      );
      return Promise.resolve();
    }, Promise.resolve());
  }
);

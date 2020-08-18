import coupang from "../utils/coupang";
import getSUrl from "../utils/getSurl";
import getCoupnagReview from "./getCoupangReview";
import naverPost from "./naverPost";
import tistoryPost from "./tistoryPost";

import keys from "../keys";
import { kMaxLength } from "buffer";
import makeHtml from "./makeHtml";

const GET = "GET";

// await getBest(1001, "여성패션");
//     await postBlog("여성패션");
//     await getBest(1002, "남성패션");
//     await postBlog("남성패션");
//     await getBest(1003, "베이비패션 (0~3세)");
//     await postBlog("베이비패션 (0~3세)");
//     await getBest(1004, "여아패션 (3세 이상)");
//     await postBlog("여아패션 (3세 이상)");
//     await getBest(1005, "남아패션 (3세 이상)");
//     await postBlog("남아패션 (3세 이상)");
//     await getBest(1006, "스포츠패션");
//     await postBlog("스포츠패션");
//     await getBest(1007, "신발");
//     await postBlog("신발");
//     await getBest(1008, "가방/잡화");
//     await postBlog("가방/잡화");
//     await getBest(1010, "뷰티");
//     await postBlog("뷰티");
//     await getBest(1011, "출산/유아동");
//     await postBlog("출산/유아동");
//     await getBest(1012, "식품");
//     await postBlog("식품");
//     await getBest(1013, "주방용품");
//     await postBlog("주방용품");
//     await getBest(1014, "생활용품");
//     await postBlog("생활용품");
//     await getBest(1015, "홈인테리어");
//     await postBlog("홈인테리어");
//     await getBest(1016, "가전디지털");
//     await postBlog("가전디지털");
//     await getBest(1017, "스포츠/레저");
//     await postBlog("스포츠/레저");
//     await getBest(1018, "자동차용품");
//     await postBlog("자동차용품");
//     await getBest(1019, "도서/음반/DVD");
//     await postBlog("도서/음반/DVD");
//     await getBest(1020, "완구/취미");
//     await postBlog("완구/취미");
//     await getBest(1021, "문구/오피스");
//     await postBlog("문구/오피스");
//     await getBest(1024, "헬스/건강식품");
//     await postBlog("헬스/건강식품");
//     await getBest(1025, "국내여행");
//     await postBlog("국내여행");
//     await getBest(1026, "해외여행");
//     await postBlog("해외여행");
//     await getBest(1029, "반려동물용품");
//     await postBlog("반려동물용품");

const getCoupangBest = async (code) => {
  try {
    const { data } = await coupang(
      GET,
      `/products/bestcategories/${code}?subId=autotest&limit=10`
    );
    return data;
  } catch (e) {
    console.log("catch 에러 입니다.");
  }
};

const getCoupangDeepLink = async (productId, subId) => {
  try {
    const { data } = await coupang("POST", "/deeplink", {
      coupangUrls: [`https://www.coupang.com/vp/products/${productId}`],
      subId: "autotest",
    });
    return data[0].shortenUrl;
  } catch (e) {
    console.log("catch 에러 입니다.");
  }
};

async function CoupangBest(code) {
  const data = await getCoupangBest(code);

  await data.reduce(
    async (promise, { productUrl, productImage, productId, productName }) => {
      await promise.then();
      const { reviews, productTitle } = await getCoupnagReview(productUrl);

      const surl = await getCoupangDeepLink(productId, "autotest");
      const htmlData = makeHtml(productTitle, surl, reviews, productImage);
      await naverPost(htmlData, productName, keys.NAVERID, keys.NAVERPW);
      return Promise.resolve();
    },
    Promise.resolve()
  );
}

async function postByUrl(productUrl) {
  const { reviews, productTitle } = await getCoupnagReview(productUrl);
  const urls = productUrl.split("/");
  const surl = await getCoupangDeepLink(urls[urls.length - 1], "itreviewblog");
  const htmlData = makeHtml(productTitle, surl, reviews, "");
  // await naverPost(htmlData, productTitle, keys.NAVERID, keys.NAVERPW);
  await tistoryPost(htmlData, productTitle);
}

postByUrl("https://www.coupang.com/vp/products/1910786533");

// (async function () {
//   await CoupangBest(1012);
//   await CoupangBest(1013);
//   await CoupangBest(1014);
//   await CoupangBest(1016);
//   await CoupangBest(1024);
//   await CoupangBest(1008);
//   await CoupangBest(1010);
// })();

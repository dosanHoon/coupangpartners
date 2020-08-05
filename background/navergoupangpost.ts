import coupang from "../utils/coupang";
import getSUrl from "../utils/getSurl";
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

getSUrl(
  "http://www.proviralad.com/event/landing/bro_news1.php?ADID=backtoss"
).then((data) => {
  console.log("Data", data);
});

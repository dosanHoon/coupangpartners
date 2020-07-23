import Head from "next/head";
import Axios from "axios";
import React from "react";
import { TaebleForHtml } from "../src/components/Table";

export default function Home() {
  const [goldBoxList, setGoldBoxList] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const getBest = (code, title) => {
    return Axios.get(`http://localhost:3000/api/getCoupangBest?code=${code}`)
      .then(function ({ data }) {
        setGoldBoxList(data.data);
        setTitle(`${title} 베스트 아이템 추천 순위`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postAllBestBlog = async () => {
    // const codes = [
    //   { code: 1001, title: "여성패션" },
    //   { code: 1002, title: "남성패션" },
    //   { code: 1003, title: "베이비패션 (0~3세)" },
    //   { code: 1004, title: "여아패션 (3세 이상)" },
    //   { code: 1005, title: "남아패션 (3세 이상)" },
    //   { code: 1006, title: "스포츠패션" },
    //   { code: 1007, title: "신발" },
    //   { code: 1008, title: "가방/잡화" },
    //   { code: 1010, title: "뷰티" },
    //   { code: 1011, title: "출산/유아동" },
    //   { code: 1012, title: "식품" },
    //   { code: 1013, title: "주방용품" },
    //   { code: 1014, title: "생활용품" },
    //   { code: 1015, title: "홈인테리어" },
    //   { code: 1016, title: "가전디지털" },
    //   { code: 1017, title: "스포츠/레저" },
    //   { code: 1018, title: "자동차용품" },
    //   { code: 1019, title: "도서/음반/DVD" },
    //   { code: 1020, title: "완구/취미" },
    //   { code: 1021, title: "문구/오피스" },
    //   { code: 1024, title: "헬스/건강식품" },
    //   { code: 1025, title: "국내여행" },
    //   { code: 1026, title: "해외여행" },
    //   { code: 1029, title: "반려동물용품" },
    // ];
    await getBest(1001, "여성패션");
    await postBlog();
    await getBest(1002, "남성패션");
    await postBlog();
    await getBest(1003, "베이비패션 (0~3세)");
    await postBlog();
    await getBest(1004, "여아패션 (3세 이상)");
    await postBlog();
    await getBest(1005, "남아패션 (3세 이상)");
    await postBlog();
    await getBest(1006, "스포츠패션");
    await postBlog();
    await getBest(1007, "신발");
    await postBlog();
    await getBest(1008, "가방/잡화");
    await postBlog();
    await getBest(1010, "뷰티");
    await postBlog();
    await getBest(1011, "출산/유아동");
    await postBlog();
    await getBest(1012, "식품");
    await postBlog();
    await getBest(1013, "주방용품");
    await postBlog();
    await getBest(1014, "생활용품");
    await postBlog();
    await getBest(1015, "홈인테리어");
    await postBlog();
    await getBest(1016, "가전디지털");
    await postBlog();
    await getBest(1017, "스포츠/레저");
    await postBlog();
    await getBest(1018, "자동차용품");
    await postBlog();
    await getBest(1019, "도서/음반/DVD");
    await postBlog();
    await getBest(1020, "완구/취미");
    await postBlog();
    await getBest(1021, "문구/오피스");
    await postBlog();
    await getBest(1024, "헬스/건강식품");
    await postBlog();
    await getBest(1025, "국내여행");
    await postBlog();
    await getBest(1026, "해외여행");
    await postBlog();
    await getBest(1029, "반려동물용품");
    await postBlog();

    // await getBest(code, title);
    // await postBlog();
  };

  const getGoldBox = () => {
    Axios.get("http://localhost:3000/api/getGoldBox")
      .then(function ({ data }) {
        setGoldBoxList(data.data);
        setTitle("골드박스 아이템 추천 순위");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postBlog = () => {
    const goldbox = document.getElementById("bloghtml");

    return Axios.post("http://localhost:3000/api/tistoryPost", {
      postdata: goldbox.innerHTML,
      title,
    })
      .then(function (data) {
        console.log("완료", data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <button onClick={getBest}>베스트 </button> */}
        <button onClick={getGoldBox}>골드박스 상품 </button>
        <button onClick={postAllBestBlog}>
          블로그에 베스트 카테고리 전부 등록하기
        </button>
        <button onClick={postBlog}>블로그에 등록하기 </button>
        <div id="bloghtml">
          <p></p>
          <p></p>
          <h1>{`오늘은 ${title} 포스팅 입니다.`}</h1>
          <p> 현재 가장 판매가 잘되는 제품들 추천드려요. </p>
          <p></p>
          <p></p>
          <TaebleForHtml rows={goldBoxList} />
          <p></p>
          <p></p>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      <style>{`
            td {
              padding: 10px;
              boder: 1px solide grey;
            }
            td.rank {
              min-width: 30px;
            }
            td.price {
              padding: 10px;
            }
          `}</style>
    </div>
  );
}

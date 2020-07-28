import Head from "next/head";
import Axios from "axios";
import React from "react";
import {
  Button,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  Container,
  Grid,
} from "@material-ui/core";
import { TaebleForHtml } from "../src/components/Table";
import FindInPageRoundedIcon from "@material-ui/icons/FindInPageRounded";

Axios.defaults.timeout = 1000000;
export default function Home() {
  const [goldBoxList, setGoldBoxList] = React.useState([]);
  const [postTitle, setTitle] = React.useState("");
  const [keyword, setKeyword] = React.useState("");

  const getBest = (code, title) => {
    return Axios.get(`/api/getCoupangBest?code=${code}`)
      .then(function ({ data }) {
        setGoldBoxList(data.data);
        setTitle(`${title} 베스트 아이템 추천 순위`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const search = () => {
    return Axios.get(`/api/search?keyword=${keyword}`)
      .then(function ({ data }) {
        console.log("data", data);
        if (data) {
          const { productData } = data.data;
          console.log("data", productData);
          setGoldBoxList(productData);
          setTitle(`${keyword} 베스트 아이템 추천 순위`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postAllBestBlog = async () => {
    await getBest(1001, "여성패션");
    await postBlog("여성패션");
    await getBest(1002, "남성패션");
    await postBlog("남성패션");
    await getBest(1003, "베이비패션 (0~3세)");
    await postBlog("베이비패션 (0~3세)");
    await getBest(1004, "여아패션 (3세 이상)");
    await postBlog("여아패션 (3세 이상)");
    await getBest(1005, "남아패션 (3세 이상)");
    await postBlog("남아패션 (3세 이상)");
    await getBest(1006, "스포츠패션");
    await postBlog("스포츠패션");
    await getBest(1007, "신발");
    await postBlog("신발");
    await getBest(1008, "가방/잡화");
    await postBlog("가방/잡화");
    await getBest(1010, "뷰티");
    await postBlog("뷰티");
    await getBest(1011, "출산/유아동");
    await postBlog("출산/유아동");
    await getBest(1012, "식품");
    await postBlog("식품");
    await getBest(1013, "주방용품");
    await postBlog("주방용품");
    await getBest(1014, "생활용품");
    await postBlog("생활용품");
    await getBest(1015, "홈인테리어");
    await postBlog("홈인테리어");
    await getBest(1016, "가전디지털");
    await postBlog("가전디지털");
    await getBest(1017, "스포츠/레저");
    await postBlog("스포츠/레저");
    await getBest(1018, "자동차용품");
    await postBlog("자동차용품");
    await getBest(1019, "도서/음반/DVD");
    await postBlog("도서/음반/DVD");
    await getBest(1020, "완구/취미");
    await postBlog("완구/취미");
    await getBest(1021, "문구/오피스");
    await postBlog("문구/오피스");
    await getBest(1024, "헬스/건강식품");
    await postBlog("헬스/건강식품");
    await getBest(1025, "국내여행");
    await postBlog("국내여행");
    await getBest(1026, "해외여행");
    await postBlog("해외여행");
    await getBest(1029, "반려동물용품");
    await postBlog("반려동물용품");
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

  const postBlog = (title?) => {
    const goldbox = document.getElementById("bloghtml");

    return Axios.post("/api/tistoryPost", {
      postdata: goldbox.innerHTML,
      postitle: `${title || postTitle} 베스트 추천 순위`,
    })
      .then(function (data) {
        console.log("완료", data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <main>
          <Button variant="contained" onClick={getGoldBox}>
            골드박스 상품
          </Button>
          <Button variant="contained" onClick={postAllBestBlog}>
            베스트 카테고리 전부 등록
          </Button>
          <Button variant="contained" onClick={() => postBlog()}>
            블로그에 등록
          </Button>
          <Grid>
            <InputLabel htmlFor="input-with-icon-adornment">검색</InputLabel>
            <Input
              id="input-with-icon-adornment"
              value={keyword}
              onChange={handleKeyword}
              startAdornment={
                <InputAdornment position="start" onClick={search}>
                  <FindInPageRoundedIcon />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid>
            <TextField
              id="filled-basic"
              label="제목"
              variant="filled"
              value={postTitle}
              onChange={handleChange}
            />
          </Grid>
          <div id="bloghtml">
            <p></p>
            <p></p>
            <h1>{`${postTitle} 포스팅 입니다.`}</h1>
            <p> 현재 가장 판매가 잘되는 제품들 추천드려요. </p>
            <p></p>
            <p></p>
            {goldBoxList && <TaebleForHtml rows={goldBoxList} />}
            <p></p>
            <p></p>
          </div>
        </main>
      </Container>

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
             table {
              width: 100%;
              border-top: 1px solid #444444;
              border-collapse: collapse;
            }
            th, td {
              border-bottom: 1px solid #444444;
              padding: 10px;
              box-sizing: border-box;
            }
            td {
              padding: 10px;
            }
            td.rank {
              min-width: 50px;
            }
            img {
              max-width:300px;
            }
          `}</style>
    </div>
  );
}

import Head from "next/head";
import Axios from "axios";
import React from "react";
import Table from "../src/components/Table";

export default function Home() {
  const [bestList, setBestList] = React.useState([]);
  const [goldBoxList, setGoldBoxList] = React.useState([]);

  const getBest = () => {
    Axios.post("http://localhost:3000/api/getCoupangBest")
      .then(function ({ data }) {
        setBestList(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getGoldBox = () => {
    Axios.post("http://localhost:3000/api/getGoldBox")
      .then(function ({ data }) {
        setGoldBoxList(data.data);
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
        <button onClick={getBest}>베스트 </button>
        <button onClick={getGoldBox}>골드박스 상품 </button>
        <h1>베스트 상품</h1>
        <div>
          {bestList.map(({ productName, productImage }) => {
            return (
              <p key={productName}>
                {productName}
                <img src={productImage} />
              </p>
            );
          })}
        </div>
        <h1>골드 박스</h1>
        <Table rows={goldBoxList} />
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
    </div>
  );
}

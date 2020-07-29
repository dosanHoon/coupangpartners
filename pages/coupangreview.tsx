import React from "react";
import Head from "next/head";
import Axios from "axios";

import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      // overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      // width: 500,
      // height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [goldBoxList, setGoldBoxList] = React.useState([]);

  React.useEffect(() => {
    Axios.get(`/api/getNewKeyword?category="패션의류"`).then(({ data }) => {
      console.log("data", data.data);
    });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <h1>쇼핑 인사이트 로그</h1>
        <p>새로운 키워드 추천</p>

        <main>
          <div className={classes.root}></div>
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
    </div>
  );
}

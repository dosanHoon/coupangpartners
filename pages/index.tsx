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

  // React.useEffect(() => {
  //   Axios.get("/api/getGoldBox").then((data) => {
  //     data && setGoldBoxList(data.data)
  //   });
  // }, []);
  React.useEffect(() => {
    Axios.get("/api/getGoldBoxDom").then(({ data }) => {
      console.log("data", data);
      data && setGoldBoxList(data.data);
    });
  }, []);

  console.log("goldBoxList", goldBoxList);

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <h1>쇼핑 인사이트 로그</h1>
        <p>
          <a href="https://coupa.ng/bG4N49" target="blank">
            <img
              src={"/goldbox_banner.png"}
              alt="쿠팡 골드박스"
              style={{
                position: "relative",
                left: "-50%",
              }}
            />
          </a>
        </p>
        <main>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                <ListSubheader component="div">쿠팡 골드박스</ListSubheader>
              </GridListTile>
              {goldBoxList &&
                goldBoxList.map(({ img, href }) => (
                  <GridListTile key={href}>
                    <a href={href} target="blank">
                      <img src={img} alt={href} />
                    </a>
                  </GridListTile>
                ))}
            </GridList>
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
    </div>
  );
}

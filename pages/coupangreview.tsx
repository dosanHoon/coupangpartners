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
  TextField,
  Button,
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

export default function coupangreview() {
  const classes = useStyles();
  const [producUrls, setProducUrls] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducUrls(event.target.value);
  };

  // React.useEffect(() => {
  //   Axios.get(`/api/getNewKeyword?category="패션의류"`).then(({ data }) => {
  //     console.log("data", data.data);
  //   });
  // }, []);

  const _getCoupangReview = () => {
    const reviews = [];
    producUrls.split(" ").reduce(async (promise, url) => {
      await promise;
      const { data } = await Axios.get("/api/coupangreview?productUrl=" + url);
      console.log("data", data);
      reviews.push({
        reviews: data.reviews,
        productTitle: data.productTitle,
      });
      return Promise.resolve();
    }, Promise.resolve());
    console.log("reviews", reviews);
    
  };

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <h1>쿠팡 리뷰 추출기</h1>
        <main>
          <div className={classes.root}>
            <TextField
              label="URL 입력해라"
              multiline
              rowsMax={4}
              value={producUrls}
              onChange={handleChange}
            />
            <Button variant="contained" onClick={_getCoupangReview}>
              조회 하기
            </Button>
          </div>
        </main>
      </Container>
    </div>
  );
}

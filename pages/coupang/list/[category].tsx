import React from "react";
import Head from "next/head";
import Axios from "axios";
import DefaultTable from "../../src/components/Table";

import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableRow,
  TableCell,
  Grid,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      // overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    gridList: {
      // width: 500,
      // height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

import { useRouter } from "next/router";

export default function KeyWordDetail() {
  const router = useRouter();
  const { category } = router.query;

  const classes = useStyles();
  const [productTitle, setProductTitle] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  const [googleImgs, setGoogleImgs] = React.useState([]);

  React.useEffect(() => {
    if (category) {
      getList(category);
    }
  }, [category]);

  const getList = (category) => {
    Axios.get(`/api/itemlist?category=${category}`).then(({ data }) => {
      setProductTitle(data.productTitle);
      setReviews(data.reviews);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <h1>상품 목록</h1>
        <main>
          <div className={classes.root}></div>
          <h2>{productTitle}</h2>
          <Grid container spacing={3}>
            {reviews &&
              reviews.map(({ imgs, text }) => {
                return (
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div dangerouslySetInnerHTML={{ __html: imgs }}></div>
                      <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
          <Grid container spacing={3}>
            {googleImgs &&
              googleImgs.map((src) => {
                return (
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>
                      <img src={src} />
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
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
        img {
          max-width: 200px;
          opacity: 1 !important;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

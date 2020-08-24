import React from "react";
import Head from "next/head";
import Axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
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

export default function KeyWordDetail() {
  const router = useRouter();
  const { productId } = router.query;

  const classes = useStyles();
  const [productTitle, setProductTitle] = React.useState("");
  const [productThumSrc, setProductThumSrc] = React.useState("");
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    if (productId) {
      getReviews(productId);
    }
  }, [productId]);

  const getReviews = (productId) => {
    Axios.get(`/api/itemdetail?productId=${productId}`).then(({ data }) => {
      setProductTitle(data.productTitle);
      setReviews(data.reviews);
      setProductThumSrc(data.productThumSrc);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <h1>상품 디테일</h1>
        <main>
          <div className={classes.root}></div>
          <h2>{productTitle}</h2>
          <img src={productThumSrc} />
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
        </main>
      </Container>
    </div>
  );
}

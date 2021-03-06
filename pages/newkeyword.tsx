import React from "react";
import Head from "next/head";
import Axios from "axios";
import DefaultTable from "../src/components/Table";

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

export default function Home() {
  const classes = useStyles();
  const [keywordList, setKeywordList] = React.useState([]);
  const [productTitle, setProductTitle] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  const [category, setCategory] = React.useState("");

  const getKeywords = (category) => {
    Axios.get(`/api/getNewKeyword?category=${category}`).then(({ data }) => {
      setKeywordList(data.data);
    });
  };

  const getGoogleResource = (keyword) => {
    console.log("getGoogleResource", keyword);
    Axios.get(`/api/getGoogleResource?search=${keyword}`).then(({ data }) => {
      console.log("data", data);
    });
  };

  const getReviews = (keyword) => () => {
    Axios.get(`/api/getCoupangReview?search=${keyword}`).then(({ data }) => {
      console.log("getReviews");
      setProductTitle(data.productTitle);
      setReviews(data.reviews);
      getGoogleResource(keyword);
    });
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value;
    setCategory(category as string);
    getKeywords(category);
  };

  return (
    <div className="container">
      <Head>
        <title>쿠팡 파트너스</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <h1>쇼핑 인사이트 로그</h1>
        <p>새로운 키워드 추천</p>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={handleChange}
          >
            <MenuItem value={"패션잡화"}>"패션잡화"</MenuItem>
            <MenuItem value={"디지털/가전"}>"디지털/가전"</MenuItem>
          </Select>
        </FormControl>
        <main>
          <div className={classes.root}>
            {keywordList && (
              <DefaultTable
                headCell={["키워드", "searchcount", "경쟁강도", "클릭율"]}
                rows={keywordList.map(
                  ({ keyword, clickcount, compition, searchcount }, i) => (
                    <TableRow key={keyword}>
                      <TableCell component="th" scope="row">
                        <a href={"/keyworddetail/"+keyword} target="_blank">{keyword}</a>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {searchcount}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {compition}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {clickcount}
                      </TableCell>
                    </TableRow>
                  )
                )}
              />
            )}
          </div>
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

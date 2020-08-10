import React from "react";
import Axios from "axios";
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  Theme,
  createStyles,
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

export default function () {
  const classes = useStyles();
  const [goldBoxList, setGoldBoxList] = React.useState([]);
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
  </p>;
  // React.useEffect(() => {
  //   Axios.get("/api/getGoldBox").then((data) => {
  //     data && setGoldBoxList(data.data)
  //   });
  // }, []);

  // React.useEffect(() => {
  //   Axios.get("/api/getGoldBoxDom").then(({ data }) => {
  //     console.log("data", data);
  //     data && setGoldBoxList(data.data);
  //   });
  // }, []);

  return (
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
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  img: {
    maxWidth: 300,
  },
});

export default function ({ rows }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>순위</TableCell>
            <TableCell>썸네임</TableCell>
            <TableCell align="right">이름</TableCell>
            <TableCell align="right">가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.productName}>
              <TableCell component="th" scope="row">
                {`${i + 1} 위`}
              </TableCell>
              <TableCell component="th" scope="row">
                <a href={row.productUrl}>
                  <img
                    width="300"
                    src={row.productImage}
                    alt={row.productName}
                    className={classes.img}
                  />
                </a>
              </TableCell>
              <TableCell align="right">
                <a href={row.productUrl}>{row.productName}</a>
              </TableCell>
              <TableCell align="right">{row.productPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

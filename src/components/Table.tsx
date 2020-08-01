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
    maxWidth: 950,
  },
  img: {
    maxWidth: 300,
  },
});

export default function ({ headCell, rows }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCell.map((cell) => (
              <TableCell>{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}

const TaebleForHtml = ({ rows }) => {
  return (
    <table>
      <thead>
        <tr>
          <td className="rank">순위</td>
          <td>이름</td>
          <td className="price">가격</td>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.productName}>
            <td>{`${i + 1} 위`}</td>
            <td>
              <a href={row.productUrl}>
                <p>
                  <img src={row.productImage} alt={row.productName} />
                </p>
                <h2>{row.productName}</h2>
              </a>
            </td>
            <td>{`${row.productPrice.toLocaleString()} 원`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export { TaebleForHtml };

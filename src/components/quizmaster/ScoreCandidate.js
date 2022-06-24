import { makeStyles } from "@material-ui/core";
import { TableCell, TableRow, TableBody, TableHead } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentMenuItem from "../ContentMenuItem";
import useTable from "../useTable";
const headCells = [
  { id: "name", label: "Name" },
  { id: "score", label: "Score" },
];
const styles = makeStyles(() => ({
  paper: {
    background: "transparent",
    width: "170px",
    justifyContent: "space-between",
    marginTop: "3px",
  },
  h2: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    fontWeight: 700,
  },
  btnClose: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    borderRadius: "32px",
    backgroundColor: "gold",
    border: "2px solid var(--mahogany)",
    boxShadow: " 0px 3px 6px  #00000029",
  },
  btnSubmit: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    borderRadius: "32px",
    // backgroundColor: "",
    backgroundColor: "gold",
    boxShadow: " 0px 3px 6px  #00000029",

    border: "2px solid gold",
  },
  question: {
    width: "550px",
  },
  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    justifyContent: "center",

    // font-size: var(--font-size-m);
  },
  label: {
    fontFamily: "cerapro-bold",
    // color: "#560a02",
    fontSize: "20px",
    fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
}));
export default function ScoreCandidate() {
  const [scores, setscores] = useState([]);
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const classes = styles();

  const getScore = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getScore",
      config
    );
    setscores(data);
  };
  useEffect(
    () => {
      getScore();
    },
    [],
    [scores]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          // className={classes.tableRow}
          sx={{ "& > *": { borderBottom: "none" } }}
          // style={{ height: "50px" }}
        >
          <TableCell
            // size="small"
            //   className={classes.tableCell}
            style={{
              backgroundColor: "white",
              borderRadius: "40px",
              width: "220px",
              padding: "0px 30px",

              border: "4px solid var(--mahogany-3)",
              textAlign: "center",
              fontFamily: "var(--font-family-cerapro-medium)",
              color: "#464646",
            }}
          >
            {row.candidat.firstName} {row.candidat.lastName}
          </TableCell>
          <TableCell
            style={{
              padding: "0px 30px",

              backgroundColor: "white",
              borderRadius: "40px",
              width: "220px",
              fontSize: "18px",
              border: "4px solid var(--mahogany-3)",
              textAlign: "center",
              color: "#464646",
              fontWeight: 500,
              // direction: "row",
              justifyContent: "center",
              // display: "flex",
              fontFamily: "var(--font-family-cerapro-medium)",
            }}
          >
            {row.score}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(scores, headCells, filterFn);
  return (
    <ContentMenuItem>
      <TblContainer>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              style={{
                borderRadius: "45px",
                backgroundColor: "var(--mahogany)",
                fontSize: "24px",
              }}
            >
              Name
            </TableCell>
            <TableCell
              style={{
                borderRadius: "45px",
                backgroundColor: "var(--mahogany)",
                fontSize: "24px",
              }}
              align="center"
            >
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordsAfterPagingAndSorting().map((score) => (
            <Row key={score._id} row={score} />
          ))}
        </TableBody>
      </TblContainer>
    </ContentMenuItem>
  );
}

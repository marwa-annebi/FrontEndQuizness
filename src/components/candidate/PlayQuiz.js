import { Checkbox } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import usePagination from "./Pagination";
import useTable from "../useTable";
export default function PlayQuiz() {
  const location = useLocation();
  const { from } = location.state;
  const PER_PAGE = 1;
  let [page, setPage] = useState(1);
  console.log(from);

  // console.log(p);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const [questions, setquestions] = useState(from.item.questions);
  console.log(questions);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { recordsAfterPagingAndSorting, TblPagination } = usePagination(
    questions,
    filterFn
  );
  return (
    <Fragment>
      <h1>{from.item.quizName}</h1>
      <div>
        <Stack spacing={2}>
          <Typography>
            {recordsAfterPagingAndSorting().map((item) => {
              return <h5>{item.tronc}</h5>;
            })}
          </Typography>
          <TblPagination
            count={from.item.nbQuestion}
            page={page}
            onChange={handleChangePage}
            // rowsPerPage={rowsPerPage}
            showLastButton
            showFirstButton
          />
        </Stack>
      </div>
    </Fragment>
  );
}

import { Checkbox, TablePagination } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import usePagination from "./Pagination";
import useTable from "../useTable";
import axios from "axios";
import { read } from "./api";
export default function PlayQuiz(props) {
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${candidate.token}`,
    },
  };

  const location = useLocation();
  const { from } = location.state;
  const [quiz, setquiz] = useState();
  const [count, setCount] = useState(0);
  // const [clonequestiions, setclonequestiions] = useState();
  const [propositions, setpropositions] = useState({
    candidate: candidate.user._id,
    reponses: [
      {
        questionId: "",
        // proposition: {
        //   checked: false,
        // },
        proposition: [],
      },
    ],
  });
  console.log("#propositions", propositions);
  const pages = [1, 5, 10, 25];

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const id = from.item._id;

  // console.log("#", "hellooo");

  // const getQuizById = async ({ page, perPage }) => {
  //   console.log("#", "hellooo");
  //   const { data } = await axios.get(
  //     process.env.REACT_APP_BACKEND +
  //       `/candidate/getQuizById/${id}?page=${page}&perPage=${perPage}`,
  //     config
  //   );
  //   // console.log("#data", data);
  //   const count = data.countQuestion;
  //   console.log(count);
  //   setCount(count);
  //   setquiz(data.data.questions.reverse());
  // };

  const fetchUsers = async () => {
    try {
      const { result, countQuestion } = await read({
        page: page + 1,
        perPage: rowsPerPage,
        id: id,
      });
      // console.log(result);
      setquiz(result);
      setCount(countQuestion);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(
  //   () => {
  //     getQuizById({ page: page + 1, perPage: rowsPerPage });
  //   },
  //   [],
  //   [page, rowsPerPage]
  // );
  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setpropositions({
      ...propositions,
      [name]: value || checked,
    });
  };

  return (
    <Fragment>
      <h1>{from.item.quizName}</h1>
      <div>
        <form>
          <Stack spacing={2}>
            <Typography>
              {quiz?.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <h5 >{item.tronc}</h5>
                    <div>
                      {item.propositions.map((proposition, index) => {
                        return (
                          <div key={proposition.id} style={{ display: "flex" }}>
                            <Checkbox
                              key={index}
                              // checked={propositions.reponses.checked}
                              checked={
                                !!propositions.reponses.find(
                                  (o) => o.questionId === proposition.question
                                )
                              }
                              // onChange={handleInputChange}
                              // checked={index}
                            />
                            <h6
                              value={proposition._id}
                              onChange={() => {
                                handleInputChange();
                              }}
                            >
                              {proposition.content}
                            </h6>
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </Typography>
            <TablePagination
              component="div"
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={pages}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={<div className="mt-3">Rows per page</div>}
              // labelDisplayedRows={({ from, to, count }) => (
              //   <div className="mt-3">
              //     {from}-{to} of {count !== -1 ? count : `more than ${to}`}
              //   </div>
              // )}
            />
            {/* <TblPagination /> */}
          </Stack>
          {/* {from.item.nbQuestion >= 4 ? "" : <button>terminate</button>} */}
        </form>
      </div>
    </Fragment>
  );
}

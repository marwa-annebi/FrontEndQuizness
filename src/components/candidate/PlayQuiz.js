import React, { Fragment, useEffect, useState } from "react";
import { Checkbox, TablePagination } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import usePagination from "./Pagination";
import useTable from "../useTable";
import axios from "axios";
import { read } from "./api";
import { Grid } from "@mui/material";
import NavBarCandidate from "./NavBarCandidate";
import SideMenuCandidate from "./SideMenuCandidate";
import ContentMenuItem from "../ContentMenuItem";
import { height } from "@mui/system";
export default function PlayQuiz(company_info) {
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${candidate.token}`,
    },
  };

  const location = useLocation();
  const { state } = location;
  const [quiz, setquiz] = useState();
  const [compteur, setcompteur] = useState();
  const [count, setCount] = useState(0);
  // const [clonequestiions, setclonequestiions] = useState();
  const [answercandidate, setanswercandidate] = useState([]);
  const [voucher, setvoucher] = useState(state._id);
  const pages = [1, 5, 10, 25];
  // pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const id = state.quiz;
  const [error, seterror] = useState();
  const fetchUsers = async () => {
    try {
      const { result, countQuestion, compteur, message } = await read({
        page: page,
        perPage: rowsPerPage,
        id: id,
      });
      setquiz(result);
      setCount(countQuestion);
      setcompteur(compteur);
      // const msg = message;
    } catch (error) {
      alert(error);
    }
  };
  const handleCheck = (event, _id) => {
    var updatedList = [...answercandidate];
    if (event.target.checked) {
      let add = {
        _id_proposition: _id,
        response: event.target.checked,
      };
      updatedList = [...answercandidate, add];
    } else {
      updatedList.splice(answercandidate.indexOf(event.target.value), 1);
    }
    setanswercandidate(updatedList);
  };
  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setanswercandidate({
      ...answercandidate,
      [name]: value || checked,
    });
  };
  const isChecked = (item) =>
    answercandidate.includes(item) ? "checked-item" : "not-checked-item";
  console.log("#answercandidate", answercandidate);
  const darkColor = company_info.company_info.account.darkColor;
  const lightColor = company_info.company_info.account.lightColor;

  return (
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item md={2}>
        {/* <NavBar /> */}
      </Grid>
      <Grid item md={10}>
        <NavBarCandidate {...company_info} />
      </Grid>

      <Grid item xs={8}>
        <SideMenuCandidate {...company_info} />
      </Grid>
      <Grid item xs={4}>
        <ContentMenuItem
          style={{
            borderColor: darkColor,
            boxShadow: " 0px 3px 6px #00000029",
          }}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <div
                  style={{
                    border: `4px solid ${darkColor}`,
                    borderRadius: "39px",
                    width: "60px",
                    height: "60px",
                    background: lightColor,
                    fontFamily: "var(--font-family-cerapro-bold)",
                    // textAlign: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-family-cerapro-bold)",
                      textAlign: "center",
                      color: darkColor,
                    }}
                  >
                    {compteur}
                  </h3>
                </div>
              </Grid>
              <Grid xs={7}>
                <h2
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    color: "#1D1D1D",
                  }}
                >
                  Question {page}{" "}
                </h2>
              </Grid>
              {/* <Grid item xs={12}> */}
              {quiz?.map((item) => {
                return (
                  <Grid
                    item
                    container
                    textAlign="center"
                    justifyContent="center"
                    key={item._id}
                  >
                    <Grid xs={12} item>
                      <h5>{item.tronc}</h5>
                    </Grid>
                    <Grid item>
                      {item.propositions.map((proposition, index) => {
                        return (
                          <Grid
                            xs={12}
                            item
                            key={index}
                            style={{ display: "flex" }}
                          >
                            <Checkbox
                              key={index}
                              name="response"
                              onChange={(e) => handleCheck(e, proposition._id)}
                              value={answercandidate.response}
                            />
                            <h6
                              value={answercandidate._id_proposition}
                              name="_id_proposition"
                            >
                              {proposition.content}
                            </h6>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid
              item
              style={{
                marginLeft: "290px",
                marginTop: "15px",
                borderRadius: "33px",
                // background: darkColor,
                // opacity: "0.3",
              }}
            >
              <Pagination
                count={count}
                variant="outlined"
                showFirstButton
                showLastButton
                page={page}
                onChange={handleChangePage}
                style={{
                  borderRadius: "33px",
                  color: lightColor,
                  "& .Mui-selected": {
                    backgroundColor: "transparent",
                    color: "red",
                  },
                }}
              />
            </Grid>
            {/* </Grid> */}
          </form>
          {/* </div> */}
        </ContentMenuItem>
      </Grid>
    </Grid>
  );
}

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Checkbox, makeStyles, TablePagination } from "@material-ui/core";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { read } from "./api";
import { Grid } from "@mui/material";
import NavBarCandidate from "./NavBarCandidate";
import SideMenuCandidate from "./SideMenuCandidate";
import ContentMenuItem from "../ContentMenuItem";
import Loading from "../Loading";
import Notification from "../Notification";
import Countdown from "react-countdown";
export default function PlayQuiz(company_info) {
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));

  const darkColor = company_info.company_info.account.darkColor;
  const lightColor = company_info.company_info.account.lightColor;
  const styles = makeStyles((theme) => ({
    pagination: {
      borderRadius: "33px",
      textAlign: "center",
      fontFamily: "var(--font-family-cerapro-bold)",
      "& > *": {
        marginTop: theme.spacing(2),
        justifyContent: "center",
        display: "flex",
      },
      "& .MuiButtonBase-root": {
        backgroundColor: "white",
        color: "#1D1D1D",
        fontFamily: "var(--font-family-cerapro-bold)",
        border: `1px solid ${lightColor}`,
        textAlign: "center",
      },
      "& .Mui-selected": {
        fontFamily: "var(--font-family-cerapro-bold)",
        backgroundColor: darkColor,
      },
    },
  }));
  const classes = styles();
  const location = useLocation();
  const { state } = location;
  const [quiz, setquiz] = useState([]);
  const [compteur, setcompteur] = useState();
  const [count, setCount] = useState(0);
  // const [clonequestiions, setclonequestiions] = useState();
  const [answercandidate, setanswercandidate] = useState([]);
  const [voucher, setvoucher] = useState();
  const pages = [1, 5, 10, 25];
  // pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const id = state.data.quiz;
  const _id_voucher = state.data._id;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const fetchUsers = async () => {
    try {
      const { result, countQuestion, message, timer } = await read({
        page: page,
        perPage: rowsPerPage,
        _id_voucher: _id_voucher,
        id: id,
      });

      console.log(result);
      const exist = quiz.find((item) => item._id === result[0]._id);
      if (!exist && result) setquiz([...quiz, ...result]);
      setCount(countQuestion);
      seterror(message);
      setcompteur(timer);
    } catch (error) {
      alert(error);
    }
  };
  const handleCheck = (event, _id, question) => {
    var updatedList = [...answercandidate];
    if (answercandidate.length != 0) {
      const exist = answercandidate.find(
        (item) => item._id_Question === question
      );
      if (exist) {
        if (event.target.checked) {
          exist.answers.push({
            _id_proposition: _id,
            response: event.target.checked,
          });
        } else
          exist.answers.splice(exist.answers.indexOf(event.target.value), 1);
      } else {
        let add = {
          _id_Question: question,
          answers: [{ _id_proposition: _id, response: event.target.checked }],
        };
        updatedList = [...answercandidate, add];
      }
    } else if (event.target.checked) {
      let add = {
        _id_Question: question,
        answers: [{ _id_proposition: _id, response: event.target.checked }],
      };
      updatedList = [...answercandidate, add];
    } else {
      updatedList.splice(answercandidate.indexOf(event.target.value), 1);
    }
    // else if(answercandidate)
    setanswercandidate(updatedList);
  };
  const handleCheckRadio = (event, _id, question) => {
    var updatedList = [...answercandidate];
    if (answercandidate.length != 0) {
      const exist = answercandidate.find(
        (item) => item._id_Question === question
      );
      if (exist) {
        if (event.target.checked) {
          exist.answers[0]._id_proposition = _id;
        } else
          exist.answers.splice(exist.answers.indexOf(event.target.value), 1);
      } else {
        let add = {
          _id_Question: question,
          answers: [{ _id_proposition: _id, response: event.target.checked }],
        };
        updatedList = [...answercandidate, add];
      }
    } else if (event.target.checked) {
      let add = {
        _id_Question: question,
        answers: [{ _id_proposition: _id, response: event.target.checked }],
      };
      updatedList = [...answercandidate, add];
    } else {
      updatedList.splice(answercandidate.indexOf(event.target.value), 1);
    }
    // else if(answercandidate)
    setanswercandidate(updatedList);
  };

  // api backend REACT_APP_BACKEND
  const navigate = useNavigate();
  const addAnswer = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${candidate.token}`,
      },
    };
    setvoucher(state.data._id);
    try {
      setloading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + "/candidate/correctAnswer",
        {
          _id_voucher: state.data._id,
          array: answercandidate,
          nbQuestion: state.nbQuestion,
          Tauxscore: state.Tauxscore,
        },
        config
      );
      setloading(false);
      // console.log(data);
      if (data.scoreFinal >= state.Tauxscore) {
        navigate("/Quiz/Success", { state: data });
      } else {
        navigate("/Quiz/Failed", { state: data.scoreFinal });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setloading(false);
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  console.log(state.data._id);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const getItemIndex = (question, proposition) => {
    let checked = false;
    let existQuestion = answercandidate.find(
      (item) => item._id_Question === question
    );
    if (existQuestion) {
      let result = existQuestion.answers;

      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (element._id_proposition === proposition) return true;
      }
      // for (let index = 0; index < existQuestion.array.length; index++) {
      //   const element = array[index];
      // }
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (hours === 0 && minutes === 1 && seconds === 0) {
      // Render a completed state
      return alert("please submit your answers  ");
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

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
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          {error ? (
            <h1
              style={{
                fontFamily: "var(--font-family-cerapro-bold)",
                textAlign: "center",
              }}
            >
              {error}
            </h1>
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <form onSubmit={addAnswer}>
                  <Grid container spacing={2}>
                    {/* <> */}
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
                          <Countdown
                            date={Date.now() + compteur}
                            renderer={renderer}
                          />
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
                    {quiz?.map((item, index) => {
                      return (
                        <>
                          {index + 1 === page && (
                            <Grid
                              item
                              container
                              textAlign="center"
                              justifyContent="center"
                            >
                              <Grid xs={12} item>
                                <h4
                                  style={{
                                    fontFamily:
                                      "var(--font-family-cerapro-bold)",
                                    color: "#1D1D1D",
                                  }}
                                >
                                  {item.tronc}
                                </h4>
                              </Grid>
                              <Grid key={item._id}>
                                {item.propositions?.map(
                                  (proposition, index) => {
                                    return (
                                      <Grid
                                        xs={12}
                                        item
                                        style={{ display: "flex" }}
                                        key={index}
                                      >
                                        {/* <Grid> */}
                                        {item.typeQuestion === "TF" && (
                                          <input
                                            type="radio"
                                            key={index}
                                            name="response"
                                            onChange={(e) => {
                                              handleCheckRadio(
                                                e,
                                                proposition._id,
                                                proposition.question
                                              );
                                            }}
                                            style={{
                                              color: lightColor,
                                            }}
                                            checked={getItemIndex(
                                              proposition.question,
                                              proposition._id
                                            )}
                                          />
                                        )}

                                        {item.typeQuestion === "MCQ" && (
                                          <Checkbox
                                            key={index}
                                            name="response"
                                            onChange={(e) => {
                                              handleCheck(
                                                e,
                                                proposition._id,
                                                proposition.question
                                              );
                                            }}
                                            style={{
                                              color: lightColor,
                                            }}
                                            checked={getItemIndex(
                                              proposition.question,
                                              proposition._id
                                            )}
                                          />
                                        )}
                                        {/* <Grid xs={6}> */}
                                        <h5
                                          value={
                                            answercandidate._id_proposition
                                          }
                                          name="_id_proposition"
                                          style={{
                                            fontFamily:
                                              "var(--font-family-cerapro-medium)",
                                            color: darkColor,
                                          }}
                                        >
                                          {proposition.content}
                                        </h5>
                                      </Grid>
                                    );
                                  }
                                )}
                              </Grid>
                            </Grid>
                          )}
                        </>
                      );
                    })}
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid
                      item
                      xs={10}
                      style={{
                        marginTop: "auto",
                        borderRadius: "39px",
                        backgroundColor: darkColor,
                        opacity: 0.6,
                        fontFamily: " var(--font-family-cerapro-bold)",
                        padding: "10px",

                        // margin: "auto",
                      }}
                    >
                      <Pagination
                        count={count}
                        variant="outlined"
                        showFirstButton
                        showLastButton
                        page={page}
                        style={{
                          fontFamily: " var(--font-family-cerapro-bold)",
                          color: "#1D1D1D",
                        }}
                        onChange={handleChangePage}
                        className={classes.pagination}
                      />
                    </Grid>

                    {page === count && (
                      <Grid item xs={2}>
                        <button
                          style={{
                            borderRadius: "39px",
                            color: "white",
                            background: darkColor,
                            border: "0px",
                            width: "160px",
                            height: "50px",
                            marginLeft: "5px",
                            cursor: "pointer",
                            // padding: "10px",
                            fontFamily: " var(--font-family-cerapro-bold)",
                            fontSize: "16px",
                            // marginLeft: "760px",
                            // marginTop: "30px",
                          }}
                          type="submit"
                          // onClick={addAnswer}
                          // disabled={count === page + 1}
                        >
                          Submit Answers
                        </button>
                      </Grid>
                    )}
                    {/* </Grid> */}
                  </Grid>
                </form>
              )}
            </>
          )}
        </ContentMenuItem>
      </Grid>
    </Grid>
  );
}

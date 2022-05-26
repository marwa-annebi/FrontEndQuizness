import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Button, Grid, TextField } from "@mui/material";
import SideMenu from "./SideMenu";
import Notification from "../Notification";

export default function AddQuizRandomly() {
  const [nbQuestion, setnbQuestion] = useState();
  const [creation_date, setcreation_date] = useState();
  const [questionsRandomly, setquestionsRandomly] = useState([]);
  const [validation_date, setvalidation_date] = useState();
  const [questionList, setquestionList] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const loadQuestions = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getAllQuestions",
      config
    );
    // console.log(result.data.reverse());
    setquestionList(result.data.reverse());
  };

  function getRandom() {
    const list = questionList
      .sort(function () {
        return 0.5 - Math.random();
      })
      .slice(0, nbQuestion);
    // console.log("#list", list);
    return list;
    // setquestionsRandomly(list);
  }
  // React.useEffect(() => {
  const list = getRandom();
  console.log("*list", list);
  React.useEffect(
    () => {
      loadQuestions();
      // getRandom();
    },
    [],
    [questionList]
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + "/quizmaster/createQuiz",
        {
          creation_date,
          validation_date,
          nbQuestion,
          questions: list,
        },
        config
      );
      if (data) {
        setNotify({
          isOpen: true,
          message: data.message,
          type: "success",
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  return (
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item md={2}>
        {/* <NavBar /> */}
      </Grid>
      <Grid item md={10}>
        <NavBar />
      </Grid>
      <Grid item xs={8}>
        <SideMenu />
      </Grid>
      <Grid item xs={4}>
        <div className="borderQuiz">
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid xs={4}>
                <TextField
                  label="Nb Question"
                  variant="standard"
                  type="number"
                  value={nbQuestion}
                  onChange={(e) => {
                    setnbQuestion(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  name="creation Date "
                  label="creation Date "
                  format={"yyyy/mm/dd"}
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  value={creation_date}
                  onChange={(e) => {
                    setcreation_date(e.target.value);
                  }}
                  //   InputProps={{ inputProps: { min: Date.now() } }}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  name="validation Date "
                  label="validation Date "
                  format={"yyyy/MM/DD"}
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  value={validation_date}
                  onChange={(e) => {
                    setvalidation_date(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12}>
                {" "}
                <Button type="submit">submit</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

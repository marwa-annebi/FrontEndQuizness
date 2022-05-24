import React, { useState } from "react";
import NavBar from "./NavBar";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";

export default function AddQuizRandomly() {
  const [nbQuestion, setnbQuestion] = useState();
  const [creation_date, setcreation_date] = useState();
  const [questions, setquestions] = useState([]);
  const [validation_date, setvalidation_date] = useState();
  const [questionList, setquestionList] = useState([]);
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

  React.useEffect(
    () => {
      loadQuestions();
      console.log(questionList);
    },
    [],
    [questionList]
  );
  console.log("#question list ", questionList);
  console.log("*nbQuestion", nbQuestion);

  // function getRandom() {
  //   // var result = new Array(n),
  //   var len = questionList.length;
  //   var taken = new Array(len);
  //   // questions = new Array(nbQuestion);
  //   if (nbQuestion > len)
  //     throw new RangeError("getRandom: more elements taken than available");
  //   while (nbQuestion) {
  //     var x = Math.floor(Math.random() * len);
  //     questions[nbQuestion] = questionList[x in taken ? taken[x] : x];
  //     taken[x] = --len in taken ? taken[len] : len;
  //   }
  //   return questions;
  // }
  // console.log("*--------listrandom", getRandom());

  return (
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item md={2}>
        {/* <NavBar /> */}
      </Grid>
      <Grid item md={10}>
        <NavBar />
      </Grid>

      <Grid item xs={8}>
        <div className="borderQuiz">
          <form>
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
                <Button>submit</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

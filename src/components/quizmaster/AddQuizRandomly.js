import React, { useState } from "react";
import NavBar from "./NavBar";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";

export default function AddQuizRandomly() {
  const [nbQuestion, setnbQuestion] = useState();
  const [creation_date, setcreation_date] = useState();
  const [questionsRandomly, setquestionsRandomly] = useState([]);
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

  // function getRandom() {

  // }

  // setquestionsRandomly(list);
  function getRandom() {
    let list = [];
    list = questionList
      .sort(function () {
        return 0.5 - Math.random();
      })
      .slice(0, nbQuestion);

    console.log("*list", list);
    return list;
  }
  React.useEffect(
    () => {
      let result = getRandom();
      console.log("result", result);
      // setquestionsRandomly(result);
    },
    [],
    [questionsRandomly]
  );
  React.useEffect(
    () => {
      loadQuestions();
    },
    [],
    [questionList]
  );
  console.log("*randommmm", questionsRandomly);
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

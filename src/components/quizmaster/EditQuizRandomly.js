import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { InputAdornment, makeStyles } from "@material-ui/core";
import { FiMinus } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import moment from "moment";
const styles = makeStyles((theme) => ({
  h5: {
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    paddingTop: "30px",
    fontWeight: 700,
    color: "#560a02",
  },
  textField: {
    width: "120px",
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    justifyContent: "center",
    marginRight: "100px",
  },
  input: {
    fontFamily: "cerapro-Medium",
    color: "var( --licorice)",
    textAlign: "start",
  },
  inputNumber: {
    fontFamily: "var(--font-family-cerapro-medium)",
    color: "var( --licorice)",
    textAlign: "center",
  },
  inputtextarea: {
    padding: "5px 35px 0px 35px",
    fontFamily: "cerapro-Medium",
    color: "var( --licorice)",
  },
  label: {
    fontFamily: "cerapro-Medium",
    color: "#560a02",
    fontSize: "15px",
    // fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
  title: {
    color: "var(--licorice)",
    fontFamily: "var(--font-family-cerapro-bold)",
    fontSize: "43px",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "43px",
    minHeight: "49px",
    whiteSpace: "nowrap",
    marginTop: "-5px",
  },
  txtName: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--mahogany-32)",
      // color: "var(--mahogany-32)",
    },
    backgroundColor: "var(--white)",
    marginTop: "15px",
    width: "250px",
    height: "55px",
  },
  textarea: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    backgroundColor: "var(--white)",
    width: "500px",
  },
  div: {
    borderRadius: "39px",
    border: "3px solid var(--gold)",
    background: "#FCF5D5",
    width: "250px",
    height: "50px",
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-32)",
    textAlign: "center",
    justifyContent: "center",
    // fontSize: "26px",
    // paddingTop: "5px",
    lineHeight: "16px",
    whiteSpace: 0,
    marginLeft: "140px",
  },
}));
export default function EditQuizRandomly(props) {
  const { quizId } = props;
  let date1 = moment(quizId.creation_date).format("MM-DD-yyyy");
  //   console.log(date1);
  let date2 = moment(quizId.validation_date).format("MM-DD-yyyy");
  const [nbQuestion, setnbQuestion] = useState(5);
  const [creation_date, setcreation_date] = useState();
  const [validation_date, setvalidation_date] = useState();
  const [questions, setquestions] = useState([]);
  const [quizName, setquizName] = useState("");
  const [duration, setduration] = useState(5);
  const [questionList, setquestionList] = React.useState([]);

  const classes = styles();
  useEffect(() => {
    if (quizId) {
      setnbQuestion(quizId.nbQuestion);
      setquizName(quizId.quizName);
      setcreation_date(date1);
      setvalidation_date(date2);
      //   setquestions(quizId.questions);
      setduration(quizId.duration);
    }
  }, [quizId]);
  const loadQuestions = async () => {
    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
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
  const list = getRandom();
  console.log("*list", list);
  React.useEffect(
    () => {
      loadQuestions();
    },
    [],
    [questionList]
  );
  return (
    <form>
      <Grid container textAlign="center" justifyContent="center" spacing={2}>
        <Grid item xs={6}>
          <div
            type="text"
            id="outlined-basic"
            variant="outlined"
            className={classes.div}
          >
            <h1 style={{ fontSize: "24px" }}> Quiz Name</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            className={classes.txtName}
            InputProps={{
              classes: { input: classes.input },
            }}
            value={quizName}
            onChange={(e) => {
              setquizName(e.target.value);
            }}
            style={{ marginRight: "100px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <div
            type="text"
            id="outlined-basic"
            variant="outlined"
            className={classes.div}
          >
            <h1 style={{ fontSize: "24px" }}> Nb Question</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={nbQuestion}
            className={classes.txtName}
            style={{ marginRight: "100px" }}
            InputProps={{
              classes: { input: classes.inputNumber },
              inputProps: { min: 5 },
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ color: "gold", cursor: "pointer" }}
                  onClick={() => {
                    if (nbQuestion === 5) {
                      alert("Nb Question min is 5");
                    } else {
                      setnbQuestion(nbQuestion - 1);
                    }
                  }}
                >
                  <FiMinus size={30} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ color: "gold", cursor: "pointer" }}
                  onClick={() => setnbQuestion(nbQuestion + 1)}
                >
                  <IoAdd size={30} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setnbQuestion(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <div
            type="text"
            id="outlined-basic"
            variant="outlined"
            className={classes.div}
          >
            <h1 style={{ fontSize: "24px" }}> Duration</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{ marginRight: "100px" }}
            value={duration}
            className={classes.txtName}
            InputProps={{
              classes: { input: classes.inputNumber },
              inputProps: { min: 5 },
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ color: "gold", cursor: "pointer" }}
                  onClick={() => {
                    if (duration === 5) {
                      alert("Min duration  is 5");
                    } else {
                      setduration(duration - 1);
                    }
                  }}
                >
                  <FiMinus size={30} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <h4
                    style={{
                      fontFamily: "var(--font-family-cerapro-bold)",
                      color: "var(--mahogany-32)",
                      marginRight: "30px",
                    }}
                  >
                    Min
                  </h4>
                  <IoAdd
                    style={{ color: "gold", cursor: "pointer" }}
                    onClick={() => setduration(duration + 1)}
                    size={30}
                  />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setduration(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <div
            type="text"
            id="outlined-basic"
            variant="outlined"
            className={classes.div}
          >
            <h1 style={{ fontSize: "24px" }}>Creation Date</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="creation Date "
            id="outlined-basic"
            variant="outlined"
            className={classes.txtName}
            style={{ marginRight: "100px" }}
            InputProps={{
              classes: { input: classes.input },
              style: {
                color: "#560A02",
                fontFamily: "var(--font-family-cerapro-bold)",
                fontWeight: 700,
                fontSize: "20px",
              },
            }}
            format={"yyyy/mm/dd"}
            InputLabelProps={{
              shrink: true,
              required: true,
              style: {
                color: "#560A02",
                fontFamily: "var(--font-family-cerapro-bold)",
                fontWeight: 700,
                fontSize: "20px",
              },
            }}
            type="date"
            value={creation_date}
            onChange={(e) => {
              setcreation_date(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <div
            type="text"
            id="outlined-basic"
            variant="outlined"
            className={classes.div}
          >
            <h1 style={{ fontSize: "24px" }}> Validation Date</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="validation Date "
            style={{ marginRight: "100px" }}
            format={"yyyy/MM/DD"}
            value={validation_date}
            type="date"
            InputLabelProps={{ shrink: true, required: true }}
            id="outlined-basic"
            variant="outlined"
            className={classes.txtName}
            InputProps={{
              classes: { input: classes.input },
              style: {
                color: "#560A02",
                fontFamily: "var(--font-family-cerapro-bold)",
                fontWeight: 700,
                fontSize: "20px",
              },
            }}
            onChange={(e) => {
              setvalidation_date(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <button
            className="btnVerif border-1px-dove-gray"
            variant="contained"
            type="submit"
            style={{
              marginLeft: "50px",
              textAlign: "center",
              //   marginTop: "30px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-family-cerapro-bold)",
                fontWeight: 700,
                fontSize: "24px",
                marginTop: "-4px",
              }}
            >
              Update
            </div>
          </button>
        </Grid>
      </Grid>
    </form>
  );
}

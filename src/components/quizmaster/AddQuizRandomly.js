import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Alert, Button, Grid, TextField } from "@mui/material";
import SideMenu from "./SideMenu";
import Notification from "../Notification";
import { InputAdornment, makeStyles } from "@material-ui/core";
import { FiMinus } from "react-icons/fi";
import NumericInput from "react-numeric-input";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { IoAdd } from "react-icons/io5";
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
export default function AddQuizRandomly(props) {
  const [nbQuestion, setnbQuestion] = useState(10);
  const [creation_date, setcreation_date] = useState();
  const [questionsRandomly, setquestionsRandomly] = useState([]);
  const [validation_date, setvalidation_date] = useState();
  const [questionList, setquestionList] = useState([]);
  const [quizName, setquizName] = useState("");
  const [duration, setduration] = useState(1);
  const [tauxscore, settauxscore] = useState(50);
  console.log(tauxscore);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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

  console.log(questionList);
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
    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
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
          quizName,
          duration,
          typeQuiz: "randomly",
          Tauxscore: tauxscore,
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
  const classes = styles();
  return (
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item md={2}>
        {/* <NavBar /> */}
      </Grid>
      <Grid item md={10}>
        <NavBar {...props} />
      </Grid>
      <Grid item xs={8}>
        <SideMenu {...props} />
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
            <Grid
              container
              textAlign="center"
              justifyContent="center"
              spacing={2}
              style={{ marginTop: "-15px" }}
            >
              <Grid item xs={6}>
                <div
                  // label="quizName"
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
                  // label="quizName"
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  className={classes.txtName}
                  // InputProps={{}}
                  InputProps={{
                    classes: { input: classes.input },
                    startAdornment: (
                      <InputAdornment position="start">
                        <h4
                          style={{
                            fontFamily: "var(--font-family-cerapro-bold)",
                            color: "var(--mahogany-32)",
                          }}
                        >
                          Quiz_
                        </h4>
                      </InputAdornment>
                    ),
                  }}
                  value={quizName}
                  // style={{ borderRadius: "20px", border: "4px solid gold" }}
                  onChange={(e) => {
                    setquizName(e.target.value);
                  }}
                  style={{ marginRight: "100px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  // label="quizName"
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
                  // label="Nb Question"
                  // variant="standard"
                  // type="number"
                  // min="5"
                  // max="210"
                  // style={{ borderRadius: "20px", border: "4px solid gold" }}
                  value={nbQuestion}
                  className={classes.txtName}
                  mobile
                  // min={5}
                  // max={100}
                  style={{ marginRight: "100px" }}
                  InputProps={{
                    classes: { input: classes.inputNumber },
                    // inputProps: { min: 5 },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ color: "gold", cursor: "pointer" }}
                        onClick={() => {
                          setnbQuestion(nbQuestion - 1);
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
                  // InputProps={{  }}
                  onChange={(e) => {
                    setnbQuestion(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  // label="quizName"
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
                          setduration(duration - 1);
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
                          Minutes
                        </h4>
                        <IoAdd
                          style={{ color: "gold", cursor: "pointer" }}
                          onClick={() => setduration(duration + 1)}
                          size={30}
                        />
                      </InputAdornment>
                    ),
                  }}
                  // InputProps={{  }}
                  onChange={(e) => {
                    setduration(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  // label="quizName"
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  className={classes.div}
                >
                  <h1 style={{ fontSize: "24px" }}> Taux Score</h1>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginRight: "100px" }}
                  value={tauxscore}
                  className={classes.txtName}
                  // mobile
                  InputProps={{
                    classes: { input: classes.inputNumber },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ color: "gold", cursor: "pointer" }}
                        onClick={() => {
                          settauxscore(tauxscore - 1);
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
                          %
                        </h4>
                        <IoAdd
                          style={{ color: "gold", cursor: "pointer" }}
                          onClick={() => settauxscore(tauxscore + 1)}
                          size={30}
                        />
                      </InputAdornment>
                    ),
                  }}
                  // InputProps={{  }}
                  onChange={(e) => {
                    settauxscore(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  // label="quizName"
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
                  //   InputProps={{ inputProps: { min: Date.now() } }}
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  // label="quizName"
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
                  // label="validation Date "
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
                  // style={{ borderRadius: "20px", border: "4px solid gold" }}
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
                  // onClick={handleNext}
                  style={{
                    marginLeft: "50px",
                    // height: "20px",

                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "-15px",
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
                    Randomize
                  </div>
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

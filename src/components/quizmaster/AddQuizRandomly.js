import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Button, Grid, TextField } from "@mui/material";
import SideMenu from "./SideMenu";
import Notification from "../Notification";
import { InputAdornment, makeStyles } from "@material-ui/core";
import NumericInput from "react-numeric-input";
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
  },
  input: {
    fontFamily: "cerapro-Medium",
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
      border: "3px solid var(--gold)",
    },
    backgroundColor: "var(--white)",
    marginTop: "15px",
    width: "300px",
    height: "45px",
  },
  textarea: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    backgroundColor: "var(--white)",
    width: "500px",
  },
}));
export default function AddQuizRandomly(props) {
  const [nbQuestion, setnbQuestion] = useState(5);
  const [creation_date, setcreation_date] = useState();
  const [questionsRandomly, setquestionsRandomly] = useState([]);
  const [validation_date, setvalidation_date] = useState();
  const [questionList, setquestionList] = useState([]);
  const [quizName, setquizName] = useState("");
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
            <Grid container textAlign="center" spacing={2}>
              <Grid xs={12}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <NumericInput
                  // label="Nb Question"
                  // variant="standard"
                  type="number"
                  // min="5"
                  // max="210"
                  // style={{ borderRadius: "20px", border: "4px solid gold" }}
                  value={nbQuestion}
                  className={classes.txtName}
                  mobile
                  min={5}
                  // max={100}
                  // InputProps={{
                  //   classes: { input: classes.input },
                  //   inputProps: { min: 5 },
                  // }}
                  // InputProps={{  }}
                  // onChange={(e) => {
                  //   setnbQuestion(e.target.value);
                  // }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="creation Date "
                  id="outlined-basic"
                  variant="outlined"
                  className={classes.txtName}
                  InputProps={{
                    classes: { input: classes.input },
                  }}
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
              <Grid item xs={12}>
                <TextField
                  name="validation Date "
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
                  }}
                  // style={{ borderRadius: "20px", border: "4px solid gold" }}
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

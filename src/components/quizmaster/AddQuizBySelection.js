import React, { useState } from "react";
import { Box, Checkbox, Grid, TextField } from "@mui/material";
import { Table, TableBody, TableCell, TableHead } from "@mui/material";
import TableRow from "@material-ui/core/TableRow";
import { FiMinus } from "react-icons/fi";
import NavBar from "./NavBar";
import "./../../css/addQuiz.css";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { alpha, InputAdornment, makeStyles } from "@material-ui/core";
import Notification from "../Notification";
import SideMenu from "./SideMenu";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
const headCells = [
  // { id: "", label: "" },
  { id: "_id_question", label: "Id" },
  { id: "tronc", label: "tronc" },
  { id: "skill", label: "skill" },
];
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
  button: {
    // "&:disabled": {
    // color: "var(--mahogany)",
    // },

    "&:disabled": {
      color: "red",
      // backgroundColor: ...,
    },
  },
  tableRowSelected: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  },
}));

export default function AddQuizBySelection(props) {
  const { selected } = props;
  const theme = useTheme();
  const [questionList, setquestionList] = React.useState([]);
  const [categories, setcategories] = useState([]);
  const [nbQuestion, setnbQuestion] = useState(10);
  const [creation_date, setcreation_date] = useState();
  const [validation_date, setvalidation_date] = useState();
  const [questions, setquestions] = useState([]);
  const [quizName, setquizName] = useState("");
  const [duration, setduration] = useState(15);
  const [loading, setloading] = useState(false);
  const [tauxscore, settauxscore] = useState(50);
  const [count, setcount] = useState(0);
  const [filterSkill, setfilterSkill] = useState("");
  const handleChangeFilter = (event) => {
    setfilterSkill(event.target.value);
  };

  const loadCategories = async () => {
    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    // console.log(quizmasterInfo.token);
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getSkills",
      config
    );
    setcategories(result.data.reverse());
  };
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
    console.log(result.data.reverse());
    setquestionList(result.data.reverse());
  };

  React.useEffect(
    () => {
      loadQuestions();
      loadCategories();
    },
    [],
    [questionList, categories]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleChangeQuestion = (e) => {
    const { value, checked } = e.target;
    // console.log(check);
    let nb = questions.length;
    // console.log("nbq", nb);
    if (checked) {
      if (questions.length < nbQuestion) {
        setquestions((prev) => [...prev, value]);
        // let res = count++;
        setcount(count + 1);
      }
      console.log(questions);
    } else {
      setquestions((prev) => prev.filter((x) => value !== x));
      setcount(count - 1);
    }
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = styles();
  const isSelected = (_id) => questions.indexOf(_id) !== -1;
  const steps = [
    {
      object: (
        <Grid
          container
          textAlign="center"
          justifyContent="center"
          spacing={2}
          // style={{ marginTop: "10px" }}
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
              // mobile
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
        </Grid>
      ),
    },
    {
      object: (
        <Box
          container
          style={{
            paddingRight: "20px",
            paddingLeft: "20px",
            maxHeight: "380px",
            overflow: "auto",
          }}
        >
          <Table size="small" aria-label="purchases">
            <TableHead style={{ borderBottom: "none" }}>
              <TableRow style={{ backgroundColor: "#F2DDDB" }}>
                <TableCell
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    borderRadius: "39px",
                    width: "10px",
                    height: "10px",
                    textAlign: "center",
                    fontSize: "20px",
                    width: "10px",
                    color: "var(--heavy-metal)",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    borderRadius: "39px",
                    width: "180px",
                    height: "10px",
                    textAlign: "center",
                    fontFamily: "var(--font-family-cerapro-bold)",
                    color: "var(--heavy-metal)",

                    fontSize: "20px",
                    borderLeft: "4px solid var(--mahogany-3)",
                  }}
                >
                  Tronc
                </TableCell>
                <TableCell
                  style={{
                    // padding: "15px 15px",
                    // backgroundColor: "var(--mahogany-3)",
                    borderRadius: "39px",
                    width: "10px",
                    height: "10px",
                    textAlign: "center",
                    fontSize: "20px",
                    // border-radius: 39px;
                    fontFamily: "var(--font-family-cerapro-bold)",
                    color: "var(--heavy-metal)",

                    borderLeft: "4px solid var(--mahogany-3)",
                  }}
                >
                  Skill Name
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {questionList?.map((row) => {
                const isItemSelected = isSelected(row._id);
                return (
                  <TableRow
                    hover
                    key={row._id}
                    onClick={handleChangeQuestion}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                    style={{
                      backgroundColor: isItemSelected ? "var(--gold-2)" : "",
                    }}
                  >
                    {/* <TableCell>
             
                    </TableCell> */}
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        fontFamily: "var(--font-family-cerapro-medium)",
                        color: "var(--heavy-metal)",
                        width: "30px",
                      }}
                    >
                      <Checkbox
                        style={{
                          color: "var(--gold)",
                        }}
                        color="primary"
                        value={row._id}
                        selected={isItemSelected}
                        // onChange={handleChangeQuestion}
                        // onClick="this.checked"
                        // checked={checked.indexOf(item) !== -1}
                        checked={questions.indexOf(row._id) >= 0}
                      />
                      {row._id_question}
                    </TableCell>
                    <TableCell
                      style={{
                        borderLeft: "4px solid var(--mahogany-3)",
                        fontFamily: "var(--font-family-cerapro-medium)",
                        color: "var(--heavy-metal)",
                      }}
                    >
                      {row.tronc}
                    </TableCell>
                    <TableCell
                      style={{
                        borderLeft: "4px solid var(--mahogany-3)",
                        fontFamily: "var(--font-family-cerapro-medium)",
                        color: "var(--heavy-metal)",
                      }}
                    >
                      {row.skill.skill_name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      ),
    },
  ];
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
          questions,
          quizName,
          duration,
          typeQuiz: "selection",
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
  function getFilteredQuestions() {
    //  const { questionList, filterSkill } = this.state;
    if (!filterSkill) {
      console.log(questionList);
      return questionList;
    }
    return questionList.filter(
      (singleQuestion) => singleQuestion.skill.skill_name === filterSkill
    );
  }
  const checkedValues = { ...questions };
  const checkedCount = Object.values(checkedValues).filter(
    (value) => value
  ).length;
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
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
            {/* <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}> */}
            {steps[activeStep].object}
            {/* </Box> */}
            {activeStep === steps.length - 1 && (
              <Grid xs={12} style={{ display: "flex", direction: "row" }}>
                <button
                  className="btnVerif border-1px-dove-gray"
                  variant="contained"
                  type="submit"
                  // onClick={handleNext}
                  style={{
                    marginLeft: "300px",
                    // height: "20px",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-family-cerapro-bold)",
                      fontWeight: 700,
                      fontSize: "24px",
                      // marginTop: "-4px",
                    }}
                  >
                    Selection
                  </div>
                </button>
                <div
                  style={{
                    marginLeft: "200px",
                    marginTop: "30px",
                    border: "4px solid var(--mahogany)",
                    borderRadius: "38px",
                    color: "var(--mahogany)",
                    fontFamily: "var(--font-family-cerapro-bold)",
                    background: "#F2DDDB",
                    width: "100px",
                    // height: "50px",
                    textAlign: "center",
                    padding: "10px",
                    boxShadow: "0px 3px 9px #00000091",
                  }}
                >
                  {count}/{nbQuestion}
                </div>
              </Grid>
            )}
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              style={{
                fontFamily: "var(--font-family-cerapro-bold)",
                // boxShadow: "0px 3px 9px #00000091",
                // marginTop: "-20px",
                // background: "transparent",
                marginBottom: "0px",
              }}
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  style={{
                    color: "var(--gold)",
                    fontFamily: "var(--font-family-cerapro-bold)",
                  }}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  // classes={{ disabled: classes.disabledButton }}
                  // className={classes.button}
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    // disabled: { color: "gold" || "red" },
                  }}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />

            {/* </Grid> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

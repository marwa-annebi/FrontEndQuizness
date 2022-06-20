// import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { Form, useForm } from "../useForm";
import { Button, Checkbox, makeStyles } from "@material-ui/core";
import addmultiChoice from "./../../assets/Groupe 84.svg";
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import axios from "axios";
import Item from "antd/lib/list/Item";
import PropositionCheckbox from "./PropositionCheckbox";
import Notification from "../Notification";
import Loading from "../Loading";
const styles = makeStyles(() => ({
  paper: {
    color: "transparent",
    width: "170px",
    justifyContent: "space-between",
    marginTop: "3px",
  },
  h2: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    fontWeight: 700,
  },
  title: {
    color: "var(--licorice)",
    fontFamily: "var(--font-family-cerapro-bold)",
    fontSize: "35px",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "43px",
    minHeight: "49px",
    whiteSpace: "nowrap",
    marginTop: "-5px",
  },
  btnClose: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    borderRadius: "32px",
    backgroundColor: "gold",
    border: "2px solid var(--mahogany)",
    boxShadow: " 0px 3px 6px  #00000029",
  },
  btnSubmit: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    borderRadius: "32px",
    // backgroundColor: "",
    backgroundColor: "gold",
    boxShadow: " 0px 3px 6px  #00000029",

    border: "2px solid gold",
  },
  question: {
    width: "550px",
  },
  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    justifyContent: "center",

    // font-size: var(--font-size-m);
  },
  label: {
    fontFamily: "cerapro-bold",
    // color: "#560a02",
    fontSize: "20px",
    fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
  textarea: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    backgroundColor: "var(--white)",
    width: "500px",
  },

  inputtextarea: {
    padding: "5px 35px 0px 35px",
    fontFamily: "cerapro-Medium",
    color: "var( --licorice)",
  },
}));
export default function QuestionForm(props) {
  const { loadQuestions, questionId, setclose } = props;
  const classes = styles();
  const [loading, setloading] = useState(false);
  const [question, setquestion] = useState({
    tronc: "",
    skill: "",
    propositions: [
      { content: "", veracity: false },
      { content: "", veracity: false },
      { content: "", veracity: false },
      { content: "", veracity: false },
    ],
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleCheckBoxAdd = () => {
    const proposition = { content: "", veracity: false };
    const updateProposition = question;
    updateProposition.propositions.push(proposition);
    setquestion({ ...updateProposition });
  };
  const [categories, setcategories] = useState([]);
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

  useEffect(() => {
    loadCategories();
    if (questionId) setquestion({ ...questionId });
  }, []);
  const addQuestion = async (e) => {
    e.preventDefault();

    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      setloading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + "/quizmaster/finishQuestion",
        {
          question: {
            tronc: question.tronc,
            skill: question.skill,
            typeQuestion: "MCQ",
          },
          proposition: question.propositions,
        },
        config
      );
      setclose();
      setloading(false);

      loadQuestions();
      // if (data) {
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
      // }s
    } catch (error) {
      setloading(false);

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
  const updateQuestion = async () => {
    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_BACKEND + "/quizmaster/",
        {
          question: {
            tronc: question.tronc,
            skill: question.skill,
            typeQuestion: "MCQ",
          },
          proposition: question.propositions,
        },
        config
      );
      loadQuestions();
      if (data) {
        setNotify({
          isOpen: true,
          message: "Submitted Successfully",
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setquestion({
      ...question,
      [name]: value,
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form>
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <div
            style={{
              direction: "row",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {/* <div class="w3-container w3-center w3-animate-top"> */}
            <img
              src={addmultiChoice}
              style={{
                width: "30px",
                height: "30px",
                // marginLeft: "77px",
                // cursor: "pointer",
                // display: "inline",
                marginRight: "5px",
              }}
              className="iconaddskill"
            />
            <h1 className={classes.title}>MultiChoice</h1>
          </div>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}> */}
            <Grid xs={12}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                  // marginBottom: "-15px",
                }}
              >
                choose Skill
              </div>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth sx={{ m: 1, width: 250 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    textAlign: "center",
                    fontFamily: "var(--font-family-cerapro-medium)",
                    justifyContent: "center",
                  }}
                >
                  <h3
                    style={{
                      marginTop: "2px",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Skill
                  </h3>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question.skill}
                  onChange={handleInputChange}
                  label="Age"
                  name="skill"
                  style={{ border: "3px solid gold", borderRadius: "49px" }}
                >
                  <MenuItem value="">
                    <em>Skill</em>
                  </MenuItem>
                  {categories?.map((key) => (
                    <MenuItem value={key._id}>{key.skill_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                  // marginBottom: "-15px",
                }}
              >
                Question
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                // label="Outlined"
                value={question.tronc}
                onChange={handleInputChange}
                name="tronc"
                placeholder="type your question here..."
                variant="outlined"
                // className={classes.question}
                multiline
                rows={2}
                // maxRows={2}
                className={classes.textarea}
                InputProps={{
                  className: classes.inputtextarea,
                }}
                InputLabelProps={{ className: classes.label }}

                // className={classes.textarea}
              />
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                  // marginBottom: "-15px",
                }}
              >
                Options
              </div>
            </Grid>
            {question.propositions.map((item, index) => {
              {
                /* console.log("#item", item); */
              }
              return (
                <div key={index}>
                  <PropositionCheckbox
                    setquestion={setquestion}
                    index={index}
                    question={question}
                  />
                </div>
              );
            })}
            {question.propositions.length < 8 && (
              <Grid xs={4}>
                <Button
                  style={{
                    border: "3px dashed var(--gold)",
                    borderRadius: "49px",
                    width: "210px",
                    height: "50px",
                    marginTop: "15px",
                  }}
                  onClick={handleCheckBoxAdd}
                >
                  <IoAddOutline
                    style={{ color: "var(--mahogany)", fontSize: "35px" }}
                  />
                </Button>
              </Grid>
            )}
          </Grid>
          {/* </form> */}
          <br />
          <Grid>
            <Grid spacing={2} xs={12}>
              <button
                className="btnVerif border-1px-dove-gray"
                variant="contained"
                type="submit"
                // onClick={handleNext}
                style={{
                  marginLeft: "50px",
                  // height: "10px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    fontWeight: 700,
                    fontSize: "26px",
                  }}
                  onClick={() => {
                    if (!questionId) {
                      addQuestion();
                    } else if (questionId) {
                      // updateQuestion();
                      console.log("helllooo edit ");
                    }
                  }}
                >
                  OKAY
                </div>
              </button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}

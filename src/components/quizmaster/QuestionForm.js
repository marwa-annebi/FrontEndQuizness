// import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { Form, useForm } from "../useForm";
import { Button, Checkbox, makeStyles } from "@material-ui/core";
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import Item from "antd/lib/list/Item";
import PropositionCheckbox from "./PropositionCheckbox";
import Notification from "../Notification";
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
}));
export default function QuestionForm(props) {
  const { loadQuestions, questionId } = props;
  const classes = styles();
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
    const proposition = { content: "", veracity: "" };
    const updateProposition = question;
    updateProposition.propositions.push(proposition);
    setquestion({ ...updateProposition });
  };
  const [categories, setcategories] = useState([]);
  const loadCategories = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
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
  const addQuestion = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
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
  const updateQuestion = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
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
    <form>
      <Notification
        notify={notify}
        setNotify={setNotify}
        vertical="top"
        horizontal="right"
      />
      <h2 className={classes.h2}>Add Multi Choice Question</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Skill
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={question.skill}
              onChange={handleInputChange}
              label="Age"
              name="skill"
            >
              {categories?.map((key) => (
                <MenuItem value={key._id}>{key.skill_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
            className={classes.question}
            multiline
            rows={4}
            maxRows={8}
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{ className: classes.label }}
          />
        </Grid>
        {question.propositions.map((item, index) => {
          console.log("#item", item);
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
          <Grid xs={12}>
            <Button onClick={handleCheckBoxAdd}>
              add composant of checkbox
            </Button>
          </Grid>
        )}
      </Grid>
      {/* </form> */}
      <br />
      <Grid>
        <Grid spacing={2} xs={12}>
          <Button
            type="submit"
            onClick={() => {
              if (!questionId) {
                addQuestion();
              } else if (questionId) {
                // updateQuestion();
                console.log("helllooo edit ");
              }
            }}
            className={classes.btnSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

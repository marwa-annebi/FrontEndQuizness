import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import NavBar from "./NavBar";
import "./../../css/addQuiz.css";
import moment from "moment";
import axios from "axios";
import useTable from "../useTable";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { Button } from "@material-ui/core";
import Notification from "../Notification";
import SideMenu from "./SideMenu";
const headCells = [
  { id: "", label: "" },
  { id: "_id_question", label: "Id" },
  { id: "tronc", label: "tronc" },
  { id: "skill", label: "skill" },
];
export default function AddQuizBySelection() {
  const [questionList, setquestionList] = React.useState([]);
  const [categories, setcategories] = useState([]);
  const [nbQuestion, setnbQuestion] = useState();
  const [creation_date, setcreation_date] = useState();
  const [validation_date, setvalidation_date] = useState();
  const [questions, setquestions] = useState([]);
  const [loading, setloading] = useState(false);
  const [filterSkill, setfilterSkill] = useState("");
  const handleChangeFilter = (event) => {
    setfilterSkill(event.target.value);
  };

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
    console.log("nbq", nb);
    if (checked) {
      if (questions.length < nbQuestion) {
        setquestions((prev) => [...prev, value]);
      }
      console.log(questions);
    } else {
      setquestions((prev) => prev.filter((x) => value !== x));
    }
  };

  console.log("#nb", nbQuestion);
  console.log("#ques", questions);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(questionList, headCells, filterFn);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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
          questions,
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

  console.log(...questions);
  return (
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item xs={12}>
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Skill
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                    name="skill"
                    value={filterSkill}
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value="">all</MenuItem>

                    {categories?.map((key) => (
                      <MenuItem
                        value={key.skill_name}
                        onClick={getFilteredQuestions}
                      >
                        {key.skill_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            style={{
                              color: "var(--gold)",
                            }}
                            color="primary"
                            value={item._id}
                            onChange={handleChangeQuestion}
                            // onClick="this.checked"
                            // checked={checked.indexOf(item) !== -1}
                            checked={questions.indexOf(item._id) >= 0}
                          />
                        </TableCell>
                        <TableCell>{item._id_question}</TableCell>
                        <TableCell>{item.tronc}</TableCell>
                        <TableCell>{item.skill.skill_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination />
              </Grid>
            </Grid>
            <Grid>
              <Button type="submit">submit</Button>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

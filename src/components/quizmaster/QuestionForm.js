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
  const classes = styles();
  const initialFValues = {
    id: 0,
    tronc: "",
    skill: "",
    propositions: [
      { content: "", veracity: false },
      { content: "", veracity: false },
      { content: "", veracity: false },
      { content: "", veracity: false },
    ],
  };

  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
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
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      {/* <div style={{ flexDirection: "column", display: "block" }}> */}{" "}
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
              value={values.skill}
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
          {/* <FormControl variant="standard" sx={{ m: 2, minWidth: 180 }}> */}
          <TextField
            id="outlined-basic"
            // label="Outlined"
            value={values.tronc}
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
        <Grid xs={6}>
          {/* <div style={{ direction: "row" }}> */}

          <Checkbox
            name="values.propositions[0].veracity"
            defaultValue={values.propositions[0].veracity}
            onChange={handleInputChange}
          ></Checkbox>
          {/* <Grid xs={2}>  */}

          <TextField
            name="values.propositions[0].content"
            id="standard-basic"
            label="Option 1"
            variant="standard"
            value={values.propositions[0].content}
            onChange={handleInputChange}
          />
          {/* </div> */}
        </Grid>
        <Grid xs={6}>
          <Checkbox
            name="values.propositions[1].veracity"
            defaultValue={values.propositions[1].veracity}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="values.propositions[1].content"
            id="standard-basic"
            label="Option 2"
            variant="standard"
            value={values.propositions[1].content}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid xs={6}>
          <Checkbox
            name="values.propositions[2].veracity"
            defaultValue={values.propositions[2].veracity}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="values.propositions[3].content"
            id="standard-basic"
            label="Option 3"
            variant="standard"
            value={values.propositions[2].content}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid xs={6}>
          <Checkbox
            name="values.propositions[3].veracity"
            defaultValue={values.propositions[3].veracity}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="values.propositions[3].content"
            id="standard-basic"
            label="Option 4"
            variant="standard"
            value={values.propositions[3].content}
            onChange={handleInputChange}
          />
        </Grid>
        {/* </FormControl> */}
      </Grid>
      {/* </form> */}
      <br />
      <Grid>
        <Grid spacing={2} xs={12}>
          <Button
            // variant="outlined"
            // color="success"
            type="submit"
            className={classes.btnSubmit}
          >
            Submit
          </Button>
          <Button
            // variant="outlined"
            // color="success"
            type="submit"
            className={classes.btnSubmit}
            onClick={resetForm}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}

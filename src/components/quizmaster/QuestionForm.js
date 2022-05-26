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
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    option6: "",
    option7: "",
    option8: "",
    veracity1: false,
    veracity2: false,
    veracity3: false,
    veracity4: false,
    veracity5: false,
    veracity6: false,
    veracity7: false,
    veracity8: false,
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
  let checkboxs = [
    {
      id: 0,
      checkbox: (
        <Grid xs={6}>
          <Checkbox
            name="veracity1"
            defaultValue={values.veracity1}
            onChange={handleInputChange}
          ></Checkbox>
          {/* <Grid xs={2}>  */}

          <TextField
            name="option1"
            id="standard-basic"
            label="Option 1"
            variant="standard"
            value={values.option1}
            onChange={handleInputChange}
          />
        </Grid>
      ),
    },
    {
      id: 1,
      checkbox: (
        <Grid xs={6}>
          {/* <div style={{ direction: "row" }}> */}

          <Checkbox
            name="veracity2"
            defaultValue={values.veracity1}
            onChange={handleInputChange}
          ></Checkbox>
          {/* <Grid xs={2}>  */}

          <TextField
            name="option2"
            id="standard-basic"
            label="Option 2"
            variant="standard"
            value={values.option2}
            onChange={handleInputChange}
          />
          {/* </div> */}
        </Grid>
      ),
    },
    {
      id: 2,

      checkbox: (
        <Grid xs={6}>
          <Checkbox
            name="veracity3"
            defaultValue={values.veracity3}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="option3"
            id="standard-basic"
            label="Option 3"
            variant="standard"
            value={values.option3}
            onChange={handleInputChange}
          />
        </Grid>
      ),
    },
    {
      id: 3,

      checkbox: (
        <Grid xs={6}>
          <Checkbox
            name="veracity4"
            defaultValue={values.veracity4}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="option4"
            id="standard-basic"
            label="Option 4"
            variant="standard"
            value={values.option4}
            onChange={handleInputChange}
          />
        </Grid>
      ),
    },
  ];
  const [propositions, setpropositions] = useState(checkboxs);
  const othercheckboxs = [
    {
      id: 4,

      checkbox: (
        <Grid xs={6}>
          <Checkbox
            name="veracity5"
            defaultValue={values.veracity5}
            onChange={handleInputChange}
          ></Checkbox>
          {/* <Grid xs={2}>  */}

          <TextField
            name="option5"
            id="standard-basic"
            label="Option 5"
            variant="standard"
            value={values.option5}
            onChange={handleInputChange}
          />
        </Grid>
      ),
    },
    {
      id: 5,

      checkbox: (
        <Grid xs={6}>
          {/* <div style={{ direction: "row" }}> */}

          <Checkbox
            name="veracity6"
            defaultValue={values.veracity6}
            onChange={handleInputChange}
          ></Checkbox>
          {/* <Grid xs={2}>  */}

          <TextField
            name="option6"
            id="standard-basic"
            label="Option 6"
            variant="standard"
            value={values.option6}
            onChange={handleInputChange}
          />
          {/* </div> */}
        </Grid>
      ),
    },
    {
      id: 6,

      checkbox: (
        <Grid xs={6}>
          <Checkbox
            name="veracity7"
            defaultValue={values.veracity7}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="option7"
            id="standard-basic"
            label="Option 7"
            variant="standard"
            value={values.option7}
            onChange={handleInputChange}
          />
        </Grid>
      ),
    },
    {
      id: 7,
      checkbox: (
        <Grid xs={6}>
          <Checkbox
            name="veracity8"
            defaultValue={values.veracity8}
            onChange={handleInputChange}
          ></Checkbox>
          <TextField
            name="option8"
            id="standard-basic"
            label="Option 8"
            variant="standard"
            value={values.option8}
            onChange={handleInputChange}
          />
        </Grid>
      ),
    },
  ];
  const handleServiceAdd = () => {
    // const checkbox = othercheckboxs.find((i) => {
    //   propositions.map((item) => {
    //     item.id !== i.id;
    //   });
    // });

    const checkbox = othercheckboxs.find((i) => !propositions.includes(i.id));
    console.log("#checkbox", checkbox);
    if (checkbox) setpropositions((prev) => [...prev, checkbox]);
  };
  console.log("#propositions", propositions);
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
        {propositions.map((item, index) => {
          return item.checkbox;
        })}
        {propositions.length < 8 && (
          <Grid xs={12}>
            <Button onClick={handleServiceAdd}>
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

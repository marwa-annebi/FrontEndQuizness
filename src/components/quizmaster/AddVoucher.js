import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import trac from "./../../assets/ticket-sharp-svgrepo-com.svg";
import { GrAdd } from "react-icons/gr";
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
    fontSize: "33px",
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
export default function AddVoucher(candidat, onClose) {
  //   const { setOpenPopup, skill, onClose } = props;
  const [quizzes, setquizzes] = useState([]);
  const [voucher, setvoucher] = useState({
    quiz: "",
    creation_date: "",
    validation_date: "",
    // candidat: candidat,
  });
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${quizmasterInfo.token}`,
    },
  };
  const loadQuizzes = async () => {
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/findAllQuiz",
      config
    );
    console.log(result.data.reverse());
    setquizzes(result.data.reverse());
  };
  useEffect(
    () => {
      loadQuizzes();
    },
    [],
    [quizzes]
  );
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  console.log("#voucher", voucher);
  console.log(candidat.candidat);
  const addVoucher = async () => {
    const result = await axios.post(
      process.env.REACT_APP_BACKEND + "/quizmaster/createVoucher",
      {
        quiz: voucher.quiz,
        validation_date: voucher.validation_date,
        creation_date: voucher.creation_date,
        candidat: candidat.candidat,
      },
      config
    );
    console.log(result);
    if (result) {
      setNotify({
        isOpen: true,
        message: result.message,
        type: "success",
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setvoucher({
      ...voucher,
      [name]: value,
    });
  };
  const classes = styles();
  return (
    <div style={{ maxHeight: "500px" }}>
      {/* <div
        style={{
          //   direction: "row",
          display: "flex",
        }}
      > */}
      <div
        style={{
          direction: "row",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          //   marginLeft: "70px",
        }}
      >
        <img
          src={trac}
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
        {/* </div> */}
        <h1 className={classes.title}>Add Voucher</h1>
        {/* </div> */}
        {/* <div
          style={{
            justifyContent: "end",
            marginLeft: "270px",
            transform: "rotate(45deg)",
            cursor: "pointer",
          }}
          className="iconcloseskill"
          onClick={onClose}
        >
          <GrAdd size="30px" />
        </div> */}
      </div>

      <form onSubmit={addVoucher}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{
                color: "var(--mahogany-32)",
                fontFamily: "var(--font-family-cerapro-bold)",
                fontSize: "23px",
                marginBottom: "-15px",
              }}
            >
              Choose Quiz
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1 }}>
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
                  Quiz
                </h3>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={voucher.quiz}
                onChange={handleInputChange}
                // label="Age"
                name="quiz"
                style={{
                  border: "3px solid gold",
                  borderRadius: "39px",
                  width: "300px",
                  // height: "45px",
                }}
              >
                <MenuItem value="">
                  <em>Quiz</em>
                </MenuItem>
                {quizzes?.map((key) => (
                  <MenuItem value={key._id}>{key.quizName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                color: "var(--mahogany-32)",
                fontFamily: "var(--font-family-cerapro-bold)",
                fontSize: "23px",
                // marginBottom: "-15px",

                marginTop: "-15px",
              }}
            >
              Creation Date
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="creation_date"
              id="outlined-basic"
              variant="outlined"
              className={classes.txtName}
              //   style={{ marginRight: "100px" }}
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
              value={voucher.creation_date}
              onChange={handleInputChange}
              //   InputProps={{ inputProps: { min: Date.now() } }}
            />
          </Grid>
          {/* </div>
          </Grid> */}

          <Grid item xs={12}>
            <div
              style={{
                marginTop: "10px",
                color: "var(--mahogany-32)",
                fontFamily: "var(--font-family-cerapro-bold)",
                fontSize: "23px",
              }}
            >
              Validation Date
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="validation_date"
              id="outlined-basic"
              variant="outlined"
              className={classes.txtName}
              //   style={{ marginRight: "100px" }}
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
              value={voucher.validation_date}
              onChange={handleInputChange}
              //   InputProps={{ inputProps: { min: Date.now() } }}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              className="btnVerif border-1px-dove-gray"
              variant="contained"
              type="submit"
              // onClick={handleNext}
              style={{
                marginLeft: "40px",
                // height: "20px",
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontWeight: 700,
                  fontSize: "26px",
                }}
              >
                OKAY
              </div>
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { IoPersonAddSharp } from "react-icons/io5";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import Loading from "../../Loading";
import Notification from "../../Notification";
const styles = makeStyles(() => ({
  paper: {
    background: "transparent",
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
    fontFamily: "var(--font-family-cerapro-bold)",

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
  textField: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    // marignTop: "-15px",
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
}));
export default function AddUpdateCandidate(props) {
  const { loadCandidates, candidateId, setclose } = props;
  const [loading, setloading] = useState(false);
  const [candidate, setcandidate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  console.log(candidate);
  const [showPassword, setshowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setshowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setshowPassword(false);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = styles();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcandidate({
      ...candidate,
      [name]: value,
    });
  };
  React.useEffect(() => {
    if (candidateId) setcandidate({ ...candidateId });
  }, []);
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const addCandidate = async () => {
    // e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      setloading(true);
      const result = await axios.post(
        process.env.REACT_APP_BACKEND + "/quizmaster/createCandidat",
        {
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          password: candidate.password,
          quizmaster: quizmasterInfo.user._id,
        },
        config
      );
      setclose();
      setloading(false);
      setNotify({
        isOpen: true,
        message: "Added Successfully",
        type: "success",
      });
      if (result) {
        loadCandidates();
      }
      // }
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
  const updateCandidate = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      setloading(true);
      await axios.get(
        process.env.REACT_APP_BACKEND +
          `/quizmaster/candidat/${candidateId._id}`,
        {
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          password: candidate.password,
          //   quizmaster: quizmasterInfo.user._id,
        },
        config
      );
      setclose();
      setloading(false);
      setNotify({
        isOpen: true,
        message: "Updated Successfully",
        type: "success",
      });
      //   if (result) {
      loadCandidates();
      //   }
      // }
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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form>
          <div
            style={{
              direction: "row",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {/* <div class="w3-container w3-center w3-animate-top"> */}
            <IoPersonAddSharp
              style={{
                width: "30px",
                height: "30px",
                // marginLeft: "77px",
                // cursor: "pointer",
                // display: "inline",
                marginRight: "5px",
              }}
              // className="iconaddskill"
            />
            <h1 className={classes.title}>Add Candidate</h1>
          </div>
          <Grid container spacing={2} textAlign="center">
            <Grid item xs={6}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                }}
              >
                First Name
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={candidate.firstName}
                onChange={handleInputChange}
                name="firstName"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                }}
              />
            </Grid>
            {/* <Grid xs={12}></Grid> */}
            <Grid item xs={6}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                }}
              >
                Last Name
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={candidate.lastName}
                onChange={handleInputChange}
                name="lastName"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                  // marginBottom: "-15px",
                }}
              >
                Email
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="email"
                value={candidate.email}
                name="email"
                variant="outlined"
                //   name="password"
                onChange={handleInputChange}
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                  // marginBottom: "-15px",
                }}
              >
                Password
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type={showPassword ? "text" : "password"}
                value={candidate.password}
                variant="outlined"
                name="password"
                onChange={handleInputChange}
                id="filled-adornment-password"
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        //   style={{ color: darkColor }}
                      >
                        {showPassword && <Visibility />}
                        {!showPassword && <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <div
                style={{
                  color: "var(--mahogany-32)",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  fontSize: "23px",
                  // marginBottom: "-15px",
                }}
              >
                Confirm Password
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type={showPassword ? "text" : "password"}
                value={candidate.confirmpassword}
                name="confirmpassword"
                required
                id="confirmpassword"
                onChange={handleInputChange}
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        //   style={{ color: darkColor }}
                      >
                        {showPassword && <Visibility />}
                        {!showPassword && <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <button
                className="btnVerif border-1px-dove-gray"
                variant="contained"
                type="submit"
                // onClick={handleNext}
                style={{
                  marginLeft: "5px",
                  // height: "10px",
                  // marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    fontWeight: 700,
                    fontSize: "26px",
                  }}
                  onClick={() => {
                    if (!candidateId) {
                      addCandidate();
                    } else if (candidateId) {
                      updateCandidate();
                      //   console.log("helllooo edit ");
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
      <Notification
        notify={notify}
        setNotify={setNotify}
        vertical="top"
        horizontal="right"
      />
    </>
  );
}

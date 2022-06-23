import React, { useContext, useState } from "react";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft, FaPlay } from "react-icons/fa";
import { Button, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import PasswordStrengthBar from "react-password-strength-bar";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import "./../../css/signup.css";
import Loading from "../Loading";
const styles = makeStyles({
  textField: {
    width: "70%",
    marginLeft: "60px",
    // marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },

  inputPassword: {
    color: "black",
    fontFamily: "cerapro-Medium",
    letterSpacing: ".2rem",
    underline: {
      "&&:after": {
        borderBottom: "none",
      },
    },
    // font-size: var(--font-size-m);
  },

  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
  },
  label: {
    fontFamily: "cerapro-bold",
    color: "#560a02",
    fontSize: "17px",
    fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
    "&$focused": {
      color: "gold",
    },
  },
  focused: {},
  rectanglewhite: {
    width: "450px",
    backgroundColor: "white",
    border: "3px solid gold",
    borderRadius: "30px",
    marginLeft: "170px",
    height: "550px",
    marginTop: "28px",
  },
});

function SignUpQuizmaster() {
  const google = () => {
    window.open("http://localhost:5000/auth/google/Quizmaster", "_self");
  };

  const linkedin = () => {
    window.open("http://localhost:5000/auth/linkedin/Quizmaster", "_self");
  };

  const microsoft = () => {
    window.open("http://localhost:5000/auth/microsoft/Quizmaster", "_self");
  };
  // const { switchToSignin } = useContext(AccountContext);
  const classes = styles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(undefined);
  const [showPassword, setshowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [done, setDone] = useState(undefined);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleClickShowPassword = () => {
    setshowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setshowPassword(false);
  };
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setloading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + "/auth/registerQuizMaster",
        { firstName, lastName, email, password, confirmpassword },
        config
      );
      setloading(false);
      sessionStorage.setItem("quizmasterInfo", JSON.stringify(data));
      const quizmasterInfo = JSON.parse(
        sessionStorage.getItem("quizmasterInfo")
      );
      if (quizmasterInfo) {
        navigate("/subscription");
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
      setloading(false);
      // }
    }
  };
  const handleChange = (event) => {
    const val = event.target.value;

    if (isEmail(val)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setEmail(val);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.rectanglewhite}>
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="center"
          />
          <h1 className="title1" style={{ marginLeft: "70px" }}>
            Register as Quiz master
          </h1>
          <form onSubmit={submitHandler} style={{ flexDirection: "column" }}>
            <TextField
              type="text"
              // class="form__field"
              label="first Name"
              id="firstName"
              // required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.label }}
            />
            <TextField
              type="text"
              // class="form__field"
              label="last Name"
              value={lastName}
              id="lastName"
              // required
              className={classes.textField}
              onChange={(e) => setlastName(e.target.value)}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.label }}
            />
            <TextField
              type="email"
              // class="form__field"
              label="email"
              value={email}
              id="email"
              error={dirty && isValid === false}
              onBlur={() => setDirty(true)}
              onChange={(e) => handleChange(e)}
              className={classes.textField}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.label }}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              // class="form__field"
              label="password"
              value={password}
              id="filled-adornment-password"
              // required
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textField}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                className: classes.inputPassword,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{ color: "#560a02" }}
                    >
                      {showPassword && <Visibility />}
                      {!showPassword && <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <PasswordStrengthBar
              password={password}
              style={{
                width: "300px",
                marginLeft: "60px",
                marginBottom: "-20px",
                fontFamily: "cerapro-bold",
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              // class="form__field"
              label="confirm password"
              value={confirmpassword}
              id="filled-adornment-password"
              // required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.inputPassword,
              }}
              InputLabelProps={{ className: classes.label }}
            />
            <br />
            <Button type="submit">
              <FaPlay className="iconPlay1" style={{ marginLeft: "380px" }} />
            </Button>
          </form>
          <div className="IconsContainer1">
            <Icon onclick={google}>
              <FaGoogle size={"40px"} className="google" />
            </Icon>
            <Icon onclick={linkedin}>
              <FaLinkedinIn size={"40px"} className="google" />
            </Icon>
            <Icon onclick={microsoft}>
              <FaMicrosoft size={"40px"} className="google" />
            </Icon>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpQuizmaster;

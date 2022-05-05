import React, { useContext, useState } from "react";
import { AccountContext } from "../accountContext";
import iconPlay from "./../../assets/polygone-2-1@1x.png";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft } from "react-icons/fa";
import { Button, FormControl, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Loading from "../Loading";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import PasswordStrengthBar from "react-password-strength-bar";
import Notification from "../Notification";
const styles = makeStyles({
  textField: {
    width: "70%",
    marginLeft: "-20px",
    // marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },

  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
    // font-size: var(--font-size-m);
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
  const { switchToSignin } = useContext(AccountContext);
  const classes = styles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setNotify({
        isOpen: true,
        message: "passwords do not match",
        type: "error",
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setloading(true);
        const { data } = await axios.post(
          "/auth/registerQuizMaster",
          { firstName, lastName, email, password },
          config
        );
        setNotify({
          isOpen: true,
          message: "verify your email ,check your inbox",
          type: "success",
        });
        setloading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
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
          setloading(false);
        }
      }
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />

      <div className="rectangle-white">
        <h1 className="title1">Register as Quiz master</h1>
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
            // required
            onChange={(e) => setEmail(e.target.value)}
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
              className: classes.input,
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
              className: classes.input,
            }}
            InputLabelProps={{ className: classes.label }}
          />
          <br />
          <Button variant="primary" type="submit">
            <img src={iconPlay} className="iconPlay1" />
          </Button>
        </form>
        <div className="IconsContainer1">
          <Icon onclick={google}>
            <FaGoogle size={"40px"} />
          </Icon>
          <Icon onclick={linkedin}>
            <FaLinkedinIn size={"40px"} />
          </Icon>
          <Icon onclick={microsoft}>
            <FaMicrosoft size={"40px"} />
          </Icon>
        </div>
        <div style={{ marginTop: "45px" }}>
          <a href="#" className="btn-sign-up1" onClick={switchToSignin}>
            sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUpQuizmaster;

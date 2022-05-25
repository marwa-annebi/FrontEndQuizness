import React, { useContext, useState } from "react";
import iconPlay from "./../../assets/polygone-2-1@1x.png";
import "./../../css/signup.css";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft, FaPlay } from "react-icons/fa";
import { AccountContext } from "../accountContext";
import { Button, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import Loading from "../Loading";
import PasswordStrengthBar from "react-password-strength-bar";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
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
    // color: "#560a02",
    fontSize: "17px",
    fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
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
});
export default function SignUpCandidate(companyInfo) {
  const google = () => {
    window.open("http://localhost:5000/auth/google/Candidate", "_self");
  };

  const linkedin = () => {
    window.open("http://localhost:5000/auth/linkedin/Candidate", "_self");
  };

  const microsoft = () => {
    window.open("http://localhost:5000/auth/microsoft/Candidate", "_self");
  };
  const darkColor =
    companyInfo.companyInfo.companyInfo.company_colors.darkColor;
  const lightColor =
    companyInfo.companyInfo.companyInfo.company_colors.lightColor;
  const { switchToSignin } = useContext(AccountContext);
  const classes = styles();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [showPassword, setshowPassword] = useState(false);
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
          "/auth/registerCandidate",
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
      {loading ? (
        <Loading />
      ) : (
        <div className="rectangle-white">
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="title1" style={{ color: darkColor }}>
            Register as Candidate
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
            <br />
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

            <br />

            <TextField
              type="email"
              // class="form__field"
              label="email"
              value={email}
              id="email"
              // onError={error.email}
              // required
              onChange={(e) => setEmail(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.label }}
            />
            <br />

            <TextField
              type={showPassword ? "text" : "password"}
              // class="form__field"
              label="password"
              value={password}
              id="filled-adornment-password"
              // required
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.inputPassword,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{ color: darkColor }}
                    >
                      {showPassword && <Visibility />}
                      {!showPassword && <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ className: classes.label }}
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
              id="confirmpassword"
              // required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.inputPassword,
              }}
              InputLabelProps={{ className: classes.label }}
            />
            <br />

            <Button variant="primary" type="submit">
              <FaPlay className="iconPlay1" style={{ color: darkColor }} />
            </Button>
          </form>
          <div className="IconsContainer1">
            <Icon
              onclick={google}
              style={{
                backgroundColor: lightColor,
                border: `1px solid ${darkColor}`,
              }}
            >
              <FaGoogle size={"40px"} color={darkColor} />
            </Icon>
            <Icon
              onclick={linkedin}
              style={{
                backgroundColor: lightColor,
                border: `1px solid ${darkColor}`,
              }}
            >
              <FaLinkedinIn size={"40px"} color={darkColor} />
            </Icon>
            <Icon
              onclick={microsoft}
              style={{
                backgroundColor: lightColor,
                border: `1px solid ${darkColor}`,
              }}
            >
              <FaMicrosoft size={"40px"} color={darkColor} />
            </Icon>
          </div>

          <div style={{ marginTop: "25px" }}>
            <a
              href="#"
              className="btn-sign-up1"
              onClick={switchToSignin}
              style={{ color: darkColor }}
            >
              sign in
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

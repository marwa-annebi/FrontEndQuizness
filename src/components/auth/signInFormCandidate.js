import React, { useContext, useState } from "react";
import "./../../css/siginFormQuizMaster.css";
import iconPlay from "./../../assets/polygone-2-1@1x.png";
import Icon from "../icon";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { FaGoogle, FaLinkedinIn, FaMicrosoft, FaPlay } from "react-icons/fa";
import { AccountContext } from "../accountContext";
import "./../../css/signup.css";
import { makeStyles, TextField, Button } from "@material-ui/core";
import axios from "axios";
import Loading from "../Loading";
import Notification from "../Notification";
import { Link, useNavigate } from "react-router-dom";
const styles = makeStyles({
  textField: {
    width: "70%",
    marginLeft: "-20px",
    // marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 700,
  },

  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
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

function SignInFormCandidate(companyInfo) {
  const google = () => {
    window.open("http://localhost:5000/auth/google/Candidate", "_self");
  };
  const linkedin = () => {
    window.open("http://localhost:5000/auth/linkedin/Candidate", "_self");
  };
  const microsoft = () => {
    window.open("http://localhost:5000/auth/microsoft/Candidate", "_self");
  };
  console.log("sii", companyInfo);
  const darkColor =
    companyInfo.companyInfo.companyInfo.company_colors.account.darkColor;
  const lightColor =
    companyInfo.companyInfo.companyInfo.company_colors.account.lightColor;
  const navigate = useNavigate();
  const { switchToSignup } = useContext(AccountContext);
  const classes = styles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [loading, setloading] = useState(false);
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
        process.env.REACT_APP_BACKEND + "/auth/loginUser",
        { email, password, type: "2" },
        config
      );
      // console.log(data);
      localStorage.setItem("candidateInfo", JSON.stringify(data));
      if (data) {
        setloading(true);
        navigate("/dashboard/candidate");
        window.location.reload(true);
      }
      // setloading(false);
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
  const [showPassword, setshowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setshowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setshowPassword(false);
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="rectangle-white">
          {" "}
          {/* {loading && <Loading />} */}
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <h1 className="title" style={{ color: darkColor }}>
            log in as Candidate{" "}
          </h1>
          <form onSubmit={submitHandler} style={{ flexDirection: "column" }}>
            <TextField
              type="email"
              // class="form__field"
              label="Email"
              value={email}
              id="email"
              required
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
              label="Password"
              value={password}
              id="password"
              required
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
              // margin="normal"
            />
            <br />
            <Button type="submit">
              <FaPlay className="iconPlay1" style={{ color: darkColor }} />

              {/* <img src={iconPlay} className="iconPlay" style={{ color: color2 }} /> */}
            </Button>
            <Link to="/lostPassword/2" style={{ color: darkColor }}>
              <h4 className="lost-your-password" style={{ color: darkColor }}>
                Lost your password ?
              </h4>
            </Link>
            <div className="IconsContainer">
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
            <div style={{ marginTop: "50px" }}>
              <a
                href="#"
                className="btn-sign-up"
                onClick={switchToSignup}
                style={{ color: darkColor }}
              >
                sign up
              </a>
            </div>{" "}
          </form>
        </div>
      )}
    </div>
  );
}

export default SignInFormCandidate;

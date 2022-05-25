import React, { useState } from "react";
import "./../../css/siginFormQuizMaster.css";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft, FaPlay } from "react-icons/fa";
import { Button, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import Loading from "../Loading";
import Notification from "../Notification";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
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
    fontFamily: "var(--font-family-cerapro-bold)",
    letterSpacing: "inherit",
    // font-size: var(--font-size-m);
  },
  label: {
    fontFamily: "cerapro-bold",
    // color: "#560a02",
    fontSize: "20px",
    fontWeight: 700,
    // opacity: 0.48,
    whiteSpace: "nowrap",
  },
});

export default function SigInForm(companyInfo) {
  const google = () => {
    window.open("http://localhost:5000/auth/google/Quizmaster", "_self");
  };

  const linkedin = () => {
    window.open("http://localhost:5000/auth/linkedin/Quizmaster", "_self");
  };

  const microsoft = () => {
    window.open("http://localhost:5000/auth/microsoft/Quizmaster", "_self");
  };

  // const { switchToSignup } = useContext(AccountContext);
  const classes = styles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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
        process.env.REACT_APP_BACKEND + "/auth/loginUser",
        { email, password, type: "3" },
        config
      );

      localStorage.setItem("quizmasterInfo", JSON.stringify(data));
      // console.log(userInfo);
      // console.log("hello");
      if (data) {
        setloading(true);
        navigate("/dashboard/quizMaster/questionsBank");
        window.location.reload(true);
      }
      // setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.response.data.message);
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
  console.log("siginnn", companyInfo);
  const darkColor = companyInfo.companyInfo.company_colors.darkColor;
  const lightColor = companyInfo.companyInfo.company_colors.lightColor;
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
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="title" style={{ color: darkColor }}>
            log in as Quiz master{" "}
          </h1>
          <form
            onSubmit={submitHandler}
            style={{ flexDirection: "column", marginTop: "35px" }}
          >
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
            />
            <br />
            <Button type="submit" style={{ marginTop: "25px" }}>
              <FaPlay className="iconPlay1" style={{ color: darkColor }} />
            </Button>
            <Link to="/lostPassword/3" style={{ color: darkColor }}>
              <h4
                className="lost-your-password"
                style={{ marginTop: "120px", color: darkColor }}
              >
                Lost your password ?
              </h4>
            </Link>
            <div className="IconsContainer" style={{ marginTop: "50px" }}>
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
            {/* <div style={{ marginTop: "50px" }}>
          <a href="#" className="btn-sign-up" onClick={switchToSignup}>
            sign up
          </a>
        </div> */}
          </form>
        </div>
      )}
    </div>
  );
}

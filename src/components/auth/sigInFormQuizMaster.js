import React, { useContext, useState } from "react";
import "./../../css/siginFormQuizMaster.css";
import iconPlay from "./../../assets/polygone-2-1@1x.png";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft } from "react-icons/fa";
import { AccountContext } from "../accountContext";
import { Button, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import Loading from "../Loading";
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
    fontSize: "20px",
    fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
});

export default function SigInForm() {
  const google = () => {
    window.open("http://localhost:5000/auth/google/Quizmaster", "_self");
  };

  const linkedin = () => {
    window.open("http://localhost:5000/auth/linkedin/Quizmaster", "_self");
  };

  const microsoft = () => {
    window.open("http://localhost:5000/auth/microsoft/Quizmaster", "_self");
  };

  const { switchToSignup } = useContext(AccountContext);
  const classes = styles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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
        "/auth/loginUser",
        { email, password, type: "3" },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
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
    <div>
      {loading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />
      <div className="rectangle-white">
        <h1 className="title">log in as Quiz master </h1>
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
            type="password"
            // class="form__field"
            label="Password"
            value={password}
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className={classes.textField}
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{ className: classes.label }}
          />
          <br />
          <Button variant="primary" type="submit">
            <img src={iconPlay} className="iconPlay" />
          </Button>
          <h4 className="lost-your-password">Lost your password ?</h4>
          <div className="IconsContainer">
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
          <div style={{ marginTop: "50px" }}>
            <a href="#" className="btn-sign-up" onClick={switchToSignup}>
              sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
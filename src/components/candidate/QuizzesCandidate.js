import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import ContentMenuItem from "../ContentMenuItem";
import { ReactComponent as Key } from "./../../assets/undraw_forgot_password_re_hxwm.svg";
import { ReactComponent as KeyIcon } from "./../../assets/key-svgrepo-com (2).svg";
import { ToastContainer, toast } from "react-toastify";
import Notification from "../Notification";
import "react-toastify/dist/ReactToastify.css";
export default function QuizzesCandidate(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  const [quizzes, setquizzes] = useState([]);
  const [key, setkey] = useState("");
  const [loading, setloading] = useState(false);
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  const getVoucher = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${candidate.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND +
          `/candidate/getvoucher?_id_voucher=${key}`,
        // { _id_voucher: key, candidat: candidate.user._id },
        config
      );
      // console.log(data);
      if (data) {
        navigate("/playQuiz", { state: data });
      }
      setloading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // notify(error.response.data.message);
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  // const loadQuizzes = async () => {
  //   const result = await axios.get(
  //     process.env.REACT_APP_BACKEND +
  //       `/candidate/getQuizzes?quizmaster=${props._id}`,
  //     config
  //   );
  //   console.log(result.data.reverse());
  //   setquizzes(result.data.reverse());
  // };
  // useEffect(
  //   () => {
  //     loadQuizzes();
  //   },
  //   [],
  //   [quizzes]
  // );
  const styles = makeStyles((theme) => ({
    title1: {
      color: "#1D1D1D",
      fontFamily: "var(--font-family-cerapro-bold)",
      fontSize: "26px",
    },

    plume: {
      fill: lightColor,
      "--color-1": darkColor,
    },
    key: {
      [`& fieldset`]: {
        borderRadius: 19,
        border: `3px solid ${darkColor}`,
        color: darkColor,
        fontFamily: "var(--font-family-cerapro-bold)",

        // color: "var(--mahogany-32)",
      },
      // marginTop: "5px",
      borderRadius: "19px",
      width: "460px",
      backgroundColor: "var(--gold-2)",
      color: darkColor,
      // opacity: "0.5px",
    },
    input: {
      // fontFamily: "cerapro-Medium",
      fontFamily: "var(--font-family-cerapro-bold)",
      color: darkColor,

      textAlign: "center",
    },
  }));
  const classes = styles();
  return (
    <div style={{ height: "100vh" }}>
      <Notification
        notify={notify}
        setNotify={setNotify}
        vertical="top"
        horizontal="right"
      />
      <ContentMenuItem
        style={{ borderColor: darkColor, boxShadow: " 0px 3px 6px #00000029" }}
      >
        <form onSubmit={getVoucher}>
          <Grid container spacing={2} textAlign="center">
            <Grid className={classes.title1} item xs={12}>
              Please enter the key sent to you by your quizmaster
            </Grid>
            <Grid className={classes.title1} xs={12}>
              via E-mail
            </Grid>
            <Grid item xs={12}>
              <Key
                width="450px"
                height="250px"
                fill={lightColor}
                className={classes.plume}
              />
            </Grid>
            <Grid xs={12} style={{ marginTop: "-11px" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                className={classes.key}
                value={key}
                name="key"
                onChange={(e) => setkey(e.target.value)}
                InputProps={{
                  classes: { input: classes.input },
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ marginLeft: "-17px" }}
                    >
                      <KeyIcon fill={lightColor} width="50px" />
                      <h3
                        style={{
                          color: darkColor,
                          fontFamily: "var(--font-family-cerapro-bold)",
                        }}
                      >
                        key :
                      </h3>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <button
                className="btnVerif border-1px-dove-gray"
                variant="contained"
                type="submit"
                style={{
                  marginLeft: "80px",
                  marginTop: "30px",
                  color: darkColor,
                  backgroundColor: lightColor,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    fontWeight: 700,
                    fontSize: "24px",
                    marginTop: "-4px",
                  }}
                >
                  PLAY QUIZ
                </div>
              </button>
              {/* <ToastContainer /> */}
            </Grid>
          </Grid>
        </form>
      </ContentMenuItem>
    </div>
  );
}

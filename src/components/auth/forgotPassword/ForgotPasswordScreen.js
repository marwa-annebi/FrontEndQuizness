import { Button, Grid, makeStyles } from "@material-ui/core";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
// import {  } from "react-bootstrap";
import reset from "./../../../assets/reset.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import Notification from "../../Notification";
import { MdEmail } from "react-icons/md";
export default function ForgotPasswordScreen(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  const styles = makeStyles({
    textField: {
      [`& fieldset`]: {
        borderRadius: 39,
        border: `3px solid ${lightColor}`,
        // color: "var(--mahogany-32)",
      },
      marginTop: "50px",
      width: "400px",
      height: "30px ",
    },
    label: {
      fontFamily: "cerapro-bold",
      color: "#560a02",
      fontSize: "20px",
      fontWeight: 700,
      opacity: 0.48,
      whiteSpace: "nowrap",
    },
    grid: {
      // alignItems: "center",
      // justifyContent: "center",
      marginTop: "25vh",
      marginLeft: "60vh",
      minHeight: "50vh",
      backgroundColor: "#F8F8F8",
      width: "80vh",
      borderRadius: "28px",
    },
    header4: {
      fontFamily: "cerapro-bold",
      color: "#560a02",
      fontWeight: 700,
      letterSpacing: "3px",
      marginTop: "-5px",
      // fontSize: "0px",
    },
    submit: {
      // margin: theme.spacing(3, 0, 2),
      fontFamily: "var(--font-family-cerapro-bold)",
      backgroundColor: lightColor,
      fontWeight: 700,
      color: darkColor,
      opacity: 1,
      whiteSpace: "nowrap",
      boxShadow: " 0px 3px 6px #000000",
      borderRadius: "39px",
      // position:"center"
    },
  });
  const classes = styles();
  const [email, setemail] = useState("");
  const params = useParams();
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
        process.env.REACT_APP_BACKEND + "/auth/sendpasswordlink",
        { email, type: params.type, subDomain: props.account.domain_name },
        config
      );
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
      });
      // console.log(data.message);
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
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={submitHandler} style={{ flexDirection: "column" }}>
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <Grid container style={{ width: "100%", marginLeft: "0px" }}>
            <Grid item xs={6} style={{ width: "50%", height: "90%" }}>
              <img src={reset} width="100%" height="90%"></img>
            </Grid>
            <Grid
              item
              xs={6}
              direction="column"
              spacing={2}
              style={{ textAlign: "center", width: "50%" }}
            >
              <Grid item xs={12}>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                  <img
                    src={props.account.logo}
                    style={{
                      width: "80px",
                      height: "80px",
                      textAlign: "center",
                      marginTop: "30px",
                      borderRadius: "40px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <h2
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    color: darkColor,
                    marginTop: "80px",
                  }}
                >
                  RESET PASSWORD
                </h2>
              </Grid>
              <Grid item xs={12}>
                <p
                  style={{
                    fontFamily: "var(--font-family-cerapro-bold)",
                    color: "#1C1312",
                    marginTop: "40px",
                  }}
                >
                  Enter your Email :{" "}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  // class="form__field"
                  // label="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <div
                          style={{
                            height: "40px",

                            border: `3px solid ${lightColor}`,
                            borderRadius: "39px",
                            marginLeft: "-14px",
                            textAlign: "center",
                            width: "60px",
                            paddingTop: "8px",
                          }}
                        >
                          <MdEmail
                            style={{
                              color: darkColor,
                              // width: "80px",
                            }}
                            size="30px"
                          />
                        </div>
                      </InputAdornment>
                    ),
                    className: classes.input,
                  }}
                  InputLabelProps={{ className: classes.label }}
                  className={classes.textField}
                />
                <Grid item xs={12}>
                  <button
                    className="btnVerif border-1px-dove-gray"
                    type="submit"
                    variant="contained"
                    // className={classes.submit}
                    style={{
                      backgroundColor: lightColor,
                      color: darkColor,
                      marginTop: "80px",

                      marginLeft: "-30px",
                    }}
                  >
                    PROCEED
                  </button>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item xs={8}> */}

            {/* </Grid> */}
          </Grid>
        </form>
      )}
    </div>
  );
}

import { Button, Grid, makeStyles } from "@material-ui/core";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
// import {  } from "react-bootstrap";
import Logo from "./../../../assets/Image.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import Notification from "../../Notification";
const styles = makeStyles({
  textField: {
    // width: "200%",
    marginTop: "50px",
    // marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    borderColor: "#560a02",
    border: "2px",
  },

  //   input: {
  //     color: "black",
  //     fontFamily: "cerapro-Medium",
  //     fontSize: "var(--font-size-m)",
  //   },
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
    fontFamily: "CeraPro-Medium",
    backgroundColor: "#560a02",
    fontWeight: 500,
    color: "black",
    opacity: 1,
    whiteSpace: "nowrap",
    // position:"center"
  },
});
export default function ForgotPasswordScreen() {
  const classes = styles();
  const [email, setemail] = useState("");
  const params = useParams();
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  console.log(params.type);

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
        "/auth/sendpasswordlink",
        { email, type: params.type },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
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
      {loading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />
      <form onSubmit={submitHandler} style={{ flexDirection: "column" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={7}
          className={classes.grid}
        >
          <CssBaseline />
          <Grid item xs={8}>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              {/* <div
            style={{
              backgroundColor: "gold",
              height: "62px",
              alignItems: "center",
              borderRadius: "38px",
              width: "65px",
            //   justifyContent: "center",
            }}
          > */}
              <img src={Logo} />
              {/* </div> */}
              {/* <br /> */}
            </div>
          </Grid>
          <h2 className={classes.header4}>quizness</h2>

          <Grid item xs={8}>
            <TextField
              type="email"
              // class="form__field"
              label="Email"
              value={email}
              id="email"
              // required
              onChange={(e) => setemail(e.target.value)}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.label }}
              className={classes.textField}
            />
          </Grid>

          {/* <Grid item xs={8}> */}
          <Button type="submit" variant="contained" className={classes.submit}>
            submit
          </Button>
          {/* </Grid> */}
        </Grid>
      </form>
    </div>
  );
}

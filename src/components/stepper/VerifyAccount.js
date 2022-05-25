import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "./../../css/verifyAccount.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import code from "./../../assets/pin-code-svgrepo-com.svg";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
  grid: {
    // backgroundColor: "red",
    // height: "50vh",
    textAlign: "center",
    // fontFamily: "CeraPro-Medium",
    marginBottom: "100px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "gold",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: "CeraPro-Medium",
    backgroundColor: "#560a02",
    fontWeight: 300,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    fontFamily: "cerapro-bold",
    // text-align: center;
    marginTop: "180px",
    // backgroundColor:"gold"
  },
}));

export default function VerifyAccount({ handleChange, otp, setValue }) {
  // const [otp, setotp] = useState();
  // const [error, seterror] = useState(null);
  const [open, setopen] = React.useState(false);
  // const [otp, setotp] = useState("");
  const handleClick = () => {
    setopen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopen(false);
  };
  const classes = useStyles();
  return (
    <div>
      {/* {error && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )} */}

      {/* <div> */}
      <Grid
        container
        // style={{ backgroundColor: "gold" }}
        sx={{ flexGrow: 1 }}
        alignItems="center"
        justify="center"
        spacing={6}
        className={classes.grid}
      >
        <Grid xs={12}>
          <h1
            // variant="h6"
            style={{
              // left: "20px",
              letterSpacing: 0,
              lineHeight: "45px",
              whiteSpace: "nowrap",
              color: "var(--mahogany)",
              fontFamily: "var(--font-family-cerapro-bold)",
              fontSize: "var(--font-size-l)",
              marginBottom: "5px",
            }}
          >
            Email Verification Code
          </h1>
          <hr
            style={{
              width: "400px",
              boxShadow: "0px 3px 6px #00000029",
              marginTop: "0px",
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justify="center"
          alignItems="center"
          direction="row"
          style={{ marginTop: "50px" }}
        >
          <img
            src={code}
            style={{ minHeight: "66px", width: "66px", marginRight: "5px" }}
          ></img>
          <form onSubmit={handleChange}>
            <Grid item spacing={2} justify="center">
              <OtpInput
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  // name="otp",
                  // borderRadius: 35,
                  // border: "1px solid gold",
                  fontFamily: "CeraPro-Medium",
                  border: "6px solid var(--gold)",
                  borderRadius: "46px",
                  boxShadow: " 0px 3px 6px #00000029",
                }}
                numInputs={6}
                value={otp}
                onChange={(otp) => {
                  setValue(otp);
                }}
                // name="otp"
                // onSubmit={handleChange}
                // autocomplete={one - time - code}
              />
            </Grid>
            {/* <button type="submit">submit</button> */}
          </form>
        </Grid>
      </Grid>
      {/* </div> */}
      {/* </Container> */}
    </div>
  );
}

import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "./../../css/verifyAccount.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
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
    fontFamily: "CeraPro-Medium",
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
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "200px",
    backgroundColor: "#570B03",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "25px",
    borderColor: "transparent",
    height: "400px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "cerapro-bold",
    fontWeight: 700,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    webkitBackdropFilter: "blur(30px) brightness(115%)",
    backdropFilter: " blur(30px) brightness(115%)",
    backgroundColor: "transparent",
  },
};
export default function VerifyAccount() {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [error, seterror] = useState(null);
  const params = useParams();
  const [validUrl, setValidUrl] = useState(false);
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/auth/verifyOTP",
        { userId: params.id, otp },
        config
      );
      console.log(params.id);
      setValidUrl(true);
      // if (data) {
      //   navigate();
      // }
      // localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(params.id);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        seterror(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };
  const [open, setopen] = React.useState(false);

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
  const theme = useTheme();
  return (
    <div>
      {error && (
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
      )}

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
              color: "var(--mahogany-3)",
              fontFamily: "var(--font-family-cerapro-bold)",
              fontSize: "var(--font-size-m)",
            }}
          >
            Email Verification Code
          </h1>
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
                  setotp(otp);
                }}
                // onSubmit={handleChange}
                // autocomplete={one - time - code}
              />
            </Grid>
            <button type="submit">submit</button>
          </form>
        </Grid>
      </Grid>
      {/* </div> */}
      {/* </Container> */}
    </div>
  );
}

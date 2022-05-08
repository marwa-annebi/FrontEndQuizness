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
import { useParams, Link } from "react-router-dom";
import success from "./../../assets/success.png";
import styles from "./../../css/styles.module.css";
import Modal from "react-modal";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
  grid: {
    // backgroundColor: "red",
    height: "50vh",
    textAlign: "center",
    fontFamily: "CeraPro-Medium",
    // color:"gold"
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
    width: "600px",
    backgroundColor: "white",
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
      setValidUrl(true);
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
      <Container component="main" maxWidth="sm" className={classes.container}>
        {validUrl && (
          <Modal
            isOpen={open}
            style={customStyles}
            onRequestClose={() => setopen(false)}
          >
            <img
              src={success}
              alt="success_img"
              className={styles.success_img}
            />
            <h2>Email verified successfully</h2>
            <Link to="/">
              <button className={styles.green_btn}>Login</button>
            </Link>
          </Modal>
        )}
        <CssBaseline />

        <div className={classes.paper}>
          <Grid
            container
            style={{ backgroundColor: "white" }}
            className={classes.grid}
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item container justify="center">
              <Grid item container alignItems="center" direction="column">
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{
                      fontFamily: "CeraPro-Bold",
                      color: "#560a02",
                    }}
                  >
                    Verification Code
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Paper elevation={0}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "CeraPro-Medium",
                  }}
                >
                  Please enter the verification code sent to your email
                </Typography>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <form onSubmit={handleChange}>
                <Grid item spacing={3} justify="center">
                  <OtpInput
                    separator={
                      <span>
                        <strong>.</strong>
                      </span>
                    }
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 1rem",
                      fontSize: "2rem",
                      borderRadius: 4,
                      border: "1px solid rgba(0,0,0,0.3)",
                      fontFamily: "CeraPro-Medium",
                    }}
                    numInputs={6}
                    value={otp}
                    onChange={(otp) => {
                      setotp(otp);
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      setopen(true);
                    }}
                  >
                    Verify
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

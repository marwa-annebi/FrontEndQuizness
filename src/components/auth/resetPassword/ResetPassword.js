import {
  Button,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TextField } from "@mui/material";
import "./../../../css/resetPassword.css";
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
    backgroundColor: "gold",
    fontWeight: 500,
    color: "#560a02",
    opacity: 1,
    whiteSpace: "nowrap",
    // position:"center"
  },
});
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const handleClickShowPassword = () => {
    setshowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setshowPassword(false);
  };
  const classes = styles();
  const params = useParams();
  const [validUrl, setValidUrl] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //   const url = ;
  //   useEffect(() => {
  //     const verifyUrl = async () => {
  //       try {
  //         await axios.get(url);
  //         setValidUrl(true);
  //       } catch (error) {
  //         setValidUrl(false);
  //       }
  //     };
  //     verifyUrl();
  //   }, [params, url]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setloading(true);
      const { data } = await axios.post(
        `/auth/setNewPassword/${params.id}/${params.resetToken}/${params.type}`,
        { password },
        config
      );
      console.log(`${params.id}`);
      //   setValidUrl(true)
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
      });
      window.location = "/";
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
    <Fragment>
      {loading && <Loading />}
      <Notification notify={notify} setNotify={setNotify} />
      <Paper className="form form--wrapper" elevation={8}>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="header4">Reset password</h1>

          <FormControl fullWidth margin="dense">
            <TextField
              type={showPassword ? "text" : "password"}
              // class="form__field"
              label="New password"
              value={password}
              id="filled-adornment-password"
              // required
              onChange={(e) => setPassword(e.target.value)}
              // className={classes.textField}
              InputProps={{
                //   className: classes.input,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{ color: "#560a02" }}
                    >
                      {showPassword && <Visibility />}
                      {!showPassword && <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // InputLabelProps={{ className: classes.label }}
            />
            <PasswordStrengthBar
              password={password}
              style={{
                width: "330px",
                marginLeft: "4px",
                marginBottom: "-20px",
              }}
            />
          </FormControl>
          <br />
          <Button type="submit" variant="contained" className={classes.submit}>
            submit
          </Button>
        </form>
      </Paper>
    </Fragment>
  );
}

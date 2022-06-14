import { InputAdornment, makeStyles } from "@material-ui/core";
import { Grid } from "antd";
import React from "react";
import { ReactComponent as Key } from "./../../assets/undraw_forgot_password_re_hxwm.svg";
import { ReactComponent as KeyIcon } from "./../../assets/key-svgrepo-com (2).svg";
import { TextField } from "@mui/material";
export default function EnterCode({
  getVoucher,
  keyID,
  setkey,
  lightColor,
  darkColor,
}) {
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
        // color: "var(--mahogany-32)",
      },
      // marginTop: "5px",
      borderRadius: "19px",
      width: "460px",
      backgroundColor: "var(--gold-2)",
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
            value={keyID}
            name="keyID"
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
            // disabled={loading}
            style={{
              marginLeft: "80px",
              // height: "20px",
              // textAlign: "center",
              marginTop: "30px",
              color: darkColor,
              backgroundColor: lightColor,
            }}
            // onClick={notify}
          >
            <div
              style={{
                fontFamily: "var(--font-family-cerapro-bold)",
                fontWeight: 700,
                fontSize: "24px",
                marginTop: "-4px",
              }}
            >
              {/* {loading && (
        <CircularProgress
          style={{
            color: darkColor,
            marginRight: "15px",
            width: "20px",
          }}
        />
      )} */}
              PLAY QUIZ
            </div>
          </button>
        </Grid>
      </Grid>
    </form>
  );
}

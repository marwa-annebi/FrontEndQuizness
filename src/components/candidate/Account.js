import React from "react";
import ContentMenuItem from "../ContentMenuItem";
import { backdropClasses, Box, Grid, Paper } from "@mui/material";
import { makeStyles, TextField } from "@material-ui/core";

export default function Account(props) {
  console.log("#", props);
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;

  const styles = makeStyles((theme) => ({
    paper1: {
      height: "200px",
      width: "200px",
      border: `4px solid ${lightColor}`,
    },
    paper3: {
      height: "200px",
      width: "200px",
      border: `4px solid ${lightColor}`,
      backgroundColor: darkColor,
      marginTop: "10px",
    },
    paper4: {
      height: "200px",
      width: "170px",
      border: `4px solid ${lightColor}`,
      marginTop: "-170px",
    },
  }));

  const classes = styles();
  return (
    <div style={{ height: "100vh" }}>
      <ContentMenuItem style={{ borderColor: darkColor }}>
        <Box
          style={{ maxHeight: "100%", overflow: "auto" }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              // width: 200,
              // height: 150,
              borderRadius: "35px",
            },
          }}
        >
          <Grid
            container
            sx={{ flexGrow: 1 }}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={4}>
              <Paper
                className={classes.paper1}
                style={{ borderRadius: "20px" }}
              ></Paper>
              <div style={{ display: "block" }}>
                <Paper
                  style={{
                    borderRadius: "20px",
                    backgroundColor: darkColor,
                    color: "white",
                    fontFamily: "var(--font-family-cerapro-bold)",
                    textAlign: "center",
                    fontSize: "23px",
                  }}
                  className={classes.paper3}
                >
                  Log In Infos
                </Paper>
                <Paper
                  style={{ borderRadius: "20px", padding: "15px 15px" }}
                  className={classes.paper4}
                >
                  <Grid xs={4}>
                    <div
                      style={{
                        color: "#2D2D2D",
                        fontFamily: "var(--font-family-cerapro-bold)",
                        fontSize: "20px",
                        // marginBottom: "-15px",
                      }}
                    >
                      Email:
                    </div>
                    <TextField variant="standard"></TextField>
                  </Grid>
                  <Grid xs={4}></Grid> <Grid xs={4}></Grid>
                </Paper>
              </div>
            </Grid>
            <Grid xs={8}>
              <Paper elevation={2} className={classes.paper2}></Paper>
            </Grid>
          </Grid>
        </Box>
      </ContentMenuItem>
    </div>
  );
}

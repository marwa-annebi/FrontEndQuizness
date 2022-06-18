import { Grid, Paper } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ContentMenuItem from "../../ContentMenuItem";
import NavBarCandidate from "../NavBarCandidate";
import { ReactComponent as Sad } from "./../../../assets/undraw_feeling_blue_-4-b7q.svg";
import SideMenuCandidate from "../SideMenuCandidate";
import { makeStyles } from "@material-ui/core";
import ReactAudioPlayer from "react-audio-player";
import song from "./../../../songs/fail.ogg";

export default function Failed(company_info) {
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const darkColor = company_info.company_info.account.darkColor;
  const lightColor = company_info.company_info.account.lightColor;
  const location = useLocation();
  const { state } = location;
  const styles = makeStyles(() => ({
    plume: {
      fill: lightColor,
      "--color-1": darkColor,
    },
  }));
  const classes = styles();

  return (
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item md={2}>
        {/* <NavBar /> */}
      </Grid>
      <Grid item md={10}>
        <NavBarCandidate {...company_info} />
      </Grid>

      <Grid item xs={8}>
        <SideMenuCandidate {...company_info} />
      </Grid>
      <Grid item xs={4}>
        <ContentMenuItem
          style={{
            borderColor: darkColor,
            boxShadow: " 0px 3px 6px #00000029",
          }}
        >
          <Grid container textAlign="center" justifyContent="center">
            <ReactAudioPlayer src={song} autoPlay="true" />
            <Grid xs={12} item>
              <h1
                style={{
                  color: "#1D1D1D",
                  fontFamily: "var(--font-family-cerapro-bold)",
                }}
              >
                YOUR SCORE IS
              </h1>
            </Grid>
            <Grid
              xs={2}
              item
              style={{
                border: `4px dashed ${darkColor}`,
                height: "70px",
                borderRadius: "48px",
                background: lightColor,
                fontSize: "45px",
                fontFamily: "var(--font-family-cerapro-bold)",
                color: "#1D1D1D",
              }}
            >
              {state} %
            </Grid>
            <Grid xs={12} item>
              <Sad width="400px" height="350px" fill={lightColor} />
            </Grid>
          </Grid>
        </ContentMenuItem>
      </Grid>
    </Grid>
  );
}

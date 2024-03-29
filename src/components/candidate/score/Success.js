import { Grid, Paper } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentMenuItem from "../../ContentMenuItem";
import NavBarCandidate from "../NavBarCandidate";
import { ReactComponent as Happy } from "./../../../assets/undraw_happy_announcement_re_tsm0.svg";
import SideMenuCandidate from "../SideMenuCandidate";
import { makeStyles } from "@material-ui/core";
import song from "./../../../songs/happy.ogg";
import ReactAudioPlayer from "react-audio-player";

export default function Success(company_info) {
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const darkColor = company_info.company_info.account.darkColor;
  const lightColor = company_info.company_info.account.lightColor;
  const location = useLocation();
  const { state } = location;

  let data = state;
  const navigate = useNavigate();
  console.log(data);
  const styles = makeStyles(() => ({
    plume: {
      fill: lightColor,
      "--color-1": darkColor,
    },
  }));
  const getCertificate = () => {
    navigate("/printcertificate", { state: data });
  };
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
          <ReactAudioPlayer src={song} autoPlay="true" />

          <Grid container textAlign="center" justifyContent="center">
            <Grid xs={10} item>
              <h1
                style={{
                  color: "#1D1D1D",
                  marginLeft: "150px",

                  fontFamily: "var(--font-family-cerapro-bold)",
                }}
              >
                YOUR SCORE IS
              </h1>
            </Grid>
            <Grid xs={2} item>
              <button
                onClick={getCertificate}
                style={{
                  marginLeft: "10px",
                  borderRadius: "39px",
                  height: "60px",
                  width: "150px",
                  fontFamily: "var(--font-family-cerapro-bold)",
                  backgroundColor: lightColor,
                  border: `2px solid ${darkColor}`,
                }}
              >
                {" "}
                get your Certificate
              </button>
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
                marginLeft: "30px",
              }}
            >
              {state.scoreFinal} %
            </Grid>

            <Grid xs={12} item>
              <Happy width="400px" height="350px" className={classes.plume} />
            </Grid>
          </Grid>
        </ContentMenuItem>
      </Grid>
    </Grid>
  );
}

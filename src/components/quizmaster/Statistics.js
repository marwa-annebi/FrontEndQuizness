import { Container, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ContentMenuItem from "./../ContentMenuItem";
import SideStatistic from "../quizmaster/Statistic/SideStatistic/SideStatistic";
import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
  groupe10: {
    alignItems: "center",
    // backgroundColor: "#570B03",
    // borderRadius: "39px",
    // display: "flex",
    height: "55px",
    justifyContent: "flex-start",
    width: "190px",
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "#570B03",
    marginLeft: "-500px",
    marginTop: "-80px",
    marginBottom: "30px",
  },
});
export const Statistics = () => {
  const classes = styles();
  return (
    <div className="outletForm">
      <ContentMenuItem>
        <Grid container>
          <Grid
            item
            xs={4}
            style={{
              textAlign: "center",
              justifyContent: "center",
              marginTop: "80px",
            }}
          >
            <SideStatistic />
          </Grid>
          <Grid item xs={8}>
            <Outlet />
          </Grid>
        </Grid>
      </ContentMenuItem>
    </div>
  );
};

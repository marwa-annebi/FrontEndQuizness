import { Container, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ContentMenuItem from "./../ContentMenuItem";
import SideStatistic from "../quizmaster/Statistic/SideStatistic/SideStatistic";

export const Statistics = () => {
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

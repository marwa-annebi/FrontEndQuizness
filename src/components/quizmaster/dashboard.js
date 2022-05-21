import { Container, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

export default function Dashboard(companySettings) {
  return (
    <Grid
      container
      spacing={{ xs: 6, md: 12 }}
      // columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item md={12}>
        <NavBar {...companySettings} />
      </Grid>

      <Grid item>
        <SideMenu {...companySettings} />
      </Grid>
      <Grid item>
        <Outlet {...companySettings} />
      </Grid>
    </Grid>
  );
}

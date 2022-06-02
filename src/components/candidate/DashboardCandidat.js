import { Grid } from "@mui/material";
import React from "react";
import NavBarCandidate from "./NavBarCandidate";
import SideMenuCandidate from "./SideMenuCandidate";
import { Outlet } from "react-router-dom";

export default function DashboardCandidat(company_info) {
  console.log("#colorrrrrrrrCandidat", company_info);

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
        <Outlet />
      </Grid>
    </Grid>
  );
}

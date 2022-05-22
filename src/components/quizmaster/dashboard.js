import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

export default function Dashboard() {
  // React.useEffect(() => {}, [company_colors]);
  // const [companySet, setcompanySet] = useState("");
  // const companySettings = useSelector((state) => state.companySettings);
  // const { companyInfo } = companySettings;
  // const company = companyInfo;
  // console.log(company);
  // useEffect(() => {
  //   setcompanySet(company);
  // }, [companySet]);

  return (
    <Grid
      container
      spacing={{ xs: 6, md: 12 }}
      // columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item md={12}>
        <NavBar />
      </Grid>

      <Grid item>
        <SideMenu />
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
}

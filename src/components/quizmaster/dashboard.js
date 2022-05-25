import { Grid } from "@mui/material";
import React from "react";
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
    <Grid container spacing={{ xs: 6, md: 12 }}>
      <Grid item md={2}>
        {/* <NavBar /> */}
      </Grid>
      <Grid item md={10}>
        <NavBar />
      </Grid>

      <Grid item xs={8}>
        <SideMenu />
      </Grid>
      <Grid item xs={4}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

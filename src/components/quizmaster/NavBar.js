import { Badge, Button, Grid, IconButton, makeStyles } from "@material-ui/core";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import logo from "./../../assets/Image.png";
import { IoLogOut } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const styles = makeStyles({
  overlapGroup5: {
    alignItems: "center",
    backgroundColor: "gold",
    borderRadius: "40px",
    display: "flex",
    height: "51px",
    marginBottom: "-20px",
    marginRight: "20px",
    marginLeft: "-100px",
    width: "55px",
    padding: "4px 3px 4px 4px",
  },
  image1: {
    height: "55px",
    objectFit: "cover",
    width: "55px",
  },
  title: {
    color: "gold",
    fontFamily: "cerapro-bold",
    fontSize: "font-size-m",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "31px",
    minHeight: "21px",
    minWidth: "168px",
    whiteSpace: "nowrap",
  },
  groupe9: {
    alignItems: "center",
    backgroundColor: "#570B03",
    borderRadius: "39px",
    display: "flex",
    height: "55px",
    justifyContent: "flex-end",
    width: "190px",
  },
  iconLogout: {
    backgroundColor: "gold",
    alignItems: "center",
    width: "55px",
    height: "51px",
    borderRadius: "39px",
    marginLeft: "8px",
  },
  addQuiz: {
    fontFamily: "cerapro-bold",
    fontWeight: 700,
    letterSpacing: 0,
    whiteSpace: "nowrap",
    color: "#570b03",
  },
  btn: {
    backgroundColor: "gold",
    height: "50px",
    borderRadius: "39px",
    minWidth: "186px",
    paddingRight: "50px",
    justifyContent: "flex-end",
    paddingLeft: "0px",
  },
  iconAdd: {
    paddingLeft: "0px",
  },
});
export default function NavBar() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.get("/auth/logout", config);
    localStorage.removeItem("quizmasterInfo");
    navigate("/");
  };
  const classes = styles();
  return (
    <AppBar style={{ backgroundColor: "white" }} elevation="0">
      <Container>
        <Toolbar>
          <div style={{ display: "flex", direction: "row", marginTop: "30px" }}>
            <div className={classes.overlapGroup5}>
              <img src={logo} className={classes.image1}></img>
            </div>
            <div className={classes.groupe9}>
              <h2 className={classes.title}>DASHBOARD</h2>
            </div>
          </div>
          <Grid item xs></Grid>

          <div
            style={{
              display: "flex",
              direction: "row",
              marginTop: "30px",
              marginRight: "-100px",
            }}
          >
            <Grid item>
              <Button
                size="large"
                startIcon={
                  <IconContext.Provider
                    value={{
                      color: "#570B03",
                      size: "60px",
                      paddingLeft: "-50px",
                    }}
                  >
                    <IoMdAddCircle />
                  </IconContext.Provider>
                }
                className={classes.btn}
              >
                <h3 className={classes.addQuiz}>Add Quiz</h3>
              </Button>
              <IconButton className={classes.iconLogout}>
                <Badge color="secondary">
                  <IconContext.Provider
                    value={{ color: "#570B03", size: "30px" }}
                  >
                    <RiNotification2Fill fontSize="small" />
                  </IconContext.Provider>
                </Badge>
              </IconButton>
              <IconButton className={classes.iconLogout}>
                <IconContext.Provider
                  value={{ color: "#570B03", size: "70px" }}
                >
                  <IoLogOut onClick={logoutHandler} />
                </IconContext.Provider>
              </IconButton>
            </Grid>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
// .overlap-group5 {
//     align-items: center;
//     background-color: var(--gold);
//     border-radius: 38.5px;
//     display: flex;
//     height: 77px;
//     margin-bottom: 4px;
//     min-width: 77px;
//     padding: 0 10px;
//   }

//   .image-1 {
//     border-radius: 37px;
//     height: 57px;
//     object-fit: cover;
//     width: 56px;
//   }

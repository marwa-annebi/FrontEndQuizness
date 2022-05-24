import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Button, Grid, IconButton, makeStyles } from "@material-ui/core";
import { AppBar, Container, Toolbar } from "@mui/material";
import logo from "./../../assets/Image.png";
import { IoLogOut } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ChooseTypeQuiz from "./ChooseTypeQuiz";

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
    boxShadow: "0px 3px 6px #00000029",
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
    boxShadow: "0px 3px 6px #00000029",
  },
  iconAdd: {
    paddingLeft: "0px",
  },
});
export default function NavBar() {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [companySet, setcompanySet] = React.useState("");
  const companySettings = useSelector((state) => state.companySettings);
  const { companyInfo } = companySettings;
  const company = companyInfo;
  console.log("nav", company);
  React.useEffect(() => {
    setcompanySet(company);
  }, [dispatch, companySet]);
  const navigate = useNavigate();
  // const companySettings = useSelector((state) => state.companySettings);
  // const { companyInfo } = companySettings;
  // const company = companyInfo?.data;
  // console.log(company);
  // const lightColor = companySet.account.lightColor;
  // const img = companySet.account.logo;

  // console.log(lightColor);
  // const img = company_settings.company_settings.account.logo;
  const logoutHandler = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.get(process.env.REACT_APP_BACKEND + "/auth/logout", config);
    localStorage.removeItem("quizmasterInfo");
    navigate("/");
  };
  const classes = styles();
  return (
    <AppBar style={{ backgroundColor: "white" }} elevation="0">
      <Container>
        <Toolbar>
          <div style={{ display: "flex", direction: "row", marginTop: "30px" }}>
            <div
              className={classes.overlapGroup5}
              style={{ backgroundColor: "gold" }}
            >
              <Link to="/dashboard/quizMaster">
                {" "}
                <img
                  src={logo}
                  // onClick={window.location("/dashboard/quizMaster")}
                  className={classes.image1}
                ></img>
              </Link>
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
                onClick={openModal}
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
      <ChooseTypeQuiz
        modalIsOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        closeModal={closeModal}
      >
        {/* <ChooseTypeQuiz /> */}
      </ChooseTypeQuiz>
    </AppBar>
  );
}

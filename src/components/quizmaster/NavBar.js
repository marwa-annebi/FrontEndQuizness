import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Button, Grid, IconButton, makeStyles } from "@material-ui/core";
import { AppBar, Container, Toolbar } from "@mui/material";
import logo from "./../../assets/Image.png";
import Popup from "reactjs-popup";
import { IoLogOut } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AddSkill from "./addSkill";
import Modal from "react-modal";
import rectangle43 from "./../../assets/Rectangle 42.png";
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

  groupe10: {
    alignItems: "center",
    // backgroundColor: "#570B03",
    // borderRadius: "39px",
    display: "flex",
    height: "55px",
    justifyContent: "flex-end",
    width: "190px",
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "#570B03",
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
const customStyles = {
  content: {
    top: "55%",
    left: "51.5%",
    // right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-34%, -50%)",
    // borderRadius: "25px",
    borderColor: "transparent",
    // backgroundColor: "var(--gold-2)",
    backgroundColor: "transparent",
    width: "950px",
    // opacity: "1",
    fontFamily: "var(--font-family-cerapro-bold)",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: " 0px 3px 6px  #00000029",
    direction: "column",
    marginTop: "50px",
    // border: "4px dashed var(--mahogany)",
    // backgroundImage: ` url(${Rectangl42})`,
    // background: `url(${rectangle43})`,
    height: "550px",
    // height: "450px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    webkitBackdropFilter: "blur(13px) brightness(115%)",
    backdropFilter: " blur(13px) brightness(115%)",
    backgroundColor: "transparent",
  },
};
export default function NavBar(props) {
  const [categories, setcategories] = useState([]);
  console.log(props);
  const { menu } = props;
  const loadCategories = async () => {
    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getSkills",
      config
    );
    setcategories(result.data.reverse());
  };
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [recordforedit, setrecordforedit] = useState(null);
  const [openAdd, setopenAdd] = useState(false);
  function closeAddModal() {
    setopenAdd(false);
  }
  const openAddModal = () => {
    setopenAdd(true);
    setrecordforedit(null);
  };
  const lightColor = props.account.lightColor;
  const img = props.account.logo;
  const logoutHandler = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.get(process.env.REACT_APP_BACKEND + "/auth/logout", config);
    sessionStorage.removeItem("quizmasterInfo");
    navigate("/");
  };
  const [notifications, setnotifications] = useState([]);
  const [badge, setbadge] = useState("");
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const getNotifications = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND + "/quizmaster/getNotification",
        config
      );
      console.log("#", data);
      setnotifications(data.notifications);
      setbadge(data.notifications.length);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(
    () => {
      getNotifications();
    },
    [],
    [notifications]
  );

  const classes = styles();
  return (
    <AppBar style={{ backgroundColor: "white" }} elevation="0">
      <Container>
        <Toolbar>
          <div style={{ display: "flex", direction: "row", marginTop: "30px" }}>
            <div
              className={classes.overlapGroup5}
              style={{ backgroundColor: lightColor }}
            >
              <Link to="/dashboard/quizMaster">
                {" "}
                <img
                  src={img}
                  // onClick={window.location("/dashboard/quizMaster")}
                  className={classes.image1}
                  style={{
                    marginTop: "3px",
                    borderRadius: "40px",
                  }}
                ></img>
              </Link>
            </div>
            <div className={classes.groupe9}>
              <h2 className={classes.title}>DASHBOARD</h2>
              {/* <h1>heloo</h1> */}
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
                onClick={openAddModal}
              >
                <h3 className={classes.addQuiz}>Add Skill</h3>
              </Button>
              <Popup
                trigger={
                  <IconButton className={classes.iconLogout}>
                    <Badge color="secondary" badgeContent={badge}>
                      <IconContext.Provider
                        value={{ color: "#570B03", size: "30px" }}
                      >
                        {/* <Badge color="secondary" > */}
                        <RiNotification2Fill fontSize="small" />
                        {/* </Badge> */}
                      </IconContext.Provider>
                    </Badge>
                  </IconButton>
                }
                position="bottom right"
              >
                <div
                  style={{
                    backgroundColor: "gold",
                    width: "250px",
                    height: "auto",
                    minHeight: "200px",
                    borderRadius: "33px",
                    textAlign: "center",
                    padding: "10px",
                    justifyItems: "center",
                    fontFamily: "var(--font-family-cerapro-medium)",
                    fontSize: "12px",
                  }}
                >
                  {notifications?.map((notif) => {
                    return (
                      <div
                        style={{
                          fontFamily: "var(--font-family-cerapro-medium)",
                          fontSize: "14px",
                          borderRadius: "33px",
                          textAlign: "center",
                          width: "230px",
                          background: "#FFFDF2",
                          justifyContent: "center",
                          // opacity: "0.5 ",
                          // opacity: "0.5",
                          marginLeft: "15px",
                          height: "auto",
                          minHeight: "44px",
                          // lineHeight: "18px",
                          border: "1px solid var(--mahogany)",
                          paddingTop: "1px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/dashboard/quizMaster/vouchers");
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-family-cerapro-medium)",
                            fontSize: "14px",
                            color: "#1C1312",
                          }}
                        >
                          {notif}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Popup>

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
      <Modal
        isOpen={openAdd}
        onRequestClose={closeAddModal}
        style={customStyles}
      >
        <img src={rectangle43} style={{ width: "907px", height: "500px" }} />
        <div style={{ marginTop: "-470px" }}>
          <AddSkill
            loadCategories={loadCategories}
            skill={null}
            setOpenPopup={setopenAdd}
          />
        </div>
      </Modal>
    </AppBar>
  );
}

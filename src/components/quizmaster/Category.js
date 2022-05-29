import { Collapse, makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentMenuItem from "./../ContentMenuItem";
import { Box } from "@mui/material";
import { GrAdd } from "react-icons/gr";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import AddSkill from "./addSkill";
import Modal from "react-modal";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "@material-ui/icons";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Rectangl42 from "./../../assets/Rectangle 42.svg";
const styles = makeStyles((theme) => ({
  h5: {
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    paddingTop: "30px",
    fontWeight: 700,
    color: "#560a02",
  },
  textField: {
    width: "120px",
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    justifyContent: "center",
  },
  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
  },
  label: {
    fontFamily: "cerapro-Medium",
    color: "#560a02",
    fontSize: "15px",
    // fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
  paperAdd: {
    border: "4px dashed  #1c1312",
    borderRadius: 35,
    height: "200px",
    width: "160px",
    backgroundColor: "#cccccc73",
    borderSpacing: "5px",
    borderSpacing: "1vw",
    borderSpacing: "2em",
    // transition: "width 0s, height 0s,",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "6px 6px 6px #00000029",
    },
  },
  paper1: {
    border: "4px solid gold",
    borderRadius: 35,
    height: "200px",
    width: "160px",
    textAlign: "center",
    backgroundColor: "white",
    color: "var(--mahogany-3)",
    fontFamily: "var(--font-family-cerapro-bold)",
    fontSize: "var(--font-size-m)",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "35px",
    minHeight: "46px",
    whiteSpace: "nowrap",
  },
  paper2: {
    border: "4px solid gold",
    borderRadius: 35,
    objectFit: "cover",
    // position: "absolute",
    height: "auto",
    minHeight: "162px",
    width: "160px",
    backgroundColor: "white",
    marginTop: "-170px",
    textAlign: "center",
    // color: "linear-gradient(180deg, red 73.27%,  #ffffff 100%)",
    fontFamily: "cerapro-Medium",

    justifyContent: "start",
    fontSize: "13px",
    // lineHeight: "5px",
    // minHeight: "0px",
    // whiteSpace: "nowrap",
  },
  addskill: {
    color: "var(--licorice)",
    fontFamily: " var(--font-family-cerapro-bold)",
    fontSize: "var(--font-size-l)",
    fontWeight: 700,
    // left: "10px",
    letterSpacing: 0,
    lineHeight: "31px",
    // position: "absolute",
    marginTop: "45px",
    whiteSpace: "nowrap",
    textAlign: "center",
    justifyContent: "center ",
    // marginLeft: "-50px",
  },
}));
const customStyles = {
  content: {
    top: "50%",
    left: "51.5%",
    // right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-34%, -50%)",
    borderRadius: "25px",
    // borderColor: "transparent",
    // backgroundColor: "var(--gold-2)",
    backgroundColor: "white",
    width: "907px",
    // opacity: "1",
    fontFamily: "var(--font-family-cerapro-bold)",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: " 0px 3px 6px  #00000029",
    direction: "column",
    marginTop: "50px",
    border: "5px solid var(--mahogany)",
    // height: "450px",
  },
  // overlay: {
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   webkitBackdropFilter: "blur(30px) brightness(115%)",
  //   backdropFilter: " blur(30px) brightness(115%)",
  //   backgroundColor: "transparent",
  // },
};
export default function Category() {
  const classes = styles();
  const [categories, setcategories] = useState([]);
  const [skill_name, setskill_name] = useState("");
  const [loading, setloading] = useState(false);
  const [requirements, setrequirements] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isopenModal, setopenModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const loadCategories = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
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
  useEffect(
    () => {
      loadCategories();
    },
    [],
    [categories]
  );
  const deleteCategory = async (id) => {
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      await axios.delete(
        process.env.REACT_APP_BACKEND + `/quizmaster/skill/${id}`,
        config
      );
      loadCategories();
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };

  const add = async () => {
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      setloading(true);
      const { result } = await axios.post(
        process.env.REACT_APP_BACKEND + "/quizmaster/createSkill",
        { skill_name, requirements },
        config
      );
      setNotify({
        isOpen: true,
        message: result.message,
        type: "success",
      });
      if (result) {
        // setOpenPopup(false);
        // loadCategories();
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  function openModal() {
    setopenModal(true);
  }

  function closeModal() {
    setopenModal(false);
  }

  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
    <div style={{ height: "100vh" }}>
      {/* {loading && <Loading />} */}
      <ContentMenuItem>
        <Box
          style={{ maxHeight: "100%", overflow: "auto" }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              // width: 200,
              // height: 150,
              borderRadius: "35px",
            },
          }}
        >
          {/* <Paper > */}
          <div style={{ width: "160px", height: "200px" }}>
            <img
              src={Rectangl42}
              onClick={openModal}
              style={{ cursor: "pointer" }}
            ></img>
            <div
              style={{
                direction: "column",
                // marginLeft: "-165px",
                // paddingRight: "-5px",
                marginTop: "-250px",
              }}
            >
              <div className={classes.addskill}>Add Skill</div>

              <div className={classes.addskill} style={{ marginTop: "5px" }}>
                <GrAdd size="30px" />
              </div>
            </div>
          </div>
          {/* </Paper> */}
          <Modal
            isOpen={isopenModal}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <AddSkill loadCategories={loadCategories} />
          </Modal>
          {categories?.map((key, id) => {
            const paragaraph1 = `${key.requirements}`.slice(0, 140);
            const paragaraph2 = `${key.requirements}`.slice(140);
            return (
              <div style={{ display: "block", marginLeft: "5px" }}>
                <Paper className={classes.paper1}>
                  {key.skill_name}{" "}
                  {/* <div style={{ flexDirection: "row" }}>
                    <img
                      className="delete-svgrepo-com"
                      src={deleteSvgrepo}
                      style={{ width: "33px" }}
                    />
                  </div> */}
                </Paper>
                <Paper className={classes.paper2} id="paper">
                  <div className="grid">
                    <p
                      style={{
                        background:
                          "-webkit-linear-gradient(var(--cod-gray),#eee)",

                        // color: expandedId ? "" : "black",
                        webkitBackgroundClip: "text",
                        webkitTextFillColor: "transparent",
                        textAlign: "start",
                      }}
                      className="para1"
                    >
                      {paragaraph1}
                    </p>

                    <FaAngleDown
                      size={25}
                      class="button"
                      onClick={() => handleExpandClick(id)}
                      aria-expanded={expandedId === id}
                      aria-label="show more"
                      style={{
                        cursor: "pointer",
                        color: "var(--mahogany-3)",
                        // marginBottom: expandedId ? "" : "-70px",
                        // transform: expandedId ? "" : "rotate(180deg)",
                        marginTop: "-30px",
                        // marginBotyom: "10px",
                        textAlign: "center",
                      }}
                    ></FaAngleDown>
                    <p
                      class="text"
                      style={{ marginTop: "-30px", marginBottom: "15px" }}
                      in={expandedId === id}
                      key={key.id}
                    >
                      {paragaraph2}
                    </p>
                  </div>
                </Paper>
              </div>
            );
          })}

          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
        </Box>
      </ContentMenuItem>
    </div>
  );
}

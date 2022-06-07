import { Collapse, makeStyles, Paper, styled } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentMenuItem from "./../ContentMenuItem";
import imgdelete from "./../../assets/delete-svgrepo-com@1x.png";
import { Box, Grid } from "@mui/material";
import { GrAdd } from "react-icons/gr";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import AddSkill from "./addSkill";
import Modal from "react-modal";
import Rectangl42 from "./../../assets/Rectangle 42.svg";
import rectangle43 from "./../../assets/Rectangle 42.png";
import deleteHover from "./../../assets/Composant 12 – 1.svg";
import pen from "./../../assets/pen-svgrepo-com.svg";
import trac from "./../../assets/trac--136@1x.png";
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
    textAlign: "start",
    backgroundColor: "white",
    color: "var(--mahogany-3)",
    fontFamily: "var(--font-family-cerapro-bold)",
    fontSize: "var(--font-size-m)",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "35px",
    justifyContent: "center",
    paddingLeft: "15px",
    // minHeight: "46px",
    whiteSpace: "nowrap",
    direction: "row",
  },
  paper2: {
    paddingLeft: "15px",
    border: "4px solid gold",
    borderRadius: 35,
    objectFit: "cover",
    // position: "absolute",
    height: "auto",
    minHeight: "162px",
    width: "145px",
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
    // maxHeight: "550px",
    // overFlow: "auto",
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
export default function Category() {
  const classes = styles();
  const [categories, setcategories] = useState([]);
  const [skill_name, setskill_name] = useState("");
  const [loading, setloading] = useState(false);
  const [requirements, setrequirements] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [recordforedit, setrecordforedit] = useState(null);
  const [openAdd, setopenAdd] = useState(false);
  const openAddModal = () => {
    setopenAdd(true);
    setrecordforedit(null);
  };
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
  useEffect(
    () => {
      loadCategories();
    },
    [],
    []
  );
  const deleteCategory = async (id) => {
    try {
      const quizmasterInfo = JSON.parse(
        sessionStorage.getItem("quizmasterInfo")
      );

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        process.env.REACT_APP_BACKEND + `/quizmaster/skill/${id}`,
        config
      );
      setConfirmDialog({ isOpen: false });
      loadCategories();
      setNotify({
        isOpen: true,
        message: data.message,
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

  function openModal() {
    setOpenPopup(true);
    // setrecordforedit(skill);
  }

  function closeModal() {
    setOpenPopup(false);
  }
  function closeAddModal() {
    setopenAdd(false);
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
          <div style={{ width: "180px", height: "200px" }}>
            <img src={Rectangl42} style={{ marginRight: "35px" }}></img>
            <div
              style={{
                direction: "column",
                // marginLeft: "-165px",
                // paddingRight: "-5px",
                marginTop: "-250px",
              }}
            >
              <div className={classes.addskill}>Add Skill</div>
              <img
                src={trac}
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "77px",
                  cursor: "pointer",
                }}
                onClick={openAddModal}
              ></img>
              <div className={classes.addskill} style={{ marginTop: "5px" }}>
                <GrAdd size="30px" />
              </div>
            </div>
          </div>
          {/* </Paper> */}
          <Modal
            isOpen={openAdd}
            onRequestClose={closeAddModal}
            style={customStyles}
          >
            <img
              src={rectangle43}
              style={{ width: "907px", height: "500px" }}
            />
            <div style={{ marginTop: "-490px" }}>
              <AddSkill
                loadCategories={loadCategories}
                skill={null}
                setOpenPopup={setopenAdd}
                onClose={closeAddModal}
              />
            </div>
          </Modal>
          {categories?.map((key, id) => {
            const paragaraph1 = `${key.requirements}`.slice(0, 140);
            const paragaraph2 = `${key.requirements}`.slice(140);
            return (
              <div
                style={{ display: "block", marginLeft: "10px" }}
                key={key._id}
              >
                <Paper className={classes.paper1}>
                  {key.skill_name}
                  <div
                    style={{
                      marginTop: "-40px",
                      textAlign: "end",
                      paddingRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={pen}
                      className="edit"
                      // key={key}
                      onClick={() => {
                        openModal();
                        setrecordforedit(key);
                      }}
                    />

                    <img
                      style={{
                        width: "30px",
                        height: "40px",
                        marginLeft: "-5px  ",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            deleteCategory(key._id);
                          },
                        });
                      }}
                      src={imgdelete}
                      onMouseEnter={(e) => (e.currentTarget.src = deleteHover)}
                      onMouseOut={(e) => (e.currentTarget.src = imgdelete)}
                    />
                  </div>
                </Paper>
                <Modal
                  isOpen={openPopup}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <img
                    src={rectangle43}
                    style={{ width: "907px", height: "500px" }}
                  />

                  <div style={{ marginTop: "-490px" }}>
                    <AddSkill
                      loadCategories={loadCategories}
                      skill={recordforedit}
                      setOpenPopup={setOpenPopup}
                      onClose={closeModal}
                    />
                  </div>
                </Modal>
                <Paper className={classes.paper2} id="paper">
                  <div className="grid">
                    <p className="para1">{paragaraph1}</p>

                    <p
                      class="text"
                      style={{ marginTop: "-10px" }}
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

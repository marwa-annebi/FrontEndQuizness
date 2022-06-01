import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useTable from "../useTable";
import ContentMenuItem from "./../ContentMenuItem";
import ConfirmDialog from "../ConfirmDialog";
import "./../../css/questionBank.css";
import deleteHover from "./../../assets/Composant 12 – 1.svg";
import pen from "./../../assets/pen-svgrepo-com.svg";
import imgdelete from "./../../assets/delete-svgrepo-com@1x.png";
import mcq from "./../../assets/check-svgrepo-com (2).svg";
import tfq from "./../../assets/yes or no.svg";
import {
  Box,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import Notification from "../Notification";
import QuestionForm from "./QuestionForm";
import { Rowing } from "@material-ui/icons";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
const customStyles = {
  content: {
    top: "50%",
    left: "53%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-34%, -50%)",
    borderRadius: "35px",
    // borderColor: "transparent",
    // backgroundColor: "var(--gold-2)",
    backgroundColor: "white",
    width: "807px",
    // opacity: "1",
    // heght: "350px",
    fontFamily: "var(--font-family-cerapro-bold)",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: " 0px 3px 6px  #00000029",
    direction: "column",
    marginTop: "50px",
    maxHeight: "510px",
    // padding: "15px 15px",
    // overFlow: "auto",
    border: "5px solid var(--mahogany)",
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
const styles = makeStyles(() => ({
  paper: {
    background: "transparent",
    width: "170px",
    justifyContent: "space-between",
    marginTop: "3px",
  },
  h2: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    fontWeight: 700,
  },
  btnClose: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    borderRadius: "32px",
    backgroundColor: "gold",
    border: "2px solid var(--mahogany)",
    boxShadow: " 0px 3px 6px  #00000029",
  },
  btnSubmit: {
    fontFamily: "var(--font-family-cerapro-bold)",
    color: "var(--mahogany-3)",
    borderRadius: "32px",
    // backgroundColor: "",
    backgroundColor: "gold",
    boxShadow: " 0px 3px 6px  #00000029",

    border: "2px solid gold",
  },
  question: {
    width: "550px",
  },
  input: {
    color: "black",
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    justifyContent: "center",

    // font-size: var(--font-size-m);
  },
  label: {
    fontFamily: "cerapro-bold",
    // color: "#560a02",
    fontSize: "20px",
    fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
}));
const headCells = [
  // { id: "", label: "" },
  { id: "_id_question", label: "ID" },
  { id: "skill", label: "Skill" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export default function QuestionsBank({ active }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [recordForEdit, setRecordForEdit] = useState(null);
  function openModal() {
    // console.log("#item", item);
    // let item2 = item.propositions;
    // console.log("#item2", item2);
    // setRecordForEdit({ ...item, ...item2 });
    setIsOpen(true);
    setAnchorEl(false);
  }
  console.log("#record", recordForEdit);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
    setAnchorEl(false);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const classes = styles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [questionList, setquestionList] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openEditPopup, setopenEditPopup] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  // const [open, setopen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // get all question

  const loadQuestions = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getAllQuestions",
      config
    );
    console.log(result.data.reverse());
    setquestionList(result.data.reverse());
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  // create Question

  //delete question

  const deleteQuestion = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log("#id", id);
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
      const config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      await axios.delete(
        process.env.REACT_APP_BACKEND + `/quizmaster/Question/${id}`,
        config
      );
      loadQuestions();
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
        // console.log(error.response.data.message);
      }
    }
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(questionList, headCells, filterFn);

  useEffect(
    () => {
      loadQuestions();
    },
    [],
    [questionList]
  );
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          // className={classes.tableRow}
          sx={{ "& > *": { borderBottom: "none" } }}
          // style={{ height: "50px" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "40px",
              width: "50px",
              border: "4px solid var(--mahogany-3)",
              textAlign: "center",
              justifyContent: "center",
              // marginLeft: "20px",
              height: "50px",
              marginTop: "5px",
            }}
          >
            <IconButton
              aria-label="expand row"
              style={{
                color: "gold",
              }}
              // size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IoChevronUp style={{ fontSize: "35px" }} />
              ) : (
                <IoChevronDown style={{ fontSize: "35px" }} />
              )}
            </IconButton>
          </div>
          <TableCell
            // size="small"
            className={classes.tableCell}
            style={{
              backgroundColor: "white",
              borderRadius: "40px",
              width: "220px",
              padding: "0px 30px",

              // height: "5px",
              border: "4px solid var(--mahogany-3)",
              textAlign: "center",
              // marginLeft: "40px",
              fontFamily: "var(--font-family-cerapro-medium)",
              color: "#464646",
              // fontWeight: 500,
              // fontSize: "18px",
              // marginBottom: "5px",
              // padding: "0px 18px 0px 0px",
              // height: "27px",
              // lineHeight: "2px",
            }}
          >
            {row._id_question}
          </TableCell>
          <TableCell
            style={{
              padding: "0px 30px",

              backgroundColor: "white",
              borderRadius: "40px",
              width: "220px",
              fontSize: "18px",
              border: "4px solid var(--mahogany-3)",
              textAlign: "center",
              color: "#464646",
              fontWeight: 500,

              fontFamily: "var(--font-family-cerapro-medium)",

              // height: "30px",
            }}
          >
            {row.skill.skill_name}
          </TableCell>
          <TableCell
            // margin={10}
            style={{
              padding: "0px 30px",
              backgroundColor: "white",
              fontSize: "18px",
              borderBottom: "none",
              fontFamily: "var(--font-family-cerapro-medium)",
              color: "#464646",
              borderRadius: "40px",
              width: "220px",
              border: "4px solid var(--mahogany-3)",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {/* <Button
              color="primary"
              onClick={() => {
                setopenEditPopup(true);
                setRecordForEdit(row);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
    
            </Button> */}
            <img
              src={pen}
              className="edit"
              // key={key}
              onClick={() => {
                setopenEditPopup(true);
                setRecordForEdit(row);
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
                    deleteQuestion(row._id);
                  },
                });
              }}
              src={imgdelete}
              onMouseEnter={(e) => (e.currentTarget.src = deleteHover)}
              onMouseOut={(e) => (e.currentTarget.src = imgdelete)}
            />
            {/* <Button
              color="secondary"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this record?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    deleteQuestion(row._id);
                  },
                });
              }}
            >
              <CloseIcon fontSize="small" />
            </Button> */}
          </TableCell>
        </TableRow>
        <Modal
          isOpen={openEditPopup}
          onRequestClose={() => setopenEditPopup(false)}
          style={customStyles}
        >
          <QuestionForm
            // loadQuestions={loadQuestions}
            questionId={recordForEdit}
          />
        </Modal>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
            }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                style={{
                  backgroundColor: "#fffdf2",
                  border: "4px solid var(--mahogany-32)",
                  borderRadius: "40px",
                  padding: "20px 20px 20px 20px",
                }}
                sx={{ margin: 1 }}
              >
                {/* <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography> */}
                <Table size="small" aria-label="purchases">
                  <TableHead
                    style={{ borderBottom: "4px solid var(--mahogany-3)" }}
                  >
                    <TableRow>
                      <TableCell
                        style={{
                          // padding: "15px 15px",
                          // backgroundColor: "var(--mahogany-3)",
                          borderRadius: "39px",
                          width: "180px",
                          height: "10px",
                          // textAlign: "center",
                          fontSize: "20px",
                          width: "10px",
                        }}
                      >
                        mark
                      </TableCell>
                      <TableCell
                        style={{
                          borderRadius: "39px",
                          width: "180px",
                          height: "10px",
                          fontSize: "20px",
                          borderLeft: "4px solid var(--mahogany-3)",
                        }}
                      >
                        Tronc
                      </TableCell>
                      <TableCell
                        style={{
                          // padding: "15px 15px",
                          // backgroundColor: "var(--mahogany-3)",
                          borderRadius: "39px",
                          width: "180px",
                          height: "10px",
                          // textAlign: "center",
                          fontSize: "20px",
                          // border-radius: 39px;
                          borderLeft: "4px solid var(--mahogany-3)",
                        }}
                      >
                        Propositions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                          width: "30px",
                        }}
                      >
                        {row.mark}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        {row.tronc}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        {row.propositions.map((prop) => (
                          <div>
                            <Grid xs={12}>
                              {prop.typeQuestion === "MCQ" ? (
                                <Radio
                                  checked={prop.veracity}
                                  value={prop.veracity}
                                  name="radio-buttons"
                                  // inputProps={{ "aria-label": "A" }}
                                />
                              ) : (
                                <Checkbox
                                  checked={prop.veracity}
                                  value={prop.veracity}
                                  name="checkbox"
                                  style={{
                                    borderRadius: "10px",
                                    color: "var(--mahogany-32)",

                                    marginRight: "15px",
                                    height: "20px",
                                    width: "20px",
                                  }}
                                  // inputProps={{ "aria-label": "A" }}
                                />
                              )}
                              {prop.content}{" "}
                            </Grid>
                          </div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <ContentMenuItem>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </TblContainer>

      {/* <TblPagination /> */}
      <div className={`${openMenu ? "bg-blue-500" : "divAdd"}`}>
        <Button
          id="basic-button"
          // aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          // aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
          style={{ width: "170px", justifyContent: "center" }}
          // className=
          className={openMenu ? "btnAdd" : ""}
        >
          <FaPlus
            className={openMenu ? "active" : ""}
            style={{ marginTop: "6px" }}
            color="var(--mahogany)"
            size="30px"
          />
        </Button>
        <Menu
          className={openMenu ? "menuactive" : ""}
          id="basic-menu"
          anchorEl={anchorEl}
          elevation={0}
          open={openMenu}
          onClose={handleClose}
          PopoverClasses={{
            paper: classes.paper,
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem
            className="divMenu"
            onClick={() => {
              openModal();
            }}
            style={{
              justifyContent: "start",
              border: "4px solid var(--mahogany)",
              borderRadius: "33px",
              // marginTop: "50px",
              marginBottom: "10px",
              backgroundColor: "var(--gold)",
              color: "var(--mahogany)",
              fontFamily: "var(--font-family-cerapro-bold)",
              // marginLeft: "0px",
            }}
          >
            <img alt="MCQ" src={mcq} style={{ marginRight: "10px" }} />{" "}
            MultiChoice
          </MenuItem>
          <MenuItem
            className="divMenu"
            onClick={handleClose}
            style={{
              justifyContent: "start",
              border: "4px solid var(--mahogany)",
              borderRadius: "33px",
              backgroundColor: "var(--gold)",
              color: "var(--mahogany)",
              fontFamily: "var(--font-family-cerapro-bold)",
            }}
          >
            <img alt="TFQ" src={tfq} style={{ marginRight: "10px" }} />
            Yes or No
          </MenuItem>
        </Menu>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <QuestionForm loadQuestions={loadQuestions} questionId={null} />
      </Modal>
    </ContentMenuItem>
  );
}

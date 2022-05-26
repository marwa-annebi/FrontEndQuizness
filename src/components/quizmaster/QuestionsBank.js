import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useTable from "../useTable";
import ContentMenuItem from "./../ContentMenuItem";
import ConfirmDialog from "../ConfirmDialog";
import "./../../css/questionBank.css";
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
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
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    webkitBackdropFilter: "blur(30px) brightness(115%)",
    backdropFilter: " blur(30px) brightness(115%)",
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
  { id: "", label: "" },
  { id: "_id_question", label: "Id" },
  { id: "skill", label: "skill" },
  { id: "actions", label: "Actions", disableSorting: true },
];
// const historyRow = [
//   { id: "mark", label: "mark" },
//   { id: "propositions", label: "propositions" },
// ];

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
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

  const create = async (values, resetForm, id) => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    // console.log(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    if (values.id == 0) {
      // if (userInfo.id == 0)
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_BACKEND + "/quizmaster/finishQuestion",
          {
            question: {
              tronc: values.tronc,
              skill: values.skill,
              typeQuestion: "MCQ",
            },
            proposition: [
              {
                content: values.propositions[0].veracity,
                veracity: values.propositions[0].content,
              },
              {
                content: values.propositions[1].content,
                veracity: values.propositions[1].veracity,
              },
              {
                content: values.propositions[2].content,
                veracity: values.propositions[2].veracity,
              },
              {
                content: values.propositions[3].content,
                veracity: values.propositions[3].veracity,
              },
            ],
          },
          config
        );
        console.log("#questionadd", data);
        loadQuestions();
        if (data) {
          setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success",
          });
        }
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
    } else {
      await axios.put(
        process.env.REACT_APP_BACKEND + `/quizmaster/${recordForEdit._id}`,
        {
          question: {
            tronc: values.tronc,
            skill: values.skill,
            typeQuestion: "MCQ",
          },
          proposition: [
            { content: values.option1, veracity: values.veracity1 },
            { content: values.option2, veracity: values.veracity2 },
            { content: values.option3, veracity: values.veracity3 },
            { content: values.option4, veracity: values.veracity4 },
          ],
        },
        config
      );
    }
  };

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
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              style={{
                color: "gold",
              }}
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row._id_question}</TableCell>
          <TableCell>{row.skill.skill_name}</TableCell>
          <TableCell>
            <Button
              color="primary"
              onClick={() => {
                openModal();
                setRecordForEdit(row);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </Button>
            <Button
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
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>mark</TableCell>
                      <TableCell>Tronc</TableCell>
                      <TableCell>Propositions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.mark}
                      </TableCell>
                      <TableCell>{row.tronc}</TableCell>
                      <TableCell>
                        {row.propositions.map((prop) => (
                          <div>
                            <Grid xs={12}>
                              {prop.content}{" "}
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
                                  // inputProps={{ "aria-label": "A" }}
                                />
                              )}
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
      <TblContainer
        sx={{
          "&::-webkit-scrollbar": {
            width: 20,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "orange",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "red",
            borderRadius: 2,
          },
        }}
      >
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </TblContainer>
      {/* <TblPagination /> */}
      <div className={`divAdd ${openMenu ? "activeAdd" : ""}`}>
        <Button
          id="basic-button"
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
          style={{ width: "170px", justifyContent: "center" }}
        >
          <FaPlus
            className={openMenu ? "active" : ""}
            style={{ marginTop: "6px" }}
            color="var(--mahogany)"
            size="30px"
          />
        </Button>
        <Menu
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
              setRecordForEdit(null);
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

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <QuestionForm recordForEdit={recordForEdit} addOrEdit={create} />
        </Modal>

        {/* </div> */}
      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
        vertical="top"
        horizontal="right"
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </ContentMenuItem>
  );
}

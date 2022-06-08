import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useTable from "../useTable";
import ContentMenuItem from "./../ContentMenuItem";
import ChooseTypeQuiz from "./ChooseTypeQuiz";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import moment from "moment";
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
import deleteHover from "./../../assets/Composant 12 – 1.svg";
import pen from "./../../assets/pen-svgrepo-com.svg";
import imgdelete from "./../../assets/delete-svgrepo-com@1x.png";
import ConfirmDialog from "../ConfirmDialog";
const headCells = [
  // { id: "", label: "" },
  { id: "quizName", label: "quiz_name" },
  { id: "validation_date", label: "validation_date" },
  // { id: "duration", label: "duration" },
  // { id: "duration", label: "duration" },
  { id: "actions", label: "Actions", disableSorting: true },
];
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
export default function QuizHistory() {
  const classes = styles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [openModel, setopenModel] = useState(false);
  const [quizzes, setquizzes] = useState([]);
  const closeModal = () => {
    setopenModel(false);
  };
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${quizmasterInfo.token}`,
    },
  };
  const loadQuizzes = async () => {
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/findAllQuiz",
      config
    );
    console.log(result.data.reverse());
    setquizzes(result.data.reverse());
  };
  useEffect(
    () => {
      loadQuizzes();
    },
    [],
    [quizzes]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const deleteQuiz = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log("#id", id);
    try {
      await axios.delete(
        process.env.REACT_APP_BACKEND + `/quizmaster/quiz/${id}`,
        config
      );
      loadQuizzes();
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
    useTable(quizzes, headCells, filterFn);
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
            {row.quizName}
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
            {moment(row.validation_date).format("MM-DD-yyyy")}
          </TableCell>
          {/* <TableCell
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
            {row.duration}
          </TableCell> */}
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
              // onClick={() => {
              //   setopenEditPopup(true);
              //   // setRecordForEdit(row);
              // }}
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
                    deleteQuiz(row._id);
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
        {/* <Modal
          isOpen={openEditPopup}
          onRequestClose={() => setopenEditPopup(false)}
          style={customStyles}
        >
          <QuestionForm
            // loadQuestions={loadQuestions}
            questionId={recordForEdit}
          />
        </Modal> */}
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
                          width: "10px",
                          height: "10px",
                          // textAlign: "center",
                          fontSize: "20px",
                          width: "10px",
                          boxShadow: "0px 3px 6px #00000029",
                        }}
                      >
                        nb_questions
                      </TableCell>
                      <TableCell
                        style={{
                          borderRadius: "39px",
                          width: "10px",
                          height: "10px",
                          fontSize: "20px",
                          borderLeft: "4px solid var(--mahogany-3)",
                          boxShadow: "0px 3px 6px #00000029",
                        }}
                      >
                        duration
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
                          boxShadow: "0px 3px 6px #00000029",
                        }}
                      >
                        questions
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
                        {row.nbQuestion}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        {row.duration}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        {row.questions.map((prop) => (
                          <div>
                            <Grid xs={12}>  {prop.tronc} </Grid>
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
      <Button
        id="basic-button"
        style={{
          borderRadius: "39px",
          width: "170px",
          justifyContent: "center",
          background: "var(--gold)",
          fontFamily: "var(--font-family-cerapro-bold)",
          color: "var(--mahogany)",
          fontSize: "1.17em",
          // border: "3px solid var(--gold)",
          // position: "center",
          marginLeft: "350px",
        }}
        onClick={() => {
          setopenModel(true);
        }}
      >
        add Quiz
      </Button>
      <ChooseTypeQuiz
        modalIsOpen={openModel}
        // onAfterOpen={afterOpenModal}
        closeModal={closeModal}
      ></ChooseTypeQuiz>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </ContentMenuItem>
  );
}

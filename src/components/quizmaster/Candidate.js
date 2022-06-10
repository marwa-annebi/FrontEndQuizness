import axios from "axios";
import React, { useEffect, useState } from "react";
import useTable from "../useTable";
import ContentMenuItem from "./../ContentMenuItem";
import { IoTicketSharp } from "react-icons/io5";
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
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import deleteHover from "./../../assets/Composant 12 – 1.svg";
import pen from "./../../assets/pen-svgrepo-com.svg";
import imgdelete from "./../../assets/delete-svgrepo-com@1x.png";
import { makeStyles } from "@material-ui/core";
import ConfirmDialog from "../ConfirmDialog";
import AddVoucher from "./AddVoucher";
import Modal from "react-modal";

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
  // { id: "firstName", label: "First Name" },
  // { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "generateVoucher", label: "Voucher", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
export default function Candidate() {
  const classes = styles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [openAddVoucher, setopenAddVoucher] = useState(false);
  // const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const [candidates, setcandidates] = useState([]);
  const loadCandidates = async () => {
    const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND + "/quizmaster/getCandidats",
        config
      );
      setcandidates(result.data.reverse());
      console.log("hello", candidates);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      loadCandidates();
    },
    [],
    [candidates]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [id, setid] = useState();
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(candidates, headCells, filterFn);
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    console.log("#id", id);
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
            {row.email}
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
              // direction: "row",
              justifyContent: "center",
              // display: "flex",
              fontFamily: "var(--font-family-cerapro-medium)",

              // height: "30px",
            }}
            onClick={() => {
              setopenAddVoucher(true);
              setid(row._id);
            }}
          >
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  color: "var(--gold)",
                }}
              >
                <IoTicketSharp
                  size={30}
                  style={{
                    boxShadow: "0px 3px 6px #00000029",
                    // backgroundColor: "white",
                  }}
                />
              </div>
              <div style={{ marginTop: "5px" }}>generate</div>
            </div>
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
              // onClick={() => {
              //   setopenEditPopup(true);
              //   setRecordForEdit(row);
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
                    // deleteQuestion(row._id);
                  },
                });
              }}
              src={imgdelete}
              onMouseEnter={(e) => (e.currentTarget.src = deleteHover)}
              onMouseOut={(e) => (e.currentTarget.src = imgdelete)}
            />
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
                          width: "180px",
                          height: "10px",
                          // textAlign: "center",
                          fontSize: "20px",
                          width: "10px",
                        }}
                      >
                        state
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
                          width: "180px",
                          borderLeft: "4px solid var(--mahogany-3)",
                        }}
                      >
                        name
                      </TableCell>
                      <TableCell
                        style={{
                          borderRadius: "39px",
                          width: "10px",
                          height: "10px",
                          fontSize: "20px",
                          borderLeft: "4px solid var(--mahogany-3)",
                        }}
                      >
                        nationality
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
                        picture
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
                        {row.state}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                          width: "30px",
                        }}
                      >
                        {row.lastName} {row.firstName}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        {row.nationality}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        <img
                          src={row.picture}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "20px",
                          }}
                        />
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
      {/* {recordsAfterPagingAndSorting?.map((item, index) => { */}
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, index) => (
            <>
              {" "}
              <Row key={index} row={item} />
              <Modal
                isOpen={openAddVoucher}
                onRequestClose={() => setopenAddVoucher(false)}
                style={customStyles}
              >
                <AddVoucher
                  // loadQuestions={loadQuestions}
                  candidat={id}
                  onClose={() => setopenAddVoucher(false)}
                />
              </Modal>
            </>
          ))}
        </TableBody>
      </TblContainer>
      ;{/* })} */}
      {/* <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}
    </ContentMenuItem>
  );
}

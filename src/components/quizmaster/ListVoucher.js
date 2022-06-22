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
import Notification from "../Notification";

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
  { id: "email", label: "Email" },
  { id: "generateVoucher", label: "Voucher", disableSorting: true },
];
export default function ListVoucher() {
  const classes = styles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [openAddVoucher, setopenAddVoucher] = useState(false);
  const [candidates, setcandidates] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const loadCandidatesSkills = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND + "/quizmaster/getSkillCandidate",
        config
      );
      setcandidates(result.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setloading(false);
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  useEffect(
    () => {
      loadCandidatesSkills();
    },
    [],
    [candidates]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const deleteVoucher = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
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
      await axios.delete(
        process.env.REACT_APP_BACKEND + `/quizmaster/voucher/${id}`,
        config
      );
      loadCandidatesSkills();
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
            {row.userId.email}
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
        </TableRow>

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
                          textAlign: "center",
                          fontSize: "20px",
                          width: "100px",
                        }}
                      >
                        Skill Name
                      </TableCell>
                      <TableCell
                        style={{
                          // padding: "15px 15px",
                          // backgroundColor: "var(--mahogany-3)",
                          borderRadius: "39px",
                          width: "180px",
                          height: "10px",
                          textAlign: "center",
                          fontSize: "20px",
                          width: "100px",
                          borderLeft: "4px solid var(--mahogany-3)",
                        }}
                      >
                        name
                      </TableCell>

                      <TableCell
                        style={{
                          // padding: "15px 15px",
                          // backgroundColor: "var(--mahogany-3)",
                          borderRadius: "39px",
                          width: "100px",
                          height: "10px",
                          textAlign: "center",
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
                        {row._id_skill.skill_name}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                          // width: "20px",
                        }}
                      >
                        {row.userId.lastName} {row.userId.firstName}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: "4px solid var(--mahogany-3)",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          color: "var(--heavy-metal)",
                        }}
                      >
                        <img
                          src={row.userId.picture}
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
                  candidat={item.userId}
                  onClose={() => setopenAddVoucher(false)}
                />
              </Modal>
            </>
          ))}
        </TableBody>
      </TblContainer>
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

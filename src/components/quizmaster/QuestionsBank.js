import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useTable from "../useTable";
import ContentMenuItem from "./../ContentMenuItem";
import { Form } from "react-bootstrap";
import {
  Box,
  Collapse,
  IconButton,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "../../controls/Checkbox";
import { CheckBox } from "@mui/icons-material";
const headCells = [
  { id: "", label: "" },
  { id: "_id_question", label: "Id" },
  { id: "tronc", label: "tronc" },
  { id: "category", label: "category" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const historyRow = [
  { id: "mark", label: "mark" },
  { id: "propositions", label: "propositions" },
];
export default function QuestionsBank() {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [checked, setChecked] = useState(true);
  const [questionList, setquestionList] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const loadUsers = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    const result = await axios.get("/quizmaster/getAllQuestions", config);
    console.log(result.data.reverse());
    setquestionList(result.data.reverse());
  };
  useEffect(
    () => {
      loadUsers();
    },
    [],
    [questionList]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(questionList, headCells, filterFn, historyRow);
  const deleteQuestion = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await axios.delete(`/deleteQuestion/${id}`);
    loadUsers();
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  const [open, setOpen] = React.useState(false);
  return (
    <ContentMenuItem>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>{item._id_question}</TableCell>
              <TableCell>{item.tronc}</TableCell>
              <TableCell>{item.category.category_name}</TableCell>

              <TableCell>
                <Button color="primary">
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
                        deleteQuestion(item._id);
                      },
                    });
                  }}
                >
                  <CloseIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
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
                        <TableCell>propositions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((historyRow) => (
                        <TableRow key={historyRow.id}>
                          <TableCell component="th" scope="row">
                            {historyRow.mark}
                          </TableCell>
                          <TableCell>
                            {historyRow.propositions.map((prop) => (
                              <div>
                                {prop.content}{" "}
                                <Radio
                                  checked={prop.veracity}
                                  value={prop.veracity}
                                  name="radio-buttons"
                                  // inputProps={{ "aria-label": "A" }}
                                />
                              </div>
                            ))}
                          </TableCell>
                          {/* <TableCell align="right">{historyRow.amount}</TableCell> */}
                          {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </TblContainer>
      <TblPagination />
    </ContentMenuItem>
  );
}

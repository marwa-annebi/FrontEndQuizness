import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useTable from "../useTable";
import ContentMenuItem from "./../ContentMenuItem";
import { IconContext } from "react-icons";
import "./../../css/questionBank.css";
import {
  Box,
  Collapse,
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
import { CgPlayListCheck } from "react-icons/cg";
import { GiChoice } from "react-icons/gi";
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
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getAllQuestions",
      config
    );
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
    await axios.delete(process.env.REACT_APP_BACKEND + `/deleteQuestion/${id}`);
    loadUsers();
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      <div className="divAdd">
        <IconContext.Provider
          value={{
            color: "#570b03",
            size: "25px",
          }}
        >
          <Button
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
            style={{ TextAlign: "center", width: "170px" }}
          >
            <FaPlus />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
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
              onClick={handleClose}
              style={{ justifyContent: "center" }}
            >
              <CgPlayListCheck style={{ marginRight: "10px" }} /> MCQ
            </MenuItem>
            <MenuItem
              className="divMenu"
              onClick={handleClose}
              style={{ justifyContent: "center" }}
            >
              <GiChoice style={{ marginRight: "10px" }} />
              TFQ
            </MenuItem>
          </Menu>
          {/* </div> */}
        </IconContext.Provider>
      </div>
    </ContentMenuItem>
  );
}

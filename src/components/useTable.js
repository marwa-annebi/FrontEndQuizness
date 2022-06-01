import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";
import { TableContainer } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: "separate",
    borderSpacing: "15px 6px",
    background: "white",

    "& thead th": {
      fontWeight: 700,
      color: "var(--gold)",
      fontFamily: "cerapro-bold",
      position: "static",
      marginBottom: "10px",
    },
    "& tbody td": {
      fontWeight: "500",
      border: 0,
      height: "5px",
      // padding: "-16px -16px",
    },
    "& tbody tr:hover": {
      cursor: "pointer",
    },
    "& tbody tr": {
      // marginBottom: "-10px",
      height: "10px",
      // background: "red",
      // padding: "0px 16px ",
    },
  },
}));

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <TableContainer style={{ maxHeight: 450 }}>
      <Table className={classes.table} stickyHeader>
        {props.children}
      </Table>
    </TableContainer>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell
            style={{
              padding: "15px 15px",
              backgroundColor: "white",
              // borderRadius: "39px",
              width: "70px",
              // textAlign: "center",
              borderColor: "transparent",
              // border-radius: 39px;
            }}
            // key={headCell.id}
            // sortDirection={orderBy === headCell.id ? order : false}
          ></TableCell>
          {headCells.map((headCell) => (
            <>
              <TableCell
                style={{
                  padding: "15px 15px",
                  backgroundColor: "var(--mahogany-3)",
                  borderRadius: "40px",
                  width: "220px",
                  height: "10px",
                  textAlign: "center",
                  fontSize: "26px",
                  // border-radius: 39px;
                }}
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(headCell.id);
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      style={{
        fontFamily: "cerapro-Medium",
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}

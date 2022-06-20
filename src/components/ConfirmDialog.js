import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";

import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Button from "./Button";
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    webkitBackdropFilter: "blur(15px) brightness(105%)",
    backdropFilter: " blur(15px) brightness(105%)",
    backgroundColor: "white",
    borderRadius: "39px",
    border: "4px solid var(--gold)",
    top: theme.spacing(5),
    fontFamily: "var(--font-family-cerapro-bold)",
    marginTop: "100px",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
    fontFamily: "var(--font-family-cerapro-bold)",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    // backgroundColor: theme.palette.secondary.light,
    color: "#570B03",
    boxShadow: " 0px 3px 6px  #00000029",

    backgroundColor: "gold",
    // "&:hover": {
    //   cursor: "default",
    // },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          fontFamily: "var(--font-family-cerapro-bold)",
          color: "#1D1D1D",
        }}
        className={classes.dialogContent}
      >
        <Typography
          style={{
            fontFamily: "var(--font-family-cerapro-bold)",
            color: "#1D1D1D",
          }}
          variant="h6"
        >
          {confirmDialog.title}
        </Typography>
        <Typography
          style={{
            fontFamily: "var(--font-family-cerapro-bold)",
            color: "#1D1D1D",
          }}
          variant="subtitle2"
        >
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Button text="Yes" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  );
}

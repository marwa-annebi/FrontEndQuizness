import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import selection from "./../../assets/paint-selection-svgrepo-com.svg";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "350px",
    backgroundColor: "white",
    borderRadius: "20px",
    height: "300px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    direction: "column",
    justifyContent: "center",
    border: "4px solid gold",
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
export default function ChooseTypeQuiz(props) {
  const navigate = useNavigate();
  const { modalIsOpen, closeModal } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        className="rectangle-10"
        style={{ marginTop: "-600px", marginLeft: "-320px" }}
        onClick={() => {
          navigate("/QuizBySelection");
        }}
      >
        By Selection
      </div>
      <div
        className="ellipse-4"
        style={{ marginTop: "-600px", marginLeft: "-320px" }}
      ></div>
      {/* 
        <img
            className="chrono"
            src={selection}
            style={{ marginTop: "-600px", marginLeft: "-247px", color: "gold" }}
        /> */}
      <div
        className="rectangle-9"
        style={{ top: "100px", width: "230px", left: "80px" }}
      ></div>
      <div
        className="ellipse-3"
        style={{ top: "103px", marginLeft: "-113px" }}
      ></div>

      <div
        className="watch-me"
        style={{ marginTop: "-670px", marginLeft: "-100px" }}
        onClick={() => {
          navigate("/QuizRandomly");
        }}
      >
        randomly
      </div>
    </Modal>
  );
}

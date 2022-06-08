import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import selection from "./../../assets/selection-tool-svgrepo-com.svg";
import random from "./../../assets/random-svgrepo-com.svg";
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
    // marginRight: "-50%",
    transform: "translate(-10%, -50%)",
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
    webkitBackdropFilter: "blur(13px) brightness(115%)",
    backdropFilter: " blur(13px) brightness(115%)",
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
      <h1
        style={{
          textAlign: "center",
          fontFamily: "var(--font-family-cerapro-medium)",
          color: "#2C2B2B",
          // marginTop: "145px",
        }}
      >
        Add Quiz
      </h1>
      <div
        className="rectangle-10"
        style={{ marginTop: "-550px", marginLeft: "-320px" }}
        onClick={() => {
          navigate("/QuizBySelection");
        }}
      >
        By Selection
      </div>
      <div
        className="ellipse-4"
        style={{
          marginTop: "-550px",
          marginLeft: "-320px",
          textAlign: "center",
          // justifyContent: "center",
        }}
      >
        <img src={selection} style={{ width: "20px", marginTop: "7px" }} />
      </div>
      {/* 
        <img
            className="chrono"
            src={selection}
            style={{ marginTop: "-600px", marginLeft: "-247px", color: "gold" }}
        /> */}
      <div
        className="rectangle-9"
        style={{ top: "140px", width: "230px", left: "80px" }}
      ></div>
      <div
        className="ellipse-3"
        style={{ top: "143px", marginLeft: "-113px", textAlign: "center" }}
      >
        <img src={random} style={{ width: "25px", marginTop: "7px" }} />
      </div>

      <div
        className="watch-me"
        style={{ marginTop: "-630px", marginLeft: "-100px" }}
        onClick={() => {
          navigate("/QuizRandomly");
        }}
      >
        randomly
      </div>
    </Modal>
  );
}

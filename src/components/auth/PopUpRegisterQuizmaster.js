import React from "react";
import Modal from "react-modal";
import SignUpQuizmaster from "./signUpQuizmaster";

const customStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    width: "880px",
    backgroundColor: "transparent",
    justifyContent: "center",
    borderColor: "transparent",
    height: "660px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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
export default function PopUpRegisterQuizmaster(props) {
  const { open, setOpenPopup } = props;

  return (
    <Modal
      isOpen={open}
      style={customStyles1}
      onRequestClose={() => setOpenPopup(false)}
    >
      <SignUpQuizmaster />
    </Modal>
  );
}

import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./../assets/lotties/99257-loading-gif-animation.json";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "30%",
    width: "1000px",
    backgroundColor: "transparent",
    borderRadius: "25px",
    // height: "350px",
    // right: "auto",
    bottom: "auto",
    // marginRight: "500px",
    border: "transparent",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: "25%",
    right: 0,
    bottom: 0,
    webkitBackdropFilter: "blur(15px) brightness(105%)",
    backdropFilter: " blur(15px) brightness(105%)",
    backgroundColor: "transparent",
  },
};
export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // container: animationData.current,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal style={customStyles} isOpen="true">
      {/* {loading && ( */}
      <Lottie
        options={defaultOptions}
        height={800}
        width={1000}
        style={{ transformOrigin: "50% 50%" }}
      />
      {/* )} */}
    </Modal>
  );
}

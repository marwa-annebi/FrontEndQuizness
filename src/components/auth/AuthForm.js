import React, { useState } from "react";
import "./../../css/authForm.css";
import Modal from "react-modal";
import logo from "./../../assets/rectangle-1-1@1x (1).png";
import SigInForm from "./sigInFormQuizMaster";
import Index from "./indexCandidate";
const customStylespopup = {
  content: {
    top: "55%",
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
const styles = {
  backgroundRed: {
    backgroundColor: "#560a02",
  },

  background: {
    boxShadow: "0px 1px 4px gold",
    border: "2px solid gold",
    backgroundColor: "#560a02",
    color: "gold",
  },
};
function AuthForm(props) {
  const { openLogin, setOpenPopupLogin } = props;
  const [welcome, setWelcome] = useState(false);
  const setBannerClass = () => {
    const classArr = ["banner-side cfb"];
    if (welcome) classArr.push("send-right");
    return classArr.join(" ");
  };

  // let color1 = companySettings.account.colors[0];
  const setFormClass = () => {
    const classArr = ["form-side cfb"];
    if (welcome) classArr.push("send-left");
    return classArr.join(" ");
  };
  const [active, setActive] = useState("signin");
  return (
    // <div>
    <Modal
      isOpen={openLogin}
      style={customStylespopup}
      onRequestClose={() => setOpenPopupLogin(false)}
    >
      <div className="container">
        <div
          className={`${welcome ? styles.backgroundRed : ""} rectangle-28`}
          // style={styles.backgroundRed}
        >
          <div className={setBannerClass()}>
            <button
              onClick={() => setWelcome(!welcome)}
              className={`${welcome ? styles.background : ""} loginAs`}
              // style={styles.background}
            >
              {welcome ? "Log in as Quiz Master" : "Log in as Candidate"}
            </button>
          </div>
          <div className={setFormClass()}>
            {welcome ? <Index /> : <SigInForm />}
          </div>
          {/* </div> */}
        </div>
      </div>
    </Modal>
  );
}

export default AuthForm;
function Groupe19(props) {
  const { src } = props;

  return (
    <div className="groupe-19">
      <div className="groupe-18">
        <img className="rectangle-26" src={src} />
      </div>
    </div>
  );
}

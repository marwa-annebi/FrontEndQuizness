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

function AuthForm(props) {
  const { openLogin, setOpenPopupLogin, companyInfo } = props;
  const [welcome, setWelcome] = useState(false);

  const setBannerClass = () => {
    const classArr = ["banner-side cfb"];
    if (welcome) classArr.push("send-right");
    return classArr.join(" ");
  };
  console.log("authh", companyInfo);
  const color1 = companyInfo.company_colors.colors[0];
  const color2 = companyInfo.company_colors.colors[1];
  const styles = {
    background: {
      backgroundColor: welcome ? color2 : color1,

      color: welcome ? color1 : color2,
      border: welcome ? `2px solid ${color2}` : `2px solid ${color1}`,
      boxShadow: welcome ? `0px 3px 6px ${color1}` : `0px 3px 6px ${color2}`,
    },
    backgroundRed: {
      backgroundColor: welcome ? color2 : color1,
    },
  };
  console.log(color1);
  console.log(color2);
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
          style={styles.backgroundRed}
          className={`${welcome ? styles.backgroundRed : ""} rectangle-28`}
          // style={styles.backgroundRed}
        >
          <div className={setBannerClass()}>
            <button
              onClick={() => setWelcome(!welcome)}
              // style={{
              //   backgroundColor: color1,

              // }}
              className="loginAs"
              style={styles.background}
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

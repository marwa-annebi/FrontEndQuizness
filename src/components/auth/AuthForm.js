import React, { useState } from "react";
import "./../../css/authForm.css";
import Modal from "react-modal";
import logo from "./../../assets/rectangle-1-1@1x (1).png";
import rectangle from "./../../assets/rectangle-28@1x.png";
import SigInForm from "./sigInFormQuizMaster";
import SignInFormCandidate from "./signInFormCandidate";
import Index from "./indexCandidate";
import IndexQuizmaster from "./indexQuizmaster";
const customStyles = {
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
function AuthForm(props) {
  const { openLogin, setOpenPopupLogin } = props;
  const [welcome, setWelcome] = useState(false);
  const setBannerClass = () => {
    const classArr = ["banner-side cfb"];
    if (welcome) classArr.push("send-right");
    return classArr.join(" ");
  };

  const setFormClass = () => {
    const classArr = ["form-side cfb"];
    if (welcome) classArr.push("send-left");
    return classArr.join(" ");
  };
  const [active, setActive] = useState("signin");
  return (
    <div>
      <Modal
        isOpen={openLogin}
        style={customStyles}
        onRequestClose={() => setOpenPopupLogin(false)}
      >
        <div className="container-center-horizontal">
          <div className="overlap-group">
            <Groupe19 src={logo} />
          </div>

          {/* <div className="overlap-grou1"> */}
          <div className={`${welcome ? "background-red" : ""} rectangle-28`}>
            <div className={setBannerClass()}>
              <button
                onClick={() => setWelcome(!welcome)}
                className={`${welcome ? "background" : ""} loginAs`}
              >
                {welcome ? "Log in as Quiz Master" : "Log in as Candidate"}
              </button>
            </div>
            <div className={setFormClass()}>
              {welcome ? <Index /> : <IndexQuizmaster />}
            </div>
            {/* </div> */}
          </div>
        </div>
      </Modal>
    </div>
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

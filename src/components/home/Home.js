import React, { useState } from "react";
import logo from "./../../assets/rectangle-1-1@1x (1).png";
import "./../../css/homePage.css";
import x2 from "./../../assets/2-1x-png@1x.png";
import x3 from "./../../assets/3-1x-png-1@1x.png";
import trac1 from "./../../assets/trac--1@1x.png";
import groupe6 from "./../../assets/groupe-6@1x.png";
import groupe84 from "./../../assets/trac-84-1.png";
import trac85 from "./../../assets/trac--85-1x.png";
import polygone from "./../../assets/polygone.png";
import msngr from "./../../assets/msngr.png";
import PopupVideo from "../PopupVideo";
import AuthForm from "./../auth/AuthForm";
export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupLogin, setopenPopupLogin] = useState(false);
  return (
    <div className="container-center-horizontal">
      <div className="home screen">
        <div className="flex-col">
          <div className="overlap-group1">
            <Logo src={logo} />
          </div>
          <X2 src={x2} />
        </div>
        <div className="group-container">
          <div className="overlap-group2">
            <X3 src={x3} />
            <img className="trac-1" src={trac1} />
            <img className="groupe-6" src={groupe6} />
            <div
              className="trac-container"
              onClick={() => {
                setopenPopupLogin(true);
              }}
            >
              <img className="trac-84" src={groupe84} />
              <img className="trac-85" src={trac85} />
            </div>
      <AuthForm openLogin={openPopupLogin} setOpenPopupLogin={setopenPopupLogin} />

            <h1 className="why-do-we-use-iti">
              <span className="span0">
                Why do we use it?
                <br />
                <br />
              </span>
              <span className="span1">
                It is a long established fact that a reader will be <br />
                distracted by the readable content of a page
                <br /> when looking at its layout. The point of using Lorem
                Ipsum <br /> is that it has a more-or-less normal distribution
                of letters <br />
                as opposed to using Content here, content here making it .{" "}
              </span>
            </h1>
            <div className="rectangle-9"></div>
            <div className="rectangle-10" 
            ></div>
            <div className="ellipse-3"></div>
            <img className="icon-play" src={polygone} />

            <div
              className="watch-me"
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              Watch me
            </div>
            <PopupVideo open={openPopup} setOpenPopup={setOpenPopup} />
          </div>
          <img className="groupe-7" src={msngr} />
        </div>
      </div>
    </div>
  );
}
function X3(props) {
  const { src } = props;

  return <div className="x3" style={{ backgroundImage: `url(${src})` }}></div>;
}
function Logo(props) {
  const { src } = props;

  return (
    <div className="groupe-2">
      <div className="groupe-1">
        <img className="rectangle-1" src={src} />
      </div>
    </div>
  );
}

function X2(props) {
  const { src } = props;

  return (
    <div className="x2">
      <img width="712px" height="712px" src={src} />
    </div>
  );
}

function showDiv() {
  document.getElementById("welcomeDiv").style.display = "block";
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./../../css/homeQuizmaster.css";
import { ReactComponent as Mybubble1 } from "./../../assets/2.svg";
import { ReactComponent as Mybubble2 } from "./../../assets/Ellipse 2.svg";
import { ReactComponent as Trac1 } from "./../../assets/Tracé 1.svg";
import { ReactComponent as Groupe6 } from "./../../assets/Groupe 6.svg";
import { ReactComponent as Trac85 } from "./../../assets/dashboard-svgrepo-com.svg";
import AuthForm from "./../auth/AuthForm";

export default function HomeQuizMaster(company_colors) {
  const [openPopup, setopenPopup] = useState(false);

  console.log("#colorrrrrrrr", company_colors);
  const darkColor = company_colors.company_colors.account.darkColor;
  const lightColor = company_colors.company_colors.account.lightColor;

  return (
    <div className="container-center-horizontal1">
      <div className="home1 screen">
        <div className="flex-col1">
          <div
            // className="overlap-group1"
            style={{
              marginRight: "150px",
              background: "white",
              // width: "20px",
              // height: "50px ",
              alignItems: "flex-start",
              border: `4px solid ${darkColor}`,
              // backgroundColor: ,
              borderRadius: "36px",
              display: "flex",
              // height: "42px",
              marginLeft: "30.75px",
              height: "60px",
              width: "60px",
              // padding: "11px 4.4px",
              position: "relative",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={company_colors.company_colors.account.logo}
              style={{
                height: "60px",
                objectFit: "cover",
                width: "60px",
                textAlign: "center",
                borderRadius: "36px",
              }}
            />
          </div>
          <div
            style={{
              borderRadius: "36px",
              border: `4px solid ${lightColor}`,
              minWidth: "239px",
              width: "auto",
              height: "17px",
              textAlign: "center",
              justifyContent: "center",
              padding: "10px 10px",
              fontFamily: "var(--font-family-cerapro-medium)",
              color: "#1D1D1D",
              position: "static",
              marginTop: "-55px",
              marginLeft: "80px",
            }}
          >
            {company_colors.company_colors.account.businessName}
          </div>
          <div className="x21">
            <Mybubble1 width="712px" height="712px" fill={darkColor} />
          </div>
        </div>
        <div className="group-container">
          <div className="divRight">
            {/* <div > */}
            <Mybubble2 className="bg" fill={lightColor}></Mybubble2>
            {/* </div> */}

            <Trac1 className="trac-Q1" fill={darkColor} />
            <Groupe6 className="groupe-Q6" fill={lightColor} />
            <div
              className="trac-Qcontainer"
              onClick={() => {
                setopenPopup(true);
              }}
            >
              <Trac85 className="trac-Q85" fill={darkColor} />
            </div>
            <AuthForm
              openLogin={openPopup}
              setOpenPopupLogin={setopenPopup}
              // {...companySettings}
              companyInfo={company_colors}
            />
            <h1
              className="why-do-we-use-itiQ"
              style={{ color: darkColor, marginTop: "80px" }}
            >
              <span className="span0Q">
                Why do we use it?
                <br />
                <br />
              </span>
              <span className="span1Q">
                It is a long established fact that a reader will be <br />
                distracted by the readable content of a page
                <br /> when looking at its layout. The point of using Lorem
                Ipsum <br /> is that it has a more-or-less normal distribution
                of letters <br />
                as opposed to using Content here, content here making it .{" "}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

function X2(props) {
  const { src } = props;

  return (
    <div className="x21">
      <img width="712px" height="712px" src={src} />
    </div>
  );
}
function X4(props) {
  const { src } = props;

  return <div className="x4" style={{ backgroundImage: `url(${src})` }}></div>;
}
function Logo(props) {
  const { src } = props;

  return (
    <div className="groupe-22">
      {/* <div className="groupe-1"> */}
      <img className="rectangle-1" src={src} />
      {/* </div> */}
    </div>
  );
}

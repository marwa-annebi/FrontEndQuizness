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
  const color1 = company_colors.company_colors.colors[0];
  const color2 = company_colors.company_colors.colors[1];
  console.log(color1);
  console.log(color2);
  return (
    <div className="container-center-horizontal1">
      <div className="home1 screen">
        <div className="flex-col1">
          <div
            style={{
              marginLeft: "-180px",
              minWidth: "auto",
              marginTop: "-70px",
            }}
          >
            <img
              className="rectangle-11"
              src={company_colors.company_colors.logo}
              style={{ width: "50%" }}
            />
          </div>
          <div className="x21">
            <Mybubble1 width="712px" height="712px" fill={color2} />
          </div>
        </div>
        <div className="group-container">
          <div className="divRight">
            {/* <div > */}
            <Mybubble2 className="bg" fill={color1}></Mybubble2>
            {/* </div> */}

            <Trac1 className="trac-Q1" fill={color2} />
            <Groupe6 className="groupe-Q6" fill={color1} />
            <div
              className="trac-Qcontainer"
              onClick={() => {
                setopenPopup(true);
              }}
            >
              <AuthForm
                openLogin={openPopup}
                setOpenPopupLogin={setopenPopup}
                // {...companySettings}
                companyInfo={company_colors}
              />

              <Trac85 className="trac-Q85" fill={color2} />
            </div>
            <h1 className="why-do-we-use-itiQ">
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

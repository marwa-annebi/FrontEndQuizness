import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
function getItem(label, key) {
  return {
    label,
    key,
  };
}

export default function SideMenuCandidate() {
  const companySettings = useSelector((state) => state.companySettings);
  const { companyInfo } = companySettings;
  console.log("#", companySettings);
  const company = companyInfo;
  console.log("#navCandidate", company);

  const lightColor = company.account.lightColor;
  const darkColor = company.account.darkColor;
  //   let img = company.account.logo;
  const items = [
    getItem(
      // <div style={{ padding: "100px", height: "" }}>
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/dashboard/candidate/updateProfile"
        // style={}
        style={
          ({ color: darkColor },
          ({ isActive }) =>
            isActive
              ? { background: lightColor }
              : { background: "rgba(255, 215, 0, 0.33)" })
        }
      >
        Account
      </NavLink>,
      // </div>
      "1"
    ),
    getItem(
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/dashboard/candidate/updateProfile"
        style={
          ({ color: darkColor },
          ({ isActive }) =>
            isActive
              ? { background: lightColor }
              : { background: "rgba(255, 215, 0, 0.33)" })
        }
      >
        Skills
      </NavLink>,
      "2"
    ),
    getItem(
      <div className="divLink">
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "link")}
          to="/dashboard/candidate/updateProfile"
          style={
            ({ color: darkColor },
            ({ isActive }) =>
              isActive
                ? { background: lightColor }
                : { background: "rgba(255, 215, 0, 0.33)" })
          }
        >
          Certificats
        </NavLink>
      </div>,
      "3"
    ),
    //   getItem(
    //     <NavLink
    //       className={({ isActive }) => (isActive ? "link-active" : "link")}
    //       to="/dashboard/candidate/quizHistory"
    //     >
    //       Quizzes
    //     </NavLink>,
    //     "4"
    //   ),
    //   getItem(
    //     <NavLink
    //       className={({ isActive }) => (isActive ? "link-active" : "link")}
    //       to="/dashboard/candidate/candidate"
    //     >
    //       List Candidates
    //     </NavLink>,
    //     "5"
    //   ),
    // getItem("Voucher ", "5"),
  ];

  return (
    <div className="menu" style={{ borderColor: lightColor }}>
      <Menu mode="inline" items={items} className="sidemenu"></Menu>
    </div>
  );
}

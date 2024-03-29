import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
function getItem(label, key) {
  return {
    label,
    key,
  };
}

export default function SideMenuCandidate(props) {
  const lightColor = props.company_info.account.lightColor;
  const darkColor = props.company_info.account.darkColor;
  const items = [
    getItem(
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/dashboard/candidate/update"
        // style={}
        style={
          // ({ color: darkColor },
          ({ isActive }) =>
            isActive
              ? { background: lightColor, color: darkColor }
              : { background: "rgba(255, 215, 0, 0.33)", color: darkColor }
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
        to="/dashboard/candidate/chooseSkills"
        style={({ isActive }) =>
          isActive
            ? { background: lightColor, color: darkColor }
            : { background: "rgba(255, 215, 0, 0.33)", color: darkColor }
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
          to="/dashboard/candidate/quizzes"
          style={({ isActive }) =>
            isActive
              ? { background: lightColor, color: darkColor }
              : { background: "rgba(255, 215, 0, 0.33)", color: darkColor }
          }
        >
          Quizzes
        </NavLink>
      </div>,
      "3"
    ),
    getItem(
      <div className="divLink">
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "link")}
          to="/dashboard/candidate/certificates"
          style={({ isActive }) =>
            isActive
              ? { background: lightColor, color: darkColor }
              : { background: "rgba(255, 215, 0, 0.33)", color: darkColor }
          }
        >
          Certificats
        </NavLink>
      </div>,
      "4"
    ),
  ];

  return (
    <div className="menu" style={{ borderColor: lightColor }}>
      <Menu
        mode="inline"
        items={items}
        className="sidemenu"
        // style={{ color: darkColor }}
      ></Menu>
    </div>
  );
}

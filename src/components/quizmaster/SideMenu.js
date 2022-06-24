import React from "react";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Home } from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import QuestionsBank from "./QuestionsBank";
function getItem(label, key) {
  return {
    label,
    key,
  };
}

const items = [
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/statistics"
    >
      Statistics
    </NavLink>,
    "0"
  ),
  getItem(
    // <div style={{ padding: "100px", height: "" }}>
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/updateProfile"
    >
      Account
    </NavLink>,
    // </div>
    "1"
  ),
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/category"
    >
      Skills{" "}
    </NavLink>,
    "2"
  ),
  getItem(
    <div className="divLink">
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/dashboard/quizMaster/questionsBank"
      >
        Questions bank
      </NavLink>
    </div>,
    "3"
  ),
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/quizHistory"
    >
      Quizzes
    </NavLink>,
    "4"
  ),
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/candidate"
    >
      List Candidates
    </NavLink>,
    "5"
  ),
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/vouchers"
    >
      Orders
    </NavLink>,
    "6"
  ),
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/scores"
    >
      Score Candidates
    </NavLink>,
    "7"
  ),
  // getItem("Voucher ", "5"),
];

export default function SideMenu() {
  return (
    <div className="menu">
      <Menu mode="inline" items={items} className="sidemenu"></Menu>
    </div>
  );
}

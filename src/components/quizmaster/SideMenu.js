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
    // icon,
    // children,
    // type,
  };
}

const items = [
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
      Category{" "}
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
      Quiz history
    </NavLink>,
    "4"
  ),
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "link-active" : "link")}
      to="/dashboard/quizMaster/candidate"
    >
      List Candidate{" "}
    </NavLink>,
    "5"
  ),
  // getItem("Voucher ", "5"),
];

export default function SideMenu() {
  return (
    <div className="menu">
      <Menu
        defaultSelectedKeys={["1"]} 
        defaultOpenKeys={["1"]}
        mode="inline"
        // theme="light"
        items={items}
        className="sidemenu"
        // onOpenChange={routes}
      >
        {/* <Menu.Item key="1"  >
          <Link to="/dashboard/quizMaster/category" className="link"> Account</Link>
        </Menu.Item> */}
      </Menu>
    </div>
  );
}

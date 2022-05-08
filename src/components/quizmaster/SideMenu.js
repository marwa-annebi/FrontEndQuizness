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
import { Link } from "react-router-dom";
import QuestionsBank from "./QuestionsBank";
function getItem(label, key) {
  return {
    key,
    // icon,
    // children,
    label,
    // type,
  };
}

const items = [
  getItem(
    // <div style={{ padding: "100px", height: "" }}>
      <Link className="link" to="/dashboard/quizMaster/updateProfile">
        Account
      </Link>
    // </div>
      ,
    "1"
  ),
  getItem(
    <Link className="link" to="/dashboard/quizMaster/category">
      Category{" "}
    </Link>,
    "2"
  ),
  getItem(
    <div className="divLink">
      <Link className="link" to="/dashboard/quizMaster/questionsBank">
        Questions bank
      </Link>
    </div>,
    "3"
  ),
  getItem(
    <Link className="link" to="/dashboard/quizMaster/quizHistory">
      Quiz history
    </Link>,
    "4"
  ),
  getItem(
    <Link className="link" to="/dashboard/quizMaster/candidate">
      List Candidate{" "}
    </Link>,
    "5"
  ),
  // getItem("Voucher ", "5"),
];

export default function SideMenu() {
  return (
    <div className="menu">
      <Menu
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
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

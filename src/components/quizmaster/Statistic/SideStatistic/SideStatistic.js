import React from "react";
import { Menu, Button } from "antd";
import "./Statistics.css";
import { Link, Navigate, NavLink } from "react-router-dom";

function getItem(label, key, icon) {
  return {
    label,
    key,
  };
}

const items = [
  getItem(
    <NavLink
      className={({ isActive }) => (isActive ? "linkstat-active" : "linkstat")}
      style={{ border: "4px solid #FFD600" }}
      to="/dashboard/quizMaster/statistics/nbofQuiz"
    >
      Numbre of Quiz
    </NavLink>,
    "1"
  ),
  getItem(
    <NavLink
      className={({ isActive }) =>
        isActive ? "linkstat1-active" : "linkstat1"
      }
      style={{ border: "4px solid #560A02" }}
      to="/dashboard/quizMaster/statistics/NumbreOfcandidatByMonth"
    >
      {" "}
      Numbre of candidats
    </NavLink>,
    "2"
  ),
  //   getItem(
  //     <NavLink
  //       className={({ isActive }) =>
  //         isActive ? "linkstat2-active" : "linkstat2"
  //       }
  //       style={{ border: "4px solid #318413" }}
  //       to="/statistics/nbQuizEachMonth"
  //     >
  //       {" "}
  //       nombre of Quizzes
  //     </NavLink>,
  //     "3"
  //   ),
];

const SideStatistic = () => {
  return (
    <div>
      <Menu className="sidemenu" mode="inline" theme="dark" items={items} />
    </div>
  );
};

export default SideStatistic;

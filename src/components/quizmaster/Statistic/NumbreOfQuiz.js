import react, { useState, useEffect } from "react";
import DoughnutChart from "./DoughnutChart";
import axios from "axios";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";

import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
export default function NumbreOfQuiz() {
  ChartJs.register(Tooltip, Title, ArcElement, Legend);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const [QuizmasterData, setQuizmasterData] = useState([]);
  const [NbQuizRandomize, setQuizRandomize] = useState();
  const [NbQuizBySelection, setQuizBySelection] = useState();
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
  const config = {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${quizmasterInfo.token}`,
    },
  };

  const findNbQuiz = async () => {
    try {
      console.log("hello");
      const result = await axios.get(
        "http://localhost:5000/quizmaster/nbQuizTotal",
        config
      );
      console.log(result.data);
      setQuizBySelection(result.data.nbQuizBySelection);
      setQuizRandomize(result.data.nbQuizRandomize);

      // console.log(Quizmasters);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("#SelectionData", NbQuizRandomize);
  const data = {
    labels: ["NbQuizBySelection", "NbQuizRandomize"],
    datasets: [
      {
        label: "My First Dataset",
        data: [NbQuizBySelection, NbQuizRandomize],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 2,
      },
    ],
  };

  function show() {
    return <DoughnutChart chartData={data} />;
  }

  useEffect(
    () => {
      findNbQuiz();
    },
    [NbQuizRandomize],
    [NbQuizBySelection]
  );

  return (
    <div style={{ width: "60%", height: "60%" }}>
      <DoughnutChart chartData={data} />
    </div>
  );
}

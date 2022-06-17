import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
export default function NumbreOfcandidatByMonth() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const [CandidatData, setCandidatData] = useState([]);
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
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
        "http://localhost:5000/quizmaster/nbcandidatByeachMonth",
        config
      );
      setCandidatData(result.data);

      // console.log(Quizmasters);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("#CandidatData", CandidatData);
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [
      {
        label: "NombreOfcandidats",
        data: CandidatData.map((data) => data.total),
        backgroundColor: [
          "rgb(86, 10, 2)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "#560A02",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    type: "line",
    data: data,
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 100,
        },
      },
    },
  };
  function show() {
    return <LineChart chartData={data} config={options} />;
  }

  useEffect(
    () => {
      findNbQuiz();
    },
    [],
    [CandidatData]
  );

  return (
    <div>
      <LineChart chartData={data} config={options} />
    </div>
  );
}

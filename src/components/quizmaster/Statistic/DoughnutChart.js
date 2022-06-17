import React from "react";
import { Doughnut } from "react-chartjs-2";


function DoughnutChart({ chartData }) {
  return <Doughnut data={chartData}  />;
}

export default DoughnutChart;

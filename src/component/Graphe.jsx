// components/Graphe.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
function Graphe({ chartData, titre, text }) {
  return (
    <>
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}> {titre} </h2>
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: { text },
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </>
  );
}
export default Graphe;

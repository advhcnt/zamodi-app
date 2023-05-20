// components/Graphe.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
// import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Graphe({ donneeGraphe, titre, text }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData([...donneeGraphe]);
    
  }, []);

  return (
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
  );
}
export default Graphe;

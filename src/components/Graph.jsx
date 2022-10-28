import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = React.forwardRef(({ data }, ref) => {
  const { cities, indicator1, indicator2 } = data;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const graphData = {
    labels: cities,
    datasets: [
      {
        label: "N° de Servicios",
        data: indicator1,
        backgroundColor: "rgb(25, 99, 132)",
      },
      {
        label: "Meta para la ciudad",
        data: indicator2,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={graphData} ref={ref} />;
    </div>
  );
});

export default Graph;

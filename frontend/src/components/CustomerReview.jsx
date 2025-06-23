import React from "react";
import Chart from "react-apexcharts";

export default function CustomerReview() {
  const data = {
    series: [
      {
        name: "Review",
        data: [10, 20, 30, 40, 50, 60],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",

        categories: [
          "2025-01-19T00:30:00.000Z",
          "2025-01-19T01:30:00.000Z",
          "2025-01-19T02:30:00.000Z",
          "2025-01-19T03:30:00.000Z",
          "2025-01-19T04:30:00.000Z",
          "2025-01-19T05:30:00.000Z",
        ],
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      show: false,
    },
  };
  return (
    <div className="CustomerReview">
      <Chart series={data.series} options={data.options} type="area" />
    </div>
  );
}

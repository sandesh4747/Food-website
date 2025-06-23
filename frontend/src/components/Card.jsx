import { motion, LayoutGroup } from "framer-motion";
import { X } from "lucide-react";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Chart from "react-apexcharts";

export default function Card(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </LayoutGroup>
  );
}
//CompactCard

function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      onClick={setExpanded}
      className="flex flex-1 position relative p-4 text-white rounded-lg cursor-pointer hover:shadow-none "
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId={`expandableCard-${param.title}`}
    >
      <div className="space-y-4 font-bold">
        {" "}
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="flex flex-1 flex-col justify-between items-end">
        <Png />
        <span className="text-xl">{param.value}</span>
        <span className="text-xs">Last 24 hours</span>
      </div>
    </motion.div>
  );
}

//ExpandedCard

function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
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
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2025-01-19T00:00:00.000Z",
          "2025-01-19T01:30:00.000Z",
          "2025-01-19T02:30:00.000Z",
          "2025-01-19T03:30:00.000Z",
          "2025-01-19T04:30:00.000Z",
          "2025-01-19T05:30:00.000Z",
          "2025-01-19T06:30:00.000Z",
        ],
      },
    },
  };
  const Png = param.png;
  return (
    <motion.div
      className="absolute z-10 lg:w-[60%] lg:h-[70vh] lg:left-52 rounded-lg flex flex-col items-center justify-between p-4 md:top-8 md:h-[50vh] md:left-24 top-32 h-[50%] left-[15px] w-[80%]
      "
      style={{
        background: param.color.backGround,
      }}
      layoutId={`expandableCard-${param.title}`}
    >
      <div className="flex w-full justify-end cursor-pointer text-white">
        <X onClick={setExpanded} />
      </div>
      <span className="text-white text-glow-white text-bold text-2xl ">
        {param.title}
      </span>
      <div className="w-[70%] ">
        <Chart series={param.series} type="area" options={data.options} />
      </div>
      <span className="text-[#dfdede] text-2xl font-bold text-glow-white">
        Last 24 hours
      </span>
    </motion.div>
  );
}

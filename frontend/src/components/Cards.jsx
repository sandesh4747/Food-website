import React, { useState } from "react";
import { CardsData } from "./Data/data";
import Card from "./Card";

export default function Cards() {
  return (
    <div
      className="flex gap-5 mt-5 flex-col lg:flex-row 
      
     "
    >
      {CardsData.map((card, i) => (
        <div className="w-full" key={i}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
    </div>
  );
}

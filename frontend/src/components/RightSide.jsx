import React from "react";
import Updates from "./Updates";
import CustomerReview from "./CustomerReview";

export default function RightSide() {
  return (
    <div className="flex flex-col justify-evenly    w-full px-10  xl:mt-20 ">
      <div className="mb-20">
        <h3 className="text-2xl font-semibold mb-10 text-orange-500">
          Updates
        </h3>
        <div className="w-full ">
          <Updates />
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-10 text-orange-500">
        Customer Review
      </h3>
      <CustomerReview />
    </div>
  );
}

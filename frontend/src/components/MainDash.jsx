import React from "react";
import Cards from "./Cards";
import Table from "./Table";
import { useSelector } from "react-redux";
import OrderTracker from "./OrderTracker";
import RecentOrders from "./RecentOrders";
import QuickActions from "./QuickActions";
import PersonalizedRecommendations from "./PersonalizedRecommendations";

export default function MainDash() {
  const { user } = useSelector((state) => state.authSlice);
  return (
    <div className="grid grid-cols-1 items-center  mt-10  mb-10 ">
      <h1 className="text-3xl text-center md:text-4xl font-bold text-orange-500 mb-8 ">
        Dashboard
      </h1>
      {user?.role === "admin" ? (
        <>
          <Cards />
          <div className="w-full">
            <Table />
          </div>
        </>
      ) : (
        <div className="grid gap-8">
          {/* Section 1: Order Tracking */}
          <div c1lassName="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              My Orders
            </h2>
            <OrderTracker />
            <RecentOrders />
          </div>

          {/* Section 2: Quick Actions */}
          <QuickActions />

          {/* Section 3: Recommendations */}
          <PersonalizedRecommendations />
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import RightSide from "../components/RightSide";
import { Outlet, useLocation } from "react-router-dom";
import OrderPage from "../components/Table";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUserCheckQuery } from "../components/api/userApi";

export default function Dashboard() {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.authSlice);
  const { data: userData, isSuccess } = useUserCheckQuery();

  // Show loading spinner while checking auth
  if (isLoading || !isSuccess) return <LoadingSpinner />;

  const admin = user?.role === "admin";
  const showRightSide = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center bg-[linear-gradient(106.37deg,#ffe1bc_29.63%,#ffcfd1_51.55%,#f3c6f1_90.85%)] md:px-15 md:py-15 overflow-hidden ">
        <div className=" grid   min-h-screen rounded-xl gap-6  w-full h-full bg-[var(--glass)]       xl:grid-cols-[20%_auto_auto]  lg:grid-cols-[17%_1fr]    md:grid-cols-[10%_auto]   grid-cols-[3%_auto] sm:grid-cols-[3%_auto]  overflow-auto overflow-y-scroll sm:pr-[6%] pr-[6%] ">
          <Sidebar admin={admin} />

          <div className="flex-1 px-5  flex ">
            <Outlet />
          </div>
          {admin && showRightSide && (
            <div className=" col-start-2 col-end-3 row-start-2  xl:col-start-3 xl:col-end-4 xl:row-start-1 xl:row-end-2">
              <RightSide />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

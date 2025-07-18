import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar";
import { useUserCheckQuery } from "./api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import LoadingSpinner from "./LoadingSpinner";
import Footer from "./Footer";

export default function RootLayout() {
  const { data, isLoading, error } = useUserCheckQuery();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setUser(data));
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Paths where navbar should be hidden
  const hideNavbarPaths = [
    "/dashboard",
    "/forgot-password",
    "/verify-email",
    "/reset-password",
  ];

  const shouldHideNavbar =
    hideNavbarPaths.some((path) => location.pathname.startsWith(path)) ||
    /^\/reset-password\/[^/]+$/.test(location.pathname); // Matches /reset-password/:token

  // Define paths where footer should be hidden
  const hideFooterPaths = [
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/orders",
    "/dashboard/customers",
    "/dashboard/products",
    "/dashboard/analytics",
    "/forgot-password",
    "/reset-password/*",
    "/verify-email",
    "/reset-password/:token",
    "*",
  ];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen ">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow bg-[#FEF5E0]/50">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

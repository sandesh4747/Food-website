import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { useUserCheckQuery } from "./components/api/userApi";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import About from "./components/About";
import FeautredProducts from "./components/FeautredProducts";

import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import PaymentSuccess from "./components/PaymentSuccess";
import PurchaseCancelPage from "./pages/PurchaseCancel";
import Dashboard from "./pages/Dashboard";

import ProductsPage from "./pages/ProductsPage";
import MainDash from "./components/MainDash";

import OrderPage from "./components/OrderPage";

import CustomerPage from "./components/CustomerPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./components/ProfilePage";
import Contact from "./components/Contact";
import LoadingSpinner from "./components/LoadingSpinner";
import Products from "./components/Products";
import ChangePassword from "./pages/ChangePassword";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const { data: userData, isLoading, isSuccess } = useUserCheckQuery();
  const { user } = useSelector((state) => state.authSlice);
  useEffect(() => {
    userData;
  }, [userData]);

  useEffect(() => {
    userData;
    AOS.init({ duration: 900, once: true }); // 👈 initialize AOS
  }, [userData]);

  if (isLoading) return <LoadingSpinner />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/login",
          element: user ? <Navigate to="/" replace /> : <LoginPage />,
        },
        {
          path: "/signup",
          element: user ? <Navigate to="/" replace /> : <SignUpPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/verify-email",
          element: <EmailVerificationPage />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPasswordPage />,
        },
        {
          path: "/profile/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/dashboard",
          element:
            isSuccess && userData ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            ),
          children: [
            {
              index: true,
              element: <MainDash />,
            },
            {
              path: "products",
              element: <ProductsPage />,
            },
            {
              path: "orders",
              element: <OrderPage />,
            },
            {
              path: "customers",
              element: <CustomerPage />,
            },
            {
              path: "profile",
              element: <ProfilePage />,
            },
          ],
        },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        {
          path: "/product/category/:productId",
          element: <FeautredProducts />,
        },
        {
          path: "/products",
          element: <Products />,
        },

        {
          path: "/productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />,
        },
        {
          path: "/payment-cancel",
          element: <PurchaseCancelPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../components/api/userApi";
import toast from "react-hot-toast";
import { setUser } from "../store/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import foody from "../assets/foody.png";
import {
  Lock,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  UserPlus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetCartQuery } from "../components/api/cartApi";
import { useGetSearchResultsQuery } from "../components/api/productApi";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { data: searchResults } = useGetSearchResultsQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });
  // console.log(searchResults);

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetCartQuery();
  const [userLogout] = useLogoutMutation();
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // console.log(data);

  const isAdmin = user?.role === "admin";
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const logout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(setUser(null));
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-2 z-60 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md bcborder-gray-200" : "bg-[#FEF5E0]"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img className="h-15 w-15" src={foody} alt="Foody logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Contact
        </NavLink>

        {/* Search Bar */}

        <div className="hidden lg:flex flex-col relative w-64">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 ">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="bg-transparent outline-none placeholder-gray-500 text-sm w-full"
            />
            <Search className="w-5 h-5 text-gray-700 ml-2" />
          </div>

          {searchTerm && searchResults?.products.length > 0 && (
            <div className="absolute top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-full max-h-72 overflow-y-auto">
              {searchResults?.products?.map((product) => (
                <Link
                  onClick={() => setSearchTerm("")}
                  to={`/productDetails/${product._id}`}
                  key={product._id}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100"
                >
                  <img
                    src={product?.image[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-sm">{product.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Cart & Actions */}
        {user && (
          <div
            onClick={() => {
              if (user.role !== "admin") {
                navigate("/cart");
              }
            }}
            className={`relative ${
              user.role === "admin" ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <span
              className={`absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                user.role === "admin" ? "hidden" : "bg-red-600 text-white"
              }`}
            >
              {data?.cart
                ?.map((item) => item.quantity)
                .reduce((a, b) => a + b, 0)}
            </span>
          </div>
        )}

        {user && (
          <Link
            to="/dashboard"
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
          >
            <Lock className="w-4 h-4 mr-2" /> Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
          >
            <LogOut size={18} />
            <span className="ml-2 hidden sm:inline">Log Out</span>
          </button>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            >
              <UserPlus className="mr-1" size={18} /> Sign Up
            </Link>
            <Link
              to="/login"
              className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
            >
              <LogIn className="mr-1" size={18} /> Login
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Menu"
        className="md:hidden z-50"
      >
        {open ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {open && (
          <>
            {" "}
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setOpen(false)} // close when clicking outside
            />
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:hidden absolute top-full left-0 w-full bg-[#f1faee] shadow-md px-5 py-4 gap-4 z-40  "
            >
              <NavLink to="/" onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)}>
                About
              </NavLink>
              <NavLink to="/products" onClick={() => setOpen(false)}>
                Products
              </NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)}>
                Contact
              </NavLink>

              {!user && (
                <div className="flex gap-3">
                  <Link
                    to="/signup"
                    className="text-sm text-white flex gap-1 px-4 py-2 rounded-full hover:bg-red-700 bg-red-600"
                    onClick={() => setOpen(false)}
                  >
                    <UserPlus className="mr-1" size={18} />
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="text-sm text-white flex gap-1 px-4 py-2 rounded-full hover:bg-gray-600 bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex  w-max gap-4">
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-sm text-white  gap-1 px-4 py-2 rounded-full  hover:bg-gray-600 bg-gray-700"
                  >
                    Log Out
                  </button>

                  {user && (
                    <Link
                      to="/dashboard"
                      className="flex items-center w-max bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                    >
                      <Lock className="w-4 h-4 mr-2" /> Dashboard
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

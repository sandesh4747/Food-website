import React, { useState } from "react";
import logo from "../assets/foody.png";
import { Link, LogOut, Menu, X } from "lucide-react";
import { SidebarData } from "./Data/data";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "./api/userApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../store/authSlice";

export default function Sidebar({ admin }) {
  const [userLogout] = useLogoutMutation();
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredSidebarData = SidebarData.filter(
    (item) => !item.adminOnly || admin
  );

  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };
  const logout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(setUser(null));
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="relative ">
      {/* Toggle for mobile menu */}
      {/* Toggle for mobile menu - Now only opens the sidebar */}
      <button
        onClick={() => setOpen(true)} // Only sets open to true
        aria-label="Open Menu"
        className="md:hidden p-5 absolute  top-4 left-4"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col pt-16 transition-all duration-300 ease-in-out"
            >
              {/* Logo */}
              <NavLink to="/" className="flex h-20 w-20 logo cursor-pointer">
                <img className="w-15 h-15 ml-10" src={logo} alt="logo" />
              </NavLink>

              {/* Menu */}
              <div className="mt-5 flex flex-col gap-8 ">
                {filteredSidebarData.map((data) => (
                  <NavLink
                    key={data.heading}
                    to={data.path}
                    className={`flex items-center gap-4 h-10 ml-8 relative transition-all duration-300 ease-in-out text-sm rounded-lg ${
                      isMenuItemActive(data.path)
                        ? "bg-orange-200 ml-0 border-l-4 border-orange-500"
                        : ""
                    } hover:cursor-pointer`} // Notice the space before hover
                  >
                    <data.icon className="w-6 h-6 text-orange-500" />
                    <p className="hidden lg:block font-semibold text-orange-500">
                      {data.heading}
                    </p>
                  </NavLink>
                ))}

                <button
                  onClick={logout}
                  className="flex items-center gap-4 h-10 ml-8 text-orange-500  w-full "
                >
                  <LogOut />
                  <p className="font-semibold hidden lg:block">Logout</p>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <AnimatePresence>
          {open && (
            <>
              {/* Background blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-10 backdrop-blur-md bg-black/10"
                onClick={() => setOpen(false)} // Close menu when clicking outside
              />

              {/* Sidebar itself */}
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed z-20 w-2/5 pr-4 h-full pt-16 bg-[#ffe1bc]/90 shadow-lg flex flex-col"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 p-2 z-40"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
                {/* Logo */}
                <NavLink
                  to="/"
                  className="flex h-20 w-20 ml-5"
                  onClick={() => setOpen(false)}
                >
                  <img className="w-15 h-15" src={logo} alt="logo" />
                </NavLink>

                {/* Menu */}
                <div className="mt-16 flex flex-col gap-8">
                  {filteredSidebarData.map((data) => (
                    <NavLink
                      key={data.heading}
                      to={data.path}
                      className={`flex items-center gap-4 h-10 ml-8 relative transition-all duration-300 ease-in-out text-sm rounded-lg ${
                        isMenuItemActive(data.path)
                          ? "bg-orange-200 ml-0 border-l-4 border-orange-500"
                          : ""
                      } hover:cursor-pointer`}
                      onClick={() => setOpen(false)}
                    >
                      <data.icon className="w-6 h-6 text-orange-500" />
                      <p className="font-semibold text-orange-500">
                        {data.heading}
                      </p>
                    </NavLink>
                  ))}
                  <div className="flex items-center gap-4 h-10 ml-8 relative mt-8">
                    <LogOut className="text-orange-500" />
                    <p className="font-semibold text-orange-500">Logout</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

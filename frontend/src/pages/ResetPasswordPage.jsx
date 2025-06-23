import React, { useState } from "react";
import { useResetPasswordMutation } from "../components/api/userApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { KeyRound, Loader, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({
        token,
        password,
        confirmPassword,
      }).unwrap();

      navigate("/login");

      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="bg-[#FEF5E0] flex items-center justify-center min-h-screen w-full   backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full  bg-white/60 px-8 py-10 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="md:w-96 w-80 space-y-7">
            <div className="relative">
              <div className="w-full absolute left-3 top-3 pointer-events-none pl-3">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block   w-full  py-3 pl-13
              text-[#1d3557]  border border-[#a8dadc] rounded-full  placeholder-[#1d3557]/60 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm pr-3"
              />
            </div>

            <div className="relative">
              <div className="w-full absolute left-3 top-3 pointer-events-none pl-3">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="block   w-full  py-3 pl-13
              text-[#1d3557]  border border-[#a8dadc] rounded-full  placeholder-[#1d3557]/60 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm pr-3"
              />
            </div>
            <div className="flex  items-center justify-center">
              <button
                type="submit"
                className="rounded-full text-white bg-[#e63946] hover:bg-[#d62839] transition-all font-medium hover:scale-105 duration-300 ease-in-out w-full  h-11 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader
                      className="mr-2 h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

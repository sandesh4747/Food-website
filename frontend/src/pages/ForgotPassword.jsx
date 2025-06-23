import React, { useState } from "react";
import { useForgotPasswordMutation } from "../components/api/userApi";
import { motion } from "framer-motion";
import { ArrowLeft, Loader, Mail, Send, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [ForgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ForgotPassword({ email }).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#FEF5E0]  backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md full bg-white/50 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-[#1d3557] ">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="mb-6 text-center text-gray-700">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5  text-gray-500" />
              </div>
              <div>
                <input
                  className="block   w-full  py-3 pl-12
              text-[#1d3557]  border border-[#a8dadc] rounded-full  placeholder-[#1d3557]/60 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center mt-8 w-full  h-11 rounded-full text-white bg-[#e63946] hover:bg-[#d62839] transition-all font-medium hover:scale-105 duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin "
                    aira-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sent Reset Link
                </>
              )}
            </button>
          </form>
        ) : (
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-[#e63946] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-gray-600 mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}

        <div className="px-8 py-4 bg-opacity-50 flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-[#e63946] hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

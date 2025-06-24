import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, UserPlus, Eye, EyeOff, Loader } from "lucide-react";
import frontLogo from "../assets/front-logo.png";
import { Link } from "react-router-dom";
import { useUserSignupMutation } from "../components/api/userApi";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [userSignup, { isLoading, error }] = useUserSignupMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup({ email, password, name }).unwrap();
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex w-full bg-[#FEF5E0]">
      {/* Left side image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full hidden md:inline-block"
      >
        <img
          className="h-full object-cover"
          src={frontLogo}
          alt="leftSideImage"
          loading="lazy"
        />
      </motion.div>

      {/* Right side form */}
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl text-[#1d3557] font-bold text-center">
              SignUp
            </h2>
            <p className="text-sm text-[#457b9d] mt-3">
              Welcome! Please signup to continue
            </p>
          </motion.div>

          {/* Name input - Fixed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center w-full h-12 gap-2 my-5 bg-white relative rounded-full"
          >
            <div className="absolute pl-6">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="John Wick"
              className="block w-full py-3 pl-13
                      text-[#1d3557] border border-[#a8dadc] rounded-full placeholder-[#1d3557]/60 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.div>

          {/* Email input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center w-full h-12 gap-2 my-5 bg-white relative rounded-full"
          >
            <div className="absolute pl-6">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="block w-full py-3 pl-13
                      text-[#1d3557] border border-[#a8dadc] rounded-full placeholder-[#1d3557]/60 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          {/* Password input with visibility toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center mt-4 w-full h-12 rounded-full gap-2 bg-white relative"
          >
            <div className="absolute pl-6">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="block w-full py-3 pr-12 pl-13
                     text-[#1d3557] border border-[#a8dadc] rounded-full placeholder-[#1d3557]/60 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </motion.div>

          {/* Login button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <button
              type="submit"
              className="flex justify-center items-center mt-8 w-full h-11 rounded-full text-white bg-[#e63946] hover:bg-[#d62839] transition-all font-medium hover:scale-105 duration-300 ease-in-out"
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
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sign up
                </>
              )}
            </button>

            {/* Sign up link */}
            <p className="text-[#1d3557]/90 text-sm mt-4">
              Already have an account?{" "}
              <Link className="text-[#e63946] hover:underline" to={"/login"}>
                Login
              </Link>
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

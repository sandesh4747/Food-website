import React, { useEffect, useRef, useState } from "react";
import { useVerifyEmailMutation } from "../components/api/userApi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader, MailCheck } from "lucide-react";

export default function EmailVerificationPage() {
  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      const response = await verifyEmail({ verificationCode }).unwrap();
      navigate("/");
      console.log(response);
      toast.success("Email verified successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#FEF5E0]  items-center justify-center">
      {/* Left side image (if you want to match your login layout) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full hidden md:inline-block"
      >
        {/* Add your logo image here like in login page */}
      </motion.div>

      {/* Right side form */}
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="w-full max-w-md p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <MailCheck className="w-12 h-12 mx-auto text-[#1d3557]" />
            <h2 className="text-4xl text-[#1d3557] font-bold mt-4">
              Verify Your Email
            </h2>
            <p className="text-sm text-[#457b9d] mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-medium 
                            border border-[#4aa0a3] 
                            text-[#1d3557] focus:outline-none 
                            focus:ring-1 focus:ring-emerald-500
                            focus:border-emerald-500"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error?.error858}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className={`w-full py-3 rounded-full flex items-center justify-center gap-3 font-medium
    ${
      isLoading
        ? "bg-[#e63946]/80 text-white"
        : "bg-[#e63946] hover:bg-[#d62839] text-white"
    } transition-all duration-300`}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Verifying...
                </>
              ) : (
                <>
                  <MailCheck className="w-5 h-5" />
                  Verify Email
                </>
              )}
            </motion.button>

            <div className="text-center text-sm text-[#1d3557]/80">
              Didn't receive a code?{" "}
              <button type="button" className="text-[#e63946] hover:underline">
                Resend
              </button>
            </div>

            <div className="text-center text-sm text-[#1d3557]/80 mt-4">
              <Link to="/login" className="text-[#e63946] hover:underline">
                ← Back to Login
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

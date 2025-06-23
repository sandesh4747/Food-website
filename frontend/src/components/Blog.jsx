import React from "react";
import blog1 from "../assets/blog-1.jpg";
import blog2 from "../assets/blog-2.jpg";
import blog3 from "../assets/blog-3.jpg";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function Blog() {
  return (
    <div>
      <section>
        <div className="container px-6 py-10 mx-auto">
          <div className="flex  items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl font-bold text-gray-800 capitalize lg:text-4xl text-center  flex flex-col items-center justify-center"
            >
              From The Blog
              <div className="border-b-3 w-40 border-[#d62839] " />
            </motion.h1>
          </div>

          <hr className="my-8 border-gray-300" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={blog1}
                alt=""
              />

              <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  What do you want to know about UI
                </h1>

                <p className="mt-2 text-gray-900 font-medium text-lg">
                  How to cultivate organic fruits and vegetables in own firm
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <a
                      href="#"
                      className="text-lg font-medium text-gray-900  hover:text-gray-600"
                    >
                      <User color="green" />
                      John snow
                    </a>

                    <p className="text-sm text-gray-900 ">February 1, 2022</p>
                  </div>

                  <a
                    href="#"
                    className="inline-block text-red-500 underline hover:text-red-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={blog2}
                alt=""
              />

              <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  All the features you want to know
                </h1>

                <p className="mt-2 text-gray-700 font-medium text-lg">
                  How to cultivate organic fruits and vegetables in own firm
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <a
                      href="#"
                      className="text-lg font-medium text-gray-900  hover:text-gray-600"
                    >
                      <User color="green" />
                      Arthur Melo
                    </a>

                    <p className="text-sm text-gray-900">February 6, 2022</p>
                  </div>

                  <a
                    href="#"
                    className="inline-block text-red-500 underline hover:text-red-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={blog3}
                alt=""
              />

              <div className="mt-8">
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  Which services you get from Meraki UI
                </h1>

                <p className="mt-2 text-gray-700 font-medium text-lg">
                  How to cultivate organic fruits and vegetables in own firm
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <a
                      href="#"
                      className="text-lg font-medium text-gray-900  hover:text-gray-600"
                    >
                      <User color="green" />
                      Tom Hank
                    </a>

                    <p className="text-smtext-gray-900">February 19, 2022</p>
                  </div>

                  <a
                    href="#"
                    className="inline-block text-red-500 underline hover:text-red-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

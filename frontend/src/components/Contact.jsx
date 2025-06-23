import { MapPin, Phone, Mail, Clock, ShoppingCart } from "lucide-react";

import { BreadcrumbsWithIcon } from "./BreadCrumbs";
import { motion } from "framer-motion";
import img from "../assets/carousel-2.png";

export default function Contact() {
  const breadcrumbs = [
    { path: "/", label: "Home" },
    {
      path: "/contact",
      label: "contact",
    },
  ];
  return (
    <div>
      <div className="h-90 w-full overflow-hidden mb-20 relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={img}
          alt="logo"
          className="w-full max-h-220 object-cover object-[0_50%]"
          loading="lazy"
        />
        <div className="absolute top-[40%] sm:top-[50%] left-[5%] transform -translate-y-1/2 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          >
            CONTACT
          </motion.p>

          <div className="w-40 h-0.5 bg-red-600 rounded-full"></div>

          <div>
            <BreadcrumbsWithIcon links={breadcrumbs} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 mt-20">
        {/* Header */}

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-orange-800 mb-4">
            We're Here to Help
          </h1>
          <p className="text-lg text-orange-700 max-w-2xl mx-auto">
            Questions about your order? Need product recommendations? Reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {[
              {
                icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
                title: "Order Support",
                content: "help@greencart.com",
              },
              {
                icon: <Phone className="w-8 h-8 text-orange-600" />,
                title: "Delivery Hotline",
                content: "(555) 987-6543",
              },
              {
                icon: <Mail className="w-8 h-8 text-red-600" />,
                title: "Farm Partnerships",
                content: "partners@greencart.com",
              },
              {
                icon: <Clock className="w-8 h-8 text-green-600" />,
                title: "Customer Service Hours",
                content: "6AM - 10PM Daily",
              },
              {
                icon: <MapPin className="w-8 h-8 text-orange-600" />,
                title: "Warehouse Address",
                content: "456 Fresh Lane, Farm District, FT 54321",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-orange-800">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-orange-50 rounded-xl p-6 md:p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-800 mb-6">
              Quick Inquiry
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-orange-800 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-orange-800 mb-1">
                    Order # (if any)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg  border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="GC-1234"
                  />
                </div>
              </div>
              <div>
                <label className="block text-orange-800 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg  border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  className="text-base font-semibold text-orange-500"
                  htmlFor="category"
                >
                  Category
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-orange-300 outline-none focus:ring-2 focus:ring-red-500 text-red-500">
                  <option>Fruits & Vegetables</option>
                  <option>Dairy Products</option>
                  <option>Bakery Items</option>
                  <option>Cold Drinks</option>
                  <option>Delivery Issue</option>
                </select>
              </div>
              <div>
                <label className="block text-orange-800 mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg  border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Describe your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-orange-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-orange-700 transition-all shadow-md"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>

        {/* Delivery Map */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-orange-800 mb-4 text-center">
            Our Location
          </h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.032391782222!2d85.31929401506333!3d27.717245982792584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1909a4b2653d%3A0x6711daabf2f3b422!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1629034912345!5m2!1sen!2snp"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

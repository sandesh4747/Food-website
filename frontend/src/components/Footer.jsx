import { Link } from "lucide-react";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white pt-12 pb-6 px-4 md:px-20  mx-auto w-full">
      <div className="grid md:grid-cols-4 gap-8 max-w-8xl mx-auto">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Foody</h2>
          <p className="text-white mb-4">
            Fresh, organic & delicious food delivered right to your door.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-orange-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-orange-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-500">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-500">
            Useful Links
          </h3>
          <ul className="space-y-2 text-white">
            <li>
              <NavLink to={"/about"} className="hover:text-orange-500">
                About Us
              </NavLink>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Shop
              </a>
            </li>
            <li>
              <NavLink to={"/contact"} className="hover:text-orange-500">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-500">
            Customer Service
          </h3>
          <ul className="space-y-2 text-white">
            <li>
              <a href="#" className="hover:text-orange-500">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-500">
            Newsletter
          </h3>
          <p className="text-white mb-4">Subscribe to get latest updates.</p>

          <form className="flex items-center max-w-md">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button className="bg-orange-500 p-2 rounded-r-md hover:bg-orange-600 text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-white text-sm">
        © 2025 Foody. All rights reserved.
      </div>
    </footer>
  );
}

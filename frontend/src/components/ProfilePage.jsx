import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Settings,
  ShoppingBag,
  Lock,
  Users,
  BarChart2,
  KeyRound,
} from "lucide-react";
import { setUser } from "../store/authSlice";
import toast from "react-hot-toast";
import { useLogoutMutation, useUpdateProfileMutation } from "./api/userApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { user } = useSelector((state) => state.authSlice);
  const isAdmin = user?.role === "admin";
  const [userLogout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const logout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // Common profile sections
  const userSections = [
    {
      icon: <KeyRound size={18} className="text-orange-600" />,
      title: "Change Password",
      path: "/profile/change-password",
    },
    {
      icon: <User size={18} className="text-orange-600" />,
      title: "Personal Info",
      path: "/profile/info",
    },
    {
      icon: <Settings size={18} className="text-orange-600" />,
      title: "Preferences",
      path: "/profile/prefs",
    },
    {
      icon: <ShoppingBag size={18} className="text-orange-600" />,
      title: "Order History",
      path: "/profile/orders",
    },
    {
      icon: <Lock size={18} className="text-orange-600" />,
      title: "Security",
      path: "/profile/security",
    },
  ];

  // Admin-only sections
  const adminSections = [
    {
      icon: <Users size={18} className="text-red-600" />,
      title: "Manage Users",
      path: "/admin/users",
    },
    {
      icon: <BarChart2 size={18} className="text-red-600" />,
      title: "Analytics",
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 border border-orange-50">
      {/* Profile Header - Now properly organized */}
      <div className="flex flex-col items-center mb-8">
        {/* Avatar with user info stacked below */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group mb-4">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <img
                src={
                  avatar
                    ? typeof avatar === "string"
                      ? avatar
                      : URL.createObjectURL(avatar)
                    : user?.avatar?.url ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-orange-100 shadow-lg transition-all duration-300 group-hover:border-orange-200"
              />
              <div className="absolute bottom-0 right-0 bg-orange-50 p-2 rounded-full border border-orange-200 shadow-sm transform transition-transform duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Click to change photo
            </p>
          </div>

          {/* User info centered below avatar */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-orange-900">
              {user?.name || "User"}
            </h1>
            <p className="text-orange-700 mb-2">{user?.email}</p>
            {isAdmin && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full border border-red-200">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Update form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-orange-800 mb-1"
            >
              Update Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user?.name || "Enter your name"}
              className="w-full px-4 py-2 rounded-lg border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
              isLoading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>

      {/* Profile Sections */}
      <div className="space-y-3 mb-6">
        {userSections.map((section) => (
          <a
            key={section.path}
            href={section.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors duration-300 border border-orange-100 hover:border-orange-200"
          >
            <div className="p-2 bg-orange-50 rounded-full">{section.icon}</div>
            <span className="text-orange-800 font-medium">{section.title}</span>
          </a>
        ))}

        {isAdmin && (
          <>
            <div className="border-t border-orange-100 my-3"></div>
            {adminSections.map((section) => (
              <a
                key={section.path}
                href={section.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-300 border border-red-100 hover:border-red-200"
              >
                <div className="p-2 bg-red-50 rounded-full">{section.icon}</div>
                <span className="text-red-800 font-medium">
                  {section.title}
                </span>
              </a>
            ))}
          </>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Log Out
      </button>
    </div>
  );
}

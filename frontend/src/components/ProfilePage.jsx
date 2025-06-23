import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Settings,
  ShoppingBag,
  Lock,
  Users,
  BarChart2,
} from "lucide-react";
import { setUser } from "../store/authSlice";
import toast from "react-hot-toast";
import { useLogoutMutation } from "./api/userApi";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.authSlice);
  const isAdmin = user?.role === "admin";
  const [userLogout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Common profile sections
  const userSections = [
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
    <div className="max-w-md mx-auto p-6 bg-orange-50 rounded-lg shadow-sm mt-20">
      {/* Profile Header */}
      <div className="flex flex-col justify-center  sm:flex-row items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center text-2xl font-bold text-orange-800">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h1 className="text-xl font-bold text-orange-900 text-center sm:text-left">
            {user?.name || "User"}
          </h1>
          <p className="text-orange-700">{user?.email}</p>
          {isAdmin && (
            <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full border border-red-200">
              Admin
            </span>
          )}
        </div>
      </div>

      {/* Profile Sections */}
      <div className="space-y-2">
        {userSections.map((section) => (
          <a
            key={section.path}
            href={section.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-100 transition-colors border border-orange-100"
          >
            {section.icon}
            <span className="text-orange-800">{section.title}</span>
          </a>
        ))}

        {isAdmin && (
          <>
            <div className="border-t border-orange-200 my-3"></div>
            {adminSections.map((section) => (
              <a
                key={section.path}
                href={section.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors border border-red-100"
              >
                {section.icon}
                <span className="text-red-800">{section.title}</span>
              </a>
            ))}
          </>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full mt-8 py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors shadow-md"
      >
        Log Out
      </button>
    </div>
  );
}

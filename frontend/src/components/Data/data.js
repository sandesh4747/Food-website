import {
  HomeIcon,
  BarChart,
  Clipboard,
  User,
  Package,
  UserPlus,
  DollarSign,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

import img1 from "../../assets/img1.png";

export const SidebarData = [
  { icon: HomeIcon, heading: "Dashboard", path: "/dashboard" },
  { icon: Clipboard, heading: "Orders", path: "/dashboard/orders" },
  {
    icon: User,
    heading: "Customers",
    path: "/dashboard/customers",
    adminOnly: true,
  },
  {
    icon: Package,
    heading: "Products",
    path: "/dashboard/products",
    adminOnly: true,
  },
  {
    icon: User,
    heading: "Profile",
    path: "/dashboard/profile",
  },
];

export const CardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: DollarSign,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg,#ff919d 0%,#fc929d 100%)",
      boxShadow: "0px 10px 20px 0px #fdc0c7",
    },
    barValue: 80,
    value: "14,270",
    png: ArrowDown,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #f9d59b",
    },
    barValue: 60,
    value: "4,270",
    png: Clipboard,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img1,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img1,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, battery will be changed.",
    time: "2 hours ago",
  },
];

import { Edit, PlusCircle, ShoppingBasket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGetAllProuductsQuery } from "../components/api/productApi";
import { motion } from "framer-motion";
import { button } from "@material-tailwind/react";
import AddProduct from "../components/AddProduct";
import ProductsList from "../components/ProductsList";
import EditProduct from "../components/EditProduct";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  {
    id: "products",
    label: "Products",
    icon: ShoppingBasket,
  },
];
export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("create");
  const { data } = useGetAllProuductsQuery();
  const products = data?.products;
  const [editProductData, setEditProductData] = useState(null);

  const handleEditProduct = (product) => {
    setEditProductData(product);
    setActiveTab("edit");
  };

  return (
    <div className="min-h-screen relative overflow-hidden max-w-7xl mx-auto overflow-x-auto">
      <div className="relative container mx-auto px-4 py-16 min-h-screen ">
        <motion.h1
          className="text-4xl font-bold mb-8 text-red-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Product Dashboard
        </motion.h1>
        <div className="  flex flex-col items-center gap-4  sm:flex-row sm:justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-row  items-center px-4 py-2 mx-2 rounded-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-red-500 text-white"
                  : "bg-red-200 text-red-800 hover:bg-red-100"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5 " /> {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "edit" && editProductData && (
          <EditProduct product={editProductData} />
        )}
        {activeTab === "create" && <AddProduct />}
        {activeTab === "products" && (
          <ProductsList onEditClick={handleEditProduct} />
        )}
      </div>
    </div>
  );
}

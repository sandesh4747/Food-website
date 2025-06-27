import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetAllProuductsQuery,
  useToggleProductsMutation,
} from "./api/productApi";
import { toast } from "react-hot-toast";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import { Edit, Loader, Trash } from "lucide-react";

export default function ProductsList({ onEditClick }) {
  const TABLE_HEAD = ["Product", "ID", "Featured", "Actions"];
  const [toggleProduct] = useToggleProductsMutation();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const { data } = useGetAllProuductsQuery();
  const [deletingId, setDeletingId] = useState(null);
  const products = data?.products || [];

  const handleToggle = async (id) => {
    try {
      const res = await toggleProduct(id).unwrap();
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.error || error);
    } finally {
      setDeletingId(null); // Reset after operation completes
    }
  };

  return (
    <div className="p-4 md:p-10 md:bg-red-50 min-h-screen overflow-x-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6">All Products</h2>

      <Card className="hidden md:block  rounded-lg shadow-md bg-white ">
        <table className="w-full min-w-max table-auto text-left bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-orange-200 to-red-200 text-orange-800">
              {TABLE_HEAD.map((head) => (
                <th key={head} className="p-4 border-b border-orange-300">
                  <Typography
                    variant="small"
                    className="font-semibold uppercase tracking-wide"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              const isLast = index === products.length - 1;
              const rowStyle = isLast
                ? "p-4"
                : "p-4 border-b border-orange-100";

              return (
                <tr key={product._id} className="hover:bg-orange-50 transition">
                  <td className={rowStyle}>
                    <Typography
                      variant="small"
                      className="text-red-600 font-medium flex gap-2 items-center "
                    >
                      <img
                        src={product.image[0]}
                        alt=""
                        className="w-10 h-10 object-cover"
                      />
                      {product.name}
                    </Typography>
                  </td>
                  <td className={rowStyle}>
                    <Typography
                      variant="small"
                      className="text-gray-700 truncate w-60"
                    >
                      {product._id}
                    </Typography>
                  </td>
                  <td className={rowStyle}>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={product.isFeatured}
                        onClick={() => handleToggle(product._id)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-12 h-7 rounded-full transition-colors duration-300 
                        peer-checked:bg-red-500 bg-gray-300`}
                      ></div>
                      <div
                        className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full 
                         transition-transform duration-300 peer-checked:translate-x-5"
                      ></div>
                    </label>
                  </td>

                  <td className={`${rowStyle} flex gap-3 items-center `}>
                    <Tooltip content="Edit" className=" text-orange-900">
                      <IconButton
                        className="flex justify-center items-center"
                        color="orange"
                        variant="text"
                        size="sm"
                        onClick={() => onEditClick(product)}
                      >
                        <Edit className="w-5 h-5" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete" className=" text-red-900">
                      <IconButton
                        className="flex justify-center items-center"
                        color="red"
                        variant="text"
                        size="sm"
                        disabled={deletingId === product._id}
                        onClick={() => handleDelete(product._id)}
                      >
                        {deletingId === product._id ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash className="w-5 h-5" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 ">
        {products.map((product) => (
          <Card key={product._id} className="p-4 shadow-sm">
            <div className="flex gap-10 justify-between items-start">
              <div className="flex items-center gap-3">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-cover rounded"
                />
                <div>
                  <Typography
                    variant="small"
                    className="font-medium text-gray-900"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-gray-500 text-xs truncate w-20"
                  >
                    ID: {product._id}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={product.isFeatured}
                    onClick={() => handleToggle(product._id)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 rounded-full peer-checked:bg-red-500 bg-gray-300"></div>{" "}
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </label>

                <Tooltip content="Edit" className=" text-orange-900">
                  <IconButton
                    className="flex justify-center items-center"
                    color="orange"
                    variant="text"
                    size="sm"
                    onClick={() => onEditClick(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Delete" className=" text-red-900">
                  <IconButton
                    className="flex justify-center items-center"
                    color="red"
                    variant="text"
                    size="sm"
                    disabled={deletingId === product._id}
                    onClick={() => handleDelete(product._id)}
                  >
                    {deletingId === product._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash className="w-4 h-4" />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-10">
          <Typography variant="h5" className="text-gray-500">
            No products found
          </Typography>
        </div>
      )}
    </div>
  );
}

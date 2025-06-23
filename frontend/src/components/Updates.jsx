import React from "react";
import { useGetAllOrdersQuery } from "./api/orderApi";
import { formatDistanceToNow } from "date-fns";

export default function Updates() {
  const { data: orders, isLoading } = useGetAllOrdersQuery();

  if (isLoading) return <p>Loading updates...</p>;

  return (
    <div className="flex flex-col  gap-4 text-[13px] w-full p-4 bg-white rounded-xl shadow-md space-y-4">
      {orders?.map((order) => (
        <div
          key={order._id}
          className=" flex items-start space-x-3 border-b pb-3 last:border-b-0 gap-2"
        >
          <img
            src={order.items?.[0]?.product?.image || "/default.jpg"}
            alt="product"
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <p className="font-semibold">
              {order.user?.name || "Someone"} ordered
              <span className="text-orange-500">
                {"   "}
                {order.items?.[0]?.product?.name || " a product"}
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(order.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

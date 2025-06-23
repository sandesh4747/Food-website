import { useSelector } from "react-redux";
import { useGetAllOrdersQuery, useGetMyOrdersQuery } from "./api/orderApi";

export default function RecentOrders() {
  const { data } = useGetMyOrdersQuery();
  console.log(data);

  const orders = data;

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Recent Orders</h3>
      <div className="space-y-3">
        {orders?.slice(0, 5).flatMap((order) =>
          order.items.map((item, index) => (
            <div
              key={`${order._id}-${index}`}
              className="flex justify-between p-3 border-b"
            >
              <span>#{order._id}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <span
                className={`font-medium ${
                  order.orderStatus === "Delivered"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

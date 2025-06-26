import { useGetMyOrdersQuery } from "./api/orderApi";

export default function RecentOrders() {
  const { data } = useGetMyOrdersQuery();
  const orders = data || [];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Recent Orders</h3>
      <div className="space-y-3">
        {orders.slice(0, 5).flatMap((order) =>
          order.items.map((item, index) => (
            <div
              key={`${order._id}-${index}`}
              className="flex flex-col sm:flex-row justify-between p-3 border-b gap-2 sm:gap-0"
            >
              <span className="text-sm truncate">#{order._id}</span>
              <span className="text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span
                className={`text-sm font-medium ${
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

import { Card, Typography } from "@material-tailwind/react";
import { useGetAllOrdersQuery, useGetMyOrdersQuery } from "./api/orderApi";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Product", "Tracking ID", "Date", "Status"];

export default function OrderPage() {
  const { user } = useSelector((state) => state.authSlice);
  const admin = user?.role === "admin";
  const { data } = useGetAllOrdersQuery();
  const { data: myOrders } = useGetMyOrdersQuery();

  const orders = admin ? data : myOrders;
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="w-full pt-20 px-2 sm:px-4 md:px-8">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-500 pb-5">
        All Orders
      </h3>

      {hasOrders ? (
        <>
          {/* Desktop Table (hidden on mobile) */}
          <Card className="hidden md:block h-full w-full overflow-scroll shadow-[0_13px_20px_0px_#80808029]">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-100 bg-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.flatMap((order) =>
                  order.items.map((item, index) => (
                    <TableRow
                      key={`${order._id}-${index}`}
                      order={order}
                      item={item}
                      index={index}
                    />
                  ))
                )}
              </tbody>
            </table>
          </Card>

          {/* Mobile Cards (shown on mobile) */}
          <div className="md:hidden space-y-4">
            {orders.flatMap((order) =>
              order.items.map((item, index) => (
                <MobileOrderCard
                  key={`${order._id}-${index}`}
                  order={order}
                  item={item}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <div className="bg-blue-gray-50 p-8 rounded-lg text-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            No Orders Found
          </Typography>
          <Typography color="gray" className="font-normal">
            {admin
              ? "There are no orders in the system yet."
              : "You haven't placed any orders yet."}
          </Typography>
        </div>
      )}
    </div>
  );
}

// Reusable Table Row Component
const TableRow = ({ order, item, index }) => {
  const isLast = index === order.items.length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-50";

  return (
    <tr key={item._id}>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.product?.name}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal truncate max-w-[100px]"
        >
          {order._id}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {order.createdAt.split("T")[0]}
        </Typography>
      </td>
      <td className={classes}>
        <StatusBadge status={order.orderStatus} />
      </td>
    </tr>
  );
};

// Mobile Order Card Component
const MobileOrderCard = ({ order, item }) => {
  return (
    <Card className="p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Typography variant="small" className="font-semibold text-gray-600">
            Product
          </Typography>
          <Typography variant="small" className="font-medium">
            {item.product?.name}
          </Typography>
        </div>

        <div>
          <Typography variant="small" className="font-semibold text-gray-600">
            Status
          </Typography>
          <StatusBadge status={order.orderStatus} />
        </div>

        <div>
          <Typography variant="small" className="font-semibold text-gray-600">
            Date
          </Typography>
          <Typography variant="small">
            {order.createdAt.split("T")[0]}
          </Typography>
        </div>

        <div>
          <Typography variant="small" className="font-semibold text-gray-600">
            Tracking ID
          </Typography>
          <Typography variant="small" className="truncate">
            {order._id}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

// Reusable Status Badge Component
const StatusBadge = ({ status }) => {
  const colorClass =
    status === "Delivered" ? "text-green-500" : "text-orange-500";

  return (
    <Typography variant="small" className={`font-medium ${colorClass}`}>
      {status}
    </Typography>
  );
};

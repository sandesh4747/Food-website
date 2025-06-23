import { Card, Typography } from "@material-tailwind/react";
import { useGetAllOrdersQuery, useGetMyOrdersQuery } from "./api/orderApi";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Product", "Tracking ID", "Date", "Status"];

export default function OrderPage() {
  const { user } = useSelector((state) => state.authSlice);
  const admin = user?.role === "admin";
  const { data } = useGetAllOrdersQuery();
  // console.log("data", data);
  const { data: myOrders } = useGetMyOrdersQuery();
  // console.log("my order", myOrders);

  const orders = admin ? data : myOrders;

  return (
    <div className="w-full ">
      <h3 className="text-2xl font-semibold mb-4 text-orange-500 pb-5 mt-7">
        Recent Orders
      </h3>
      <Card className="h-full w-full overflow-scroll shadow-[0_13px_20px_0px_#80808029] pl-5">
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
            {orders?.slice(0, 5).flatMap((order) =>
              order?.items.map((item, index) => {
                const isLast = index === order.items.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-50";

                return (
                  <tr key={item._id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.product?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {order._id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {order.createdAt.split("T")[0]}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-medium ${
                          order.orderStatus === "Delivered"
                            ? "text-green-500"
                            : "text-orange-500"
                        }`}
                      >
                        {order.orderStatus}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

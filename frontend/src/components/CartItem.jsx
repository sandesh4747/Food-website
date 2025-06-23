import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useUpdateCartMutation, useRemoveCartMutation } from "./api/cartApi";

export default function CartItem({ item }) {
  const [updateCart] = useUpdateCartMutation();
  const [removeCart] = useRemoveCartMutation();

  const handleIncrease = async () => {
    try {
      await updateCart({
        productId: item.product._id,
        quantity: item.quantity + 1,
      }).unwrap();
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1) return;
    try {
      await updateCart({
        productId: item.product._id,
        quantity: item.quantity - 1,
      }).unwrap();
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeCart({ productId: item?.product?._id }).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm border-orange-300 bg-orange-50">
      {/* Mobile Layout (Stacked) */}
      <div className="md:hidden space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={item?.product?.image[0]}
            alt={item?.product?.name}
            className="h-16 w-16 object-cover rounded-lg border border-orange-200"
          />
          <div className="flex-1">
            <p className="font-semibold text-orange-900">
              {item.product?.name}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-sm text-orange-700">
                  Rs. {item?.product?.price.toFixed(2)}
                </p>
                <p className="text-sm font-bold text-red-600">
                  Total: ${(item?.product?.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-orange-700">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className={`h-8 w-8 flex items-center justify-center rounded-full border border-orange-400 ${
                item.quantity <= 1
                  ? "bg-orange-200 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white border border-orange-400"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout (Horizontal) */}
      <div className="hidden md:flex items-center justify-between gap-6">
        {/* Product Image + Info */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <img
            src={item?.product?.image[0]}
            alt={item?.product?.name}
            className="h-20 w-20 object-cover rounded-lg border border-orange-200"
          />
          <div className="min-w-0">
            <p className="text-lg font-semibold text-orange-900 truncate">
              {item?.product?.name}
            </p>
            <button
              onClick={handleRemove}
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 hover:underline mt-2"
            >
              <Trash className="mr-1.5 h-4 w-4" />
              Remove
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="w-24 text-center">
          <span className="text-xs font-medium text-orange-700">Price</span>
          <p className="text-sm text-orange-800">
            Rs. {item?.product?.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity */}
        <div className="w-32 text-center">
          <span className="text-xs font-medium text-orange-700">Quantity</span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className={`h-8 w-8 flex items-center justify-center rounded-full border border-orange-400 ${
                item.quantity <= 1
                  ? "bg-orange-200 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white border border-orange-400"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="w-24 text-right">
          <span className="text-xs font-medium text-orange-700">Total</span>
          <p className="text-lg font-bold text-red-600">
            Rs. {(item?.product?.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

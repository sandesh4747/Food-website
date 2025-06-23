import toast from "react-hot-toast";
import { useAddCartMutation } from "../api/cartApi";

export function useCart() {
  const [addCart, { isLoading }] = useAddCartMutation();

  const handleAddToCart = async (productId) => {
    try {
      await addCart({ productId }).unwrap();
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  return { handleAddToCart, isLoading };
}

import { useRecommendedProductQuery } from "./api/productApi";
import ReviewComponent from "./ReviewComponent";

export default function PersonalizedRecommendations() {
  const { data } = useRecommendedProductQuery();
  console.log("rec", data);
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-orange-800 mb-4">
        Recommended For You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.products?.map((product) => (
          <ReviewComponent key={product.id} product={product} compact />
        ))}
      </div>
    </div>
  );
}

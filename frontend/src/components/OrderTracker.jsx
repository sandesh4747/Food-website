export default function OrderTracker() {
  return (
    <div className="mb-6">
      <h3 className=" text-lg font-medium text-gray-800 mb-3">Current Order</h3>
      <div className="flex items-center justify-between">
        {["Confirmed", "Preparing", "On the Way", "Delivered"].map(
          (step, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center 
              ${
                index < 2
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-400"
              }`}
              >
                {index + 1}
              </div>
              <p className="text-sm mt-2">{step}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function OrderTracker() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Current Order</h3>
      <div className="flex flex-wrap justify-between gap-2">
        {["Confirmed", "Preparing", "On the Way", "Delivered"].map(
          (step, index) => (
            <div key={index} className="text-center flex-1 min-w-[70px]">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center 
                ${
                  index < 2
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm mt-2">{step}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function QuickActions() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-orange-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          { icon: "🔄", label: "Reorder", action: "/reorder" },
          { icon: "❤️", label: "Favorites", action: "/favorites" },
          { icon: "📝", label: "Addresses", action: "/addresses" },
          { icon: "💳", label: "Payment", action: "/payment" },
        ].map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-3 sm:p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
          >
            <span className="text-xl sm:text-2xl mb-1 sm:mb-2">
              {item.icon}
            </span>
            <span className="text-xs sm:text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

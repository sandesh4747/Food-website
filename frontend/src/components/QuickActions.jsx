export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-orange-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { icon: "🔄", label: "Reorder", action: "/reorder" },
          { icon: "❤️", label: "Favorites", action: "/favorites" },
          { icon: "📝", label: "Addresses", action: "/addresses" },
          { icon: "💳", label: "Payment", action: "/payment" },
        ].map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-orange-50 hover:bg-orange-100"
          >
            <span className="text-2xl mb-2">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

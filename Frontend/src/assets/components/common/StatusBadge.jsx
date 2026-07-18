function StatusBadge({ status }) {
  const colors = {
    Available: "bg-green-100 text-green-700",
    "On Trip": "bg-blue-100 text-blue-700",
    "In Shop": "bg-yellow-100 text-yellow-700",
    Retired: "bg-red-100 text-red-700",

     "Off Duty": "bg-gray-100 text-gray-700",
     Suspended: "bg-red-100 text-red-700",

     Draft: "bg-gray-100 text-gray-700",
    Dispatched: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",

    Active: "bg-orange-100 text-orange-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
import React from "react";

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (label) => {
  switch (label) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderTable = ({ orders, onVerify }) => {
  return (
    <table className="min-w-full border text-sm">
      <thead>
        <tr className="bg-gray-50 text-left text-gray-500">
          <th className="py-3 px-4">#</th>
          <th className="py-3 px-4">Order By</th>
          <th className="py-3 px-4">Order Date</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Total</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id} className="border-t">
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{order.user.username}</td>
            <td className="py-2 px-4">{formatDate(order.date)}</td>
            <td className="py-2 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.label)}`}>
                {order.label}
              </span>
            </td>
            <td className="py-2 px-4">{order.total}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => onVerify(order)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Verify
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
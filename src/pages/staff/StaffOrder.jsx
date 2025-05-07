import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/axios";
import OrderVerify from "../../components/staff/staff orders/OrderVerify";
import OrderTable from "../../components/staff/staff orders/OrderTable";

const StaffOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isVerify, setIsVerify] = useState(false);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const { data } = await apiClient.get("/order/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === "success") {
        setOrders(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleVerify = (order) => {
    setSelectedOrder(order);
    setIsVerify(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Orders</h1>
      {isVerify && selectedOrder && (
        <OrderVerify order={selectedOrder} onClose={() => setIsVerify(false)} />
      )}
      <OrderTable orders={orders} onVerify={handleVerify} />
    </div>
  );
};

export default StaffOrder;
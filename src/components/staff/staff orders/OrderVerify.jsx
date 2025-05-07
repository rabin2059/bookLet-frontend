import React, { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../../api/axios";

const OrderVerify = ({ order, onClose }) => {
  const [claimCode, setClaimCode] = useState("");

  const handleVerify = async () => {
    try {
      const response = await apiClient.post(`/order/verifyClaimCode`, {
        claimCode,
        orderId: order.id,
      });

      if (response.data.status === "success") {
        toast.success("Order verified successfully");
        onClose(); 
      } else {
        toast.error(response.data.message || "Verification failed");
      }
    } catch (error) {
      toast.error("Verification error");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">Verify Claim Code for Order #{order.id}</h2>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={claimCode}
          onChange={(e) => setClaimCode(e.target.value)}
          placeholder="Enter claim code"
          className="border border-gray-300 rounded px-4 py-2 w-64"
        />
        <button onClick={handleVerify} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Verify
        </button>
        <button onClick={onClose} className="text-sm underline text-red-500 ml-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderVerify;
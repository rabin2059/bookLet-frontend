import React, { useState } from "react";
import { BadgePercent, ChevronDown, ChevronUp } from "lucide-react";

const CartSummary = ({ mergedCart }) => {
  const [showAllDiscounts, setShowAllDiscounts] = useState(false);

  const discounts = [
    { name: "+5 Books Member Discount", value: "5%" },
    { name: "10 successful orders Discount", value: "10%" },
    { name: "Special Offers", value: "20%" },
    { name: "First-time buyer bonus", value: "5%" },
    { name: "Seasonal discount", value: "8%" },
  ];

  const visibleDiscounts = showAllDiscounts ? discounts : discounts.slice(0, 2);
  const hiddenCount = discounts.length - 2;

  const subtotal = mergedCart.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );
  const operationFee = parseFloat((subtotal * 0.06).toFixed(2));
  const total = subtotal + operationFee;

  return (
    <div>
      <div className="h-[300 px] w-[478px] bg-gray-100 rounded-xl px-9 py-6 mb-10">
        <h1 className="text-[24px] font-semibold mb-2">Selected Offer Summary</h1>
        <div className="p-3 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <p className="text-gray-400">Proposed total</p>
              <p className="font-bold text-lg">Rs.{subtotal}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-gray-400">Operation Fee (6%)</p>
              <p className="font-bold text-lg">Rs.{operationFee}</p>
            </div>
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-400 font-semibold text-lg">TOTAL</p>
            <p className="font-bold text-3xl">Rs.{total}</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgePercent size={20} />
            <h2 className="text-xl font-semibold">Discounts Applied</h2>
          </div>
          <div className="text-sm font-semibold bg-web-primary border border-gray-700 px-4 py-1 rounded-full">
            {discounts.length} available
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-3">
            {visibleDiscounts.map((discount, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-web-offer rounded-full mr-2"></span>
                  <p className="text-gray-700">{discount.name}</p>
                </div>
                <p className="font-medium text-web-discount">{discount.value}</p>
              </div>
            ))}
            {discounts.length > 2 && (
              <button
                onClick={() => setShowAllDiscounts(!showAllDiscounts)}
                className="w-full mt-2 flex items-center justify-center gap-1 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border-t border-gray-100"
              >
                {showAllDiscounts ? (
                  <>
                    <ChevronUp size={16} />
                    <span>Show less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    <span>Show {hiddenCount} more discount{hiddenCount !== 1 ? "s" : ""}</span>
                  </>
                )}
              </button>
            )}
            <button className="w-full bg-web-primary py-4 font-bold text-xl rounded-lg">
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
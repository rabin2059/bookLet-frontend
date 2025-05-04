import React from "react";
import { X } from "lucide-react";

const PreviewBanner = ({
  banner,
  onClose,
  getColorClass,
  formatDate,
  getStatus,
}) => {
  if (!banner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-medium">Banner Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        <div
          className={`py-3 px-6 ${getColorClass(
            banner.color,
            "preview"
          )} text-white`}
        >
          {banner.message}
        </div>
        <div className="p-6">
          <p>
            <strong>Status:</strong> {getStatus(banner).label}
          </p>
          <p>
            <strong>Color:</strong> {banner.color}
          </p>
          <p>
            <strong>Date Range:</strong> {formatDate(banner.startDate)} -{" "}
            {formatDate(banner.endDate)}
          </p>
        </div>
        <div className="border-t px-6 py-4 text-right">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewBanner;

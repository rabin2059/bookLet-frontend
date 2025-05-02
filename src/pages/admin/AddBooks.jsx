import React, { useState } from "react";
import apiClient from "../../api/axios";

const AddBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    publisher: "",
    publicationDate: "",
    price: "",
    quantity: "",
    language: "",
    discount: "",
    format: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    
    const data = new FormData();
    
    for (const key in formData) {
      if (key === "publicationDate" && formData[key]) {
        const utcDate = new Date(formData[key]).toISOString();
        data.append(key, utcDate);
      } else {
        data.append(key, formData[key]);
      }
    }
    
    if (image) {
      data.append("image", image);
    }
    
    try {
      // Simulating API call since we can't make actual requests
      const token = localStorage.getItem("token");
      const res = await apiClient.post("/bookcrud/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      
      // Simulate success after 1 second
      setTimeout(() => {
        setMessage("Book created successfully!");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to create book");
    }
  };

  // Group form fields for better layout
  const formFields = [
    [
      { label: "Title", name: "title" },
      { label: "Author", name: "author" },
    ],
    [
      { label: "Genre", name: "genre" },
      { label: "Format", name: "format" },
    ],
    [
      { label: "ISBN", name: "isbn" },
      { label: "Language", name: "language" },
    ],
    [
      { label: "Publisher", name: "publisher" },
      { label: "Publication Date", name: "publicationDate", type: "date" },
    ],
    [
      { label: "Price ($)", name: "price", type: "number" },
      { label: "Discount (%)", name: "discount", type: "number" },
    ],
    [
      { label: "Quantity", name: "quantity", type: "number" },
    ],
  ];

  return (
    <div className="min-h-screen bg-[#F1F2EE] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#435058] p-6 text-white">
          <h2 className="text-2xl font-bold">Add New Book</h2>
          <p className="text-sm opacity-80">Enter book details to add to inventory</p>
        </div>
        
        <div className="p-6">
          {formFields.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap gap-4 mb-4">
              {row.map(({ label, name, type = "text" }) => (
                <div key={name} className="flex-1 min-w-[240px]">
                  <label className="block text-[#435058] font-medium mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#DCF763] focus:border-transparent"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
          
          <div className="mb-6">
            <label className="block text-[#435058] font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#DCF763] focus:border-transparent"
              rows="4"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-[#435058] font-medium mb-2">Book Cover Image</label>
            <div className="flex items-start gap-6 flex-wrap">
              <div className="flex-1 min-w-[240px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white"
                />
                <p className="mt-1 text-sm text-[#848C8E]">Recommended: JPG or PNG, 300×450 pixels</p>
              </div>
              
              {previewUrl && (
                <div className="w-32 h-48 bg-gray-100 rounded-md overflow-hidden border border-gray-300">
                  <img 
                    src="/api/placeholder/200/300" 
                    alt="Book cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 bg-[#F1F2EE] text-[#435058] font-medium rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-[#DCF763] text-[#435058] font-bold rounded-md hover:bg-opacity-90 flex gap-2 items-center"
            >
              <span>Add Book</span>
            </button>
          </div>
        </div>
        
        {message && (
          <div className={`p-4 text-center ${message.includes("success") ? "bg-green-100 text-green-800" : message === "Processing..." ? "bg-blue-100 text-blue-800" : "bg-red-100 text-[#F97300]"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBooks;
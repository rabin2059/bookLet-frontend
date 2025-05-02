import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../api/axios";
import images from "../../assets/assets";

const AdminBook = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await localStorage.getItem("token");
        const res = await apiClient.get("/bookcrud/getallbooks", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        console.log("Fetched data:", res.data);

        // Check if res.data is an array
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          console.log("Unexpected data format:", res.data);
          setBooks([]);
        }
      } catch (err) {
        console.log("Failed to fetch books:", err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books</h1>
        <button
          onClick={() => navigate("/admin/books/addBooks")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </div>
      <div className="overflow-x-auto">
        {books.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-t text-gray-400 border-b">
                <th className="text-left px-4 py-2 font-normal">Id</th>
                <th className="text-left px-4 py-2 font-normal">Title</th>
                <th className="text-left px-4 py-2 font-normal">Author</th>
                <th className="text-left px-4 py-2 font-normal">Genre</th>
                <th className="text-left px-4 py-2 font-normal">Price</th>
                <th className="text-left px-4 py-2 font-normal">Quantity</th>
                <th className="text-left px-4 py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.bookId} className="border-b">
                  <td className="px-4 py-2 font-semibold">#{index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={book.imageUrl ? book.imageUrl : images.user_icon}
                      alt={book.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    {book.title}
                  </td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2 text-gray-500/90">{book.genre}</td>
                  <td className="px-4 py-2">Rs.{book.price}</td>
                  <td className="px-4 py-2 text-gray-500/90">{book.quantity}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/admin/books/view/${book.bookId}`)}
                      className="text-web-primary bg-web-secondary p-1 px-4 rounded-md font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/books/edit/${book.bookId}`)}
                      className="text-web-secondary bg-web-primary p-1 px-5 rounded-md font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-6">No books found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminBook;

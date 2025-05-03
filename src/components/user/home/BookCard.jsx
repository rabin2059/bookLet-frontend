import React, { useEffect, useState } from "react";
import { Heart as HeartIcon, Heart as HeartFilled, Star } from "lucide-react";
import images from "../../../assets/assets";
import apiClient from "../../../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const [wish, setWish] = useState(false);
  // const getWishq
  const checkWish = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookId = book.bookId;
      console.log(bookId);
      const { data } = await apiClient.get(`/book/checkWishlist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      if (data.status) {
        setWish(true);
      }
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  const addWish = async () => {
    try {
      const BookId = book.bookId;
      const token = localStorage.getItem("token");
      const { data } = await apiClient.post(
        "/book/addWishlist",
        { BookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.statusCode == 200) {
        toast.success("Bookmarked Successfully");
        checkWish();
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeWish = async () => {
    try {
      const BookId = book.bookId;
      const token = localStorage.getItem("token");
      const { data } = await apiClient.put(
        `/book/remove/${BookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setWish(false);
      if (data.statusCode == 200) {
        toast.success("Removed from Wishlist");
        checkWish();
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    checkWish();
  }, []);

  return (
    <Link
      to={`/bookDetails/${book.bookId}`}
      className="flex flex-col w-[255px] pb-8"
    >
      {/* Book Cover with Heart Icon */}
      <div className="relative mb-2">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-[386px] object-cover rounded-md"
        />
        <div className="absolute top-2 right-2 rounded-full  bg-web-background p-2">
          {wish ? (
            <button onClick={removeWish}>
              <HeartFilled className="text-red-500 fill-red-500 " />
            </button>
          ) : (
            <button onClick={addWish}>
              <HeartIcon />
            </button>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-row justify-between items-center gap-2 mb-1">
        <div className="flex items-center justify-center bg-web-primary border border-gray-500 rounded-full p-1 h-6 w-14">
          <Star className="h-4" />
          <span className="text-xs font-bold ml-0.5">4.5</span>
        </div>
        <span className="text-gray-500 text-sm">140 Reviews</span>
      </div>

      {/* Author */}
      <div className="text-xs text-gray-500 mb-1">By {book.author}</div>

      {/* Title */}
      <h3 className="font-bold text-base mb-1">{book.title}</h3>

      {/* Price */}
      <div className="mb-2">
        <div className="text-xs text-gray-500">Rs {book.price} mrp</div>
        <div className="flex justify-between items-center">
          <span className="font-bold">
            Rs {book.price - (book.discount * book.price) / 100}
          </span>
          <span className="text-orange-500 font-bold">
            {book.discount}% Off
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="bg-gray-600 text-xl font-semibold text-white py-2 px-4 rounded-md flex items-center justify-center gap-2">
        Add To Cart
        <img className="h-[28px]" src={images.addtoCart} alt="" />
      </button>
    </Link>
  );
};

export default BookCard;

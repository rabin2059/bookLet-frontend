import React, { useContext, useEffect, useState } from "react";
import { Heart as HeartIcon, Heart as HeartFilled, Star } from "lucide-react";
import images from "../../../assets/assets";
import apiClient from "../../../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const DealCard = ({ book }) => {
  const [wish, setWish] = useState(false);
  const { addToCart, fetchWishlist, setWishlist } = useContext(AppContext);

  const token = localStorage.getItem("token");
  const bookId = book.bookId;
  const checkWish = async () => {
    try {
      console.log(bookId);
      const { data } = await apiClient.get(`/book/checkWishlist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      if (data.status) {
        setWish(true);
      } else {
        setWish(false);
      }
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  const addCart = async () => {
    try {
      const data = {
        bookId,
        quantity: 1,
      };
      addToCart(data);
    } catch (error) {}
  };

  const addWish = async () => {
    try {
      const { data } = await apiClient.post(
        "/book/addWishlist",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.statusCode == 200) {
        toast.success("Bookmarked Successfully");
        await checkWish();
        fetchWishlist();
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeWish = async () => {
    try {
      const { data } = await apiClient.put(
        `/book/remove/${bookId}`,
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
        setWishlist((prev) => prev.filter((b) => b.bookId !== bookId));
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
    <div className="bg-[#435058]/10 rounded-3xl px-[23px] py-[42px]">
      <div className="flex flex-row pb-8">
        <div className="relative mr-2">
          <Link to={`/bookDetails/${book.bookId}`}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-[310px] w-[203px] object-cover rounded-xl"
            />
          </Link>
          <div className="absolute top-2 right-2 rounded-full h-10 bg-web-background p-2">
            {wish ? (
              <button onClick={removeWish}>
                <HeartFilled className="text-red-500 fill-red-500" />
              </button>
            ) : (
              <button onClick={addWish}>
                <HeartIcon />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="mt-4">
            {/* Author */}
            <div className="text-xs text-gray-800 font-thin mb-1">By {book.author}</div>

            {/* Title */}
            <Link to={`/bookDetails/${book.bookId}`}>
              <h3 className="font-bold text-base mb-1 w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                {book.title}
              </h3>
            </Link>

            {/* Price */}
            <div className="mb-2">
              <div className="text-xs text-gray-500 line-through">
                Rs {book.price} mrp
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">
                  Rs {book.price - (book.discount * book.price) / 100}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-row items-center gap-2 mb-1">
              <div className="flex items-center justify-center bg-web-primary border border-gray-500 rounded-full p-1 h-6 w-14">
                <Star className="h-4" />
                <span className="text-xs font-bold ml-0.5">4.5</span>
              </div>
              <span className="text-gray-500 text-sm">140 Reviews</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addCart}
            className="bg-gray-600 text-xl font-semibold text-white py-2 px-4 rounded-full flex items-center justify-center gap-2"
          >
            Add To Cart
            <img className="h-[28px]" src={images.addtoCart} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;

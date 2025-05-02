import React from "react";
import { Heart, Star } from "lucide-react";
import images from "../../../assets/assets";

const BookCard = ({ book }) => {
  return (
    <div className="flex flex-col w-[255px]">
      {/* Book Cover with Heart Icon */}
      <div className="relative mb-2">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-[386px] object-cover rounded-md"
        />
        <button className="absolute top-2 right-2 rounded-full p-1">
          <Heart />
        </button>
      </div>

      {/* Rating */}
      <div className="flex flex-row justify-between items-center gap-2 mb-1">
        <div className="flex items-center justify-center bg-web-primary border border-gray-500 rounded-full p-1 h-6 w-14">
          <Star className="h-4"/>
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
            Rs{" "}
            {book.price - (book.discount * book.price) / 100}
          </span>
          <span className="text-orange-500 font-bold">{book.discount}% Off</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="bg-gray-600 text-xl font-semibold text-white py-2 px-4 rounded-md flex items-center justify-center gap-2">
        Add To Cart
        <img className="h-[28px]" src={images.addtoCart} alt="" />
      </button>
    </div>
  );
};

export default BookCard;

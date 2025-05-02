import React from 'react';
import { Star } from 'lucide-react';

const BookCard = ({ 
  title, 
  author, 
  coverImage, 
  rating, 
  reviewCount, 
  originalPrice, 
  discountedPrice, 
  discountPercentage, 
  onAddToCart 
}) => {
  return (
    <div className="max-w-xs rounded-lg bg-black text-white overflow-hidden shadow-md">
      {/* Book Cover Image */}
      <div className="relative">
        <img 
          src={coverImage || "/api/placeholder/200/300"} 
          alt={`${title} cover`} 
          className="w-full object-cover"
        />
        {/* Author Name Overlay */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded-md px-2 py-1">
          <p className="text-sm font-medium">{author}</p>
        </div>
      </div>
      
      {/* Book Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center bg-yellow-400 text-black rounded-md px-1">
            <Star size={16} fill="currentColor" className="text-black" />
            <span className="text-sm font-medium ml-1">{rating}</span>
          </div>
          <span className="text-sm text-gray-300">{reviewCount} Reviews</span>
        </div>
        
        {/* Price */}
        <div className="mb-3">
          <div className="text-xs text-gray-400">By {author}</div>
          <div className="text-sm font-medium">Title of Book</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm line-through">Rs {originalPrice.toFixed(2)} mrp</span>
            <span className="font-bold">Rs {discountedPrice.toFixed(2)}</span>
            {discountPercentage && (
              <span className="text-green-500 text-sm">{discountPercentage}% Off</span>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={onAddToCart}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

// Example usage with default export
export default BookCard;

// Example of how to use this component in another file:
// import BookCard from './path/to/BookCard';
// 
// function BookList() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       <BookCard
//         title="In The Garden of Fugitives"
//         author="Ceridwen Dovey"
//         coverImage="/path/to/cover.jpg"
//         rating={4.5}
//         reviewCount={140}
//         originalPrice={250.00}
//         discountedPrice={150.00}
//         discountPercentage={50}
//         onAddToCart={() => console.log("Added to cart")}
//       />
//       {/* More book cards... */}
//     </div>
//   );
// }
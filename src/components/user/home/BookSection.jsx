import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import apiClient from '../../../api/axios';

const BookSection = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const { data } = await apiClient.get('/book/all');

      // Sort by latest createdAt and take first 4
      const sortedBooks = data.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      setBooks(sortedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-wrap justify-start gap-6 px-10">
    {books.map((book) => (
      <BookCard
        key={book.bookId}
        title={book.title}
        author={book.author}
        coverImage={book.imageUrl !== 'string' ? book.imageUrl : '/fallback.jpg'}
        rating={4.5}
        reviewCount={Math.floor(Math.random() * 200)}
        originalPrice={book.price}
        discountedPrice={
          book.discount > 0
            ? book.price - (book.price * book.discount) / 100
            : book.price
        }
        discountPercentage={book.discount}
        onAddToCart={() => console.log('Added to cart:', book.bookId)}
      />
    ))}
  </div>
  
  );
};

export default BookSection;

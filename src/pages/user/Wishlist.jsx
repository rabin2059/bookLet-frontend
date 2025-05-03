import React, { useEffect, useState } from 'react'
import apiClient from '../../api/axios';
import Loading from '../../components/basic components/Loading';
import BookCard from '../../components/user/home/BookCard';

const Wishlist = () => {
    const [books, setBooks] = useState("");
    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await apiClient.get("/book/getWishlist", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data.data);
            setBooks(data.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

  return books? (
    <div className='px-24'>
        <h1 className='font-semibold text-3xl py-4 '>Your Wishlist</h1>

<div className='flex flex-wrap justify-start gap-6'>
        {books.map((book) => (
            <BookCard key={book.bookId} book={book} />
        ))}
        </div>
    </div>
  ):
    <Loading/>
}

export default Wishlist

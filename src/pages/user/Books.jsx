import React, { useState, useContext } from "react";
import FilteringSection from "../../components/user/book list/FilterSection";
import Loading from "../../components/basic components/Loading";
import BookCard from "../../components/user/home/BookCard";
import { AppContext } from "../../context/AppContext";

const BookList = () => {
  const [selectedGenres, setSelectedGenres] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);

  const { allBooks } = useContext(AppContext) || { allBooks: [] };

  return allBooks ? (
    <div className="px-24 bg-web-background">
      <div className="flex flex-row justify-between">
        <FilteringSection
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
        />
        <div>
            <div className="text-3xl font-bold">
                Books
            </div>
            <hr />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-7">
            {allBooks.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default BookList;

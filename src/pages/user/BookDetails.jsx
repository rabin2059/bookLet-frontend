import React from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const bookId = useParams();
  return (
    <div>
      <h1>{bookId}</h1>
    </div>
  );
};

export default BookDetails;

import { createContext, useEffect, useState } from "react";
import apiClient from "../api/axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allBooks, setAllBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await apiClient.get("/book/getWishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      setWishlist(data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setShowSignIn(true);
      } else {
        console.error("Error fetching books:", error);
      }
    }
  };

  const fetchBooks = async () => {
    try {
      const { data } = await apiClient.get("/book/all");

      const sortedBooks = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAllBooks(sortedBooks);
    } catch (error) {
      if (error.response?.status === 401) {
        setShowSignIn(true);
      } else {
        console.error("Error fetching books:", error);
      }
    }
  };

  const addToCart = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await apiClient.post("/addToCart/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.statusCode == 200) {
        toast.success("Added to Cart");
        getCart();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setShowSignIn(true);
      }
    }
  };

  const updateCartQuantity = (bookId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.bookId === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await apiClient.get("/addToCart/getcartitems", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (data.statusCode != 200) {
        toast.error("Failed to fetch data");
      }
      console.log(data.data)

      setCart(data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setShowSignIn(true);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
    getCart();
    fetchWishlist();
  }, []);

  const value = {
    allBooks,
    cart,
    wishlist,
    setWishlist,
    getCart,
    addToCart,
    fetchWishlist,
    updateCartQuantity,
    showSignIn,
    setShowSignIn
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

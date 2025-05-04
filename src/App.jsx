import { ToastContainer } from "react-toastify";
import React from "react";
import { Routes, Route, useMatch, useLocation } from "react-router-dom";
import NavBar from "./components/user/NavBar";
import Home from "./pages/user/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Admin from "./pages/admin/Admin";
import AdminBook from "./pages/admin/AdminBook";
import AddBooks from "./pages/admin/AddBooks";
import EditBooks from "./pages/admin/EditBooks";
import BookDetail from "./pages/admin/BookDetails";
import Wishlist from "./pages/user/wishlist";
import BookList from "./pages/user/Books";
import Cart from "./pages/user/Cart";
import Banner from "./pages/admin/Banner";
import Footer from "./components/user/Footer";

const App = () => {
  const isAdminRoute = useMatch("/admin/*");
  const location = useLocation();
  const role = localStorage.getItem("role");
  if (role === "Admin" && !location.pathname.startsWith("/admin")) {
    window.location.href = "/admin";
    return null;
  }
  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/bookDetails/:bookId" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<AdminBook />} />
          <Route path="/admin/orders" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<AdminDashboard />} />
          <Route path="/admin/staff" element={<AdminDashboard />} />
          <Route path="/admin/banners" element={<Banner />} />
          <Route path="/admin/reports" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
          <Route path="/admin/books/addBooks" element={<AddBooks />} />
          <Route path="/admin/books/edit/:bookId" element={<EditBooks />} />
          <Route path="/admin/books/view/:bookId" element={<BookDetail />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;

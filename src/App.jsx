import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { Routes, Route, useMatch, useLocation } from "react-router-dom";
import NavBar from "./components/user/NavBar";
import Home from "./pages/user/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Admin from "./pages/admin/Admin";
import AdminBook from "./pages/admin/AdminBook";
import AddBooks from "./pages/admin/AddBooks";
import EditBooks from "./pages/admin/EditBooks";

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
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<AdminBook />} />
          <Route path="/admin/orders" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<AdminDashboard />} />
          <Route path="/admin/staff" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
          <Route path="/admin/books/addBooks" element={<AddBooks />} />
          <Route path="/admin/books/edit/:bookId" element={<EditBooks />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

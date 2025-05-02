import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/AdminSideBar";
import HeaderSection from "../../components/admin/HeaderSection";

const Admin = () => {
  return (
    <div className="text-default min-h-screen bg-white flex">
      <div className="sticky top-0 h-screen md:w-64 w-16 bg-web-third border-r border-gray-500">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <HeaderSection />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;

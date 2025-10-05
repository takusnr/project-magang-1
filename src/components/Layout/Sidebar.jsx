import { useSidebar } from "./SidebarContext";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { IoCubeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineWorkHistory } from "react-icons/md";

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const activeClass =
    "flex items-center px-3 py-2 rounded-lg bg-gray-100 text-(--color-middle) font-semibold";
  const inactiveClass =
    "flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100";

  return (
    <div
      className={`bg-gray-50 fixed h-full px-4 shadow-xl transition-all duration-300 ${
        isCollapsed ? "w-23" : "w-64"
      }`}
    >
      {/* Tombol menu */}
      <div className="flex justify-start mt-4 ms-3">
        <IoMdMenu
          className="w-7 h-7 text-gray-700 cursor-pointer"
          onClick={toggleSidebar} // ✅ panggil fungsi dari context
        />
      </div>

      {/* Logo */}
      {!isCollapsed && (
        <img src="/src/assets/icon-sidebar.png" alt="" className="w-full mt-3 ms-8" />
      )}

      <div className={`${isCollapsed ? "hidden" : "my-2 mb-4 pt-20"}`}>
        <h1 className="text-2x font-bold">MAIN MENU</h1>
      </div>

      <ul className="mt-3 space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <RxDashboard className="w-6 h-6 mr-2" />
            {!isCollapsed && "Dashboard"}
          </NavLink>
        </li>
      </ul>

      {!isCollapsed && (
        <div className="my-2 mb-4">
          <h1 className="text-2x font-bold">MASTER DATA</h1>
        </div>
      )}
      <ul className="mt-3 space-y-2">
        <li>
          <NavLink
            to="/barang"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <IoCubeOutline className="w-6 h-6 mr-2" />
            {!isCollapsed && "Data Barang"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pengguna"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <FaRegUser className="w-6 h-6 mr-2" />
            {!isCollapsed && "Data Pengguna"}
          </NavLink>
        </li>
      </ul>

      {!isCollapsed && (
        <div className="my-2 mb-4">
          <h1 className="text-2x font-bold">REPORTING</h1>
        </div>
      )}
      <ul className="mt-3 space-y-2">
        <li>
          <NavLink
            to="/laporan"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <TbReportAnalytics className="w-6 h-6 mr-2" />
            {!isCollapsed && "Laporan Barang"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/riwayat"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <MdOutlineWorkHistory className="w-6 h-6 mr-2" />
            {!isCollapsed && "Riwayat Aktifitas"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

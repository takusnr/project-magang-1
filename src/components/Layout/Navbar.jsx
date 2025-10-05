import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { IoMdClose, IoIosLogOut } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../AuthPages/UserContext";
import { useSidebar } from '../Layout/SidebarContext';

const Navbar = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Fungsi pencarian halaman
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();

    const pages = {
      barang: "/barang",
      dashboard: "/dashboard",
      laporan: "/laporan",
      pengguna: "/pengguna",
      riwayat: "/riwayat",
    }

    if (pages[query]) {
      navigate(pages[query]);
      setSearchQuery("");
    } else {
      alert("Halaman tidak ditemukan!");
    }
  }

  // Fungsi logout
  const handleLogout = () => {
    setUser(null);              // hapus user dari Context
    localStorage.removeItem("user"); // hapus dari localStorage
    navigate("/login");
  }

  const { isCollapsed } = useSidebar();

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-30" : "ml-0"}`}>
      <div className="h-15 w-full bg-white border-b border-gray-200 flex pl-0 md:pl-64 justify-between">
        {/* Search Bar */}
        <div className="border-gray-300 bg-gray-100 flex rounded-lg my-3 ml-10">
          <form onSubmit={handleSearch} className="flex items-center">
            <button type="submit" className="ml-3 text-2xl">
              <CiSearch />
            </button>
            <input
              type="text"
              placeholder="Search halaman..."
              className="ml-2 min-w-xs bg-gray-100 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Notifikasi */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="text-2xl ml-130 relative flex items-center text-center hover:text-gray-900 focus:outline-none"
          >
            <GoBell />
            <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-3.5"></div>
          </button>
          {isNotifOpen && (
            <div className="absolute top-0 right-0 mt-13 z-20 w-80 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 font-medium text-gray-700 rounded-t-lg bg-gray-50">
                Notifikasi
                <button onClick={() => setIsNotifOpen(false)}>
                  <IoMdClose />
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                <a href="#" className="relative flex px-4 py-3 hover:bg-gray-100">
                  <div className="shrink-0">
                    <img
                      src="/notif/pria.jpg"
                      alt=""
                      className="rounded-full w-11 h-11"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-green-600 border border-white rounded-full"></div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5">
                      <span className="font-semibold text-gray-900">
                        Brandon Salim
                      </span>{" "}
                      minta izin untuk mengubah
                      <span className="font-semibold text-gray-900">
                        {" "}
                        Barang No Seri #20460
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">5 min ago</div>
                  </div>
                </a>
                <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                  <div className="shrink-0">
                    <img
                      src="/notif/wanita.jpg"
                      alt=""
                      className="rounded-full w-11 h-11"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-red-600 border border-white rounded-full"></div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5">
                      <span className="font-semibold text-gray-900">
                        Bonnie Livingston
                      </span>{" "}
                      minta izin untuk mengubah
                      <span className="font-semibold text-gray-900">
                        {" "}
                        Barang No Seri #20465
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">1 hr ago</div>
                  </div>
                </a>
              </div>
              <a
                href="#"
                className="block py-2 text-sm font-medium text-center text-gray-900 rounded-lg bg-gray-50 border border-gray-300 m-2 hover:bg-gray-100"
              >
                <div className="inline-flex items-center">View All</div>
              </a>
            </div>
          )}
        </div>

        {/* Profil Pengguna */}
        <div className="relative flex items-center mr-20">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-(--color-middle) md:me-0 focus:ring-4 focus:ring-gray-100"
          >
            <img
              src="/profil/avatar-1.jpg"
              alt="avatar-1"
              className="rounded-full w-8 h-8 me-2"
            />
            {user?.name || "Guest"}
            <IoChevronDown className="w-4 h-4 ms-3" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-0 left-0 mt-13 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
              <div className="px-4 py-3 text-sm text-gray-900 text-center">
                <div className="font-medium">{user?.role || "User"}</div>
                <div>{user?.email || "Tidak ada email"}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 ">
                <li>
                  <NavLink
                    to="/profil"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <CgProfile className="w-4 h-4 me-1.5 mt-0.5" />
                    Edit Profil
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <IoIosLogOut className="w-4 h-4 me-1.5 mt-0.5" />
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
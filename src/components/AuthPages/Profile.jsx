import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { UserContext } from "../AuthPages/UserContext";
import { useSidebar } from '../Layout/SidebarContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    password: user?.password || "",
  });

  // Ubah data saat mengetik
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Klik Edit
  const handleEdit = () => setIsEditing(true);

  // Klik Cancel → balik ke dashboard
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
      password: user?.password || "",
    });
    navigate("/"); // arahkan ke halaman dashboard
  };

  // Simpan perubahan profil
  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditing(false);
    alert("Profil berhasil diperbarui!");
  }

  const { isCollapsed } = useSidebar();

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-40" : "ml-0"}`}>
      <div className="md:ml-64">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900">Edit Profil</h3>
        </div>

        <form className="p-4" onSubmit={handleSave}>
          <div className="flex items-start gap-8">
            {/* FOTO + BUTTON */}
            <div className="flex flex-col items-start gap-6">
              <div className="relative">
                <img
                  src="/profil/avatar-1.jpg"
                  alt="Foto Profil"
                  className="rounded-full w-80 h-80 object-cover"
                />
                <div className="absolute bottom-2 right-2 flex items-center justify-center w-20 h-20 bg-gray-100 border border-white rounded-full shadow">
                  <MdEdit
                    className="text-4xl text-blue-600 cursor-pointer"
                    onClick={handleEdit}
                    title="Edit Profil"
                  />
                </div>
              </div>

              {/* Tombol di bawah foto */}
              <div className="flex items-center justify-start space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

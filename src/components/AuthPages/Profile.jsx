import { useState, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { UserContext } from "../AuthPages/UserContext";
import { useSidebar } from '../Layout/SidebarContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const fileInputRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)

  const [imagePreview, setImagePreview] = useState(
    user?.photo || "/profil/avatar-1.jpg"
  )

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    password: user?.password || "",
    photo: user?.photo || "",
  })

  // Auto masuk mode edit saat user mengetik / klik input
  const activateEdit = () => {
    if (!isEditing) setIsEditing(true);
  }

  const handleChange = (e) => {
    activateEdit()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Klik tombol pensil → buka file input
  const handleEditPhoto = () => {
    fileInputRef.current.click()
  }

  // Jika user pilih foto baru
  const handlePhotoChange = (e) => {
    activateEdit();

    const file = e.target.files[0]
    if (!file) return

    const previewURL = URL.createObjectURL(file)
    setImagePreview(previewURL)

    setFormData({
      ...formData,
      photo: previewURL,
    })
  }

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
      password: user?.password || "",
      photo: user?.photo || "",
    });
    setImagePreview(user?.photo || "/profil/avatar-1.jpg")

    navigate("/")
  }

  const handleSave = (e) => {
    e.preventDefault()

    setUser(formData)
    localStorage.setItem("user", JSON.stringify(formData))

    setIsEditing(false)
    alert("Profil berhasil diperbarui!")
  }

  const { isCollapsed } = useSidebar()

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-40" : "ml-0"}`}>
      <div className="md:ml-64">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900">Edit Profil</h3>
        </div>

        <form className="p-4" onSubmit={handleSave}>
          <div className="flex items-start gap-8">

            {/* FOTO + BUTTON */}
            <div className="flex flex-col justify-center items-center md:items-start gap-6">
              <div className="ml-80 relative md:m-0">
                <img
                  src={imagePreview}
                  alt="Foto Profil"
                  className="rounded-full w-80 h-80 object-cover"
                />

                {/* Tombol pensil */}
                <div className="absolute bottom-2 right-2 flex items-center justify-center w-20 h-20 bg-gray-100 border border-white rounded-full shadow">
                  <MdEdit
                    className="text-4xl text-blue-600 cursor-pointer"
                    onClick={handleEditPhoto}
                    title="Ganti Foto Profil"
                  />
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              {/* Tombol Save & Cancel */}
              <div className="flex justify-center items-center space-x-4 mt-90 ml-100 md:justify-start md:m-0">
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
            <div className="grid grid-flow-col grid-rows-4 mt-85 -ml-100 md:flex md:flex-col md:m-0 gap-4 flex-1">

              <div>
                <label className="flex flex-col md:block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onClick={activateEdit}
                  onChange={handleChange}
                  disabled={false}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2`}
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
                  onClick={activateEdit}
                  onChange={handleChange}
                  disabled={false}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2`}
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
                  onClick={activateEdit}
                  onChange={handleChange}
                  disabled={false}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2`}
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
                  onClick={activateEdit}
                  onChange={handleChange}
                  disabled={false}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2`}
                />
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
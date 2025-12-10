import { CiSearch } from 'react-icons/ci';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoAdd, IoChevronDown } from "react-icons/io5";
import { FaFileCsv, FaFilePdf, FaFileExcel } from "react-icons/fa6";
// Asset Fungsi
import { useState, useEffect, useRef } from "react";
import { useSidebar } from '../Layout/SidebarContext';
// simple-datatables (sama seperti di halaman Barang)
import { DataTable } from 'simple-datatables';
import "simple-datatables/dist/style.css";
// Export
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

const Pengguna = () => {
  // Data dummy pengguna
  const [dataPengguna, setDataPengguna] = useState([
    { id: "1", nama: "John Doe", username: "johndoe", email: "johndoe@example.com", skpd: "Diskominfo", role: "Admin", status: "Aktif" },
    { id: "2", nama: "Jane Doe", username: "janedoe", email: "janedoe@example.com", skpd: "Diskominfo", role: "Developer", status: "Aktif" },
    { id: "3", nama: "Thariq", username: "thariq", email: "thariq@example.com", skpd: "Diskominfo", role: "QA Testing", status: "Tidak Aktif" },
    { id: "4", nama: "Sahel", username: "sahel", email: "sahel@example.com", skpd: "Diskominfo", role: "Back End Developer", status: "Suspend" },
    { id: "5", nama: "Sophia", username: "nakugirl", email: "phia@example.com", skpd: "Diskominfo", role: "Front End Developer", status: "Aktif" }
  ]);

  // DataTable ref & init (sama seperti sebelumnya)
  const tableRef = useRef(null);
  useEffect(() => {
    if (tableRef.current) {
      const datatable = new DataTable(tableRef.current, {
        searchable: false,
        perPageSelect: false,
        paging: false
      });
      return () => datatable.destroy();
    }
  }, []);

  // Search & pagination (sama pola dengan halaman Barang)
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = dataPengguna.filter(item =>
    item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.skpd.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Modal Add / Edit states + form state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    nama: "",
    username: "",
    email: "",
    skpd: "",
    role: "",
    status: ""
  });
  const [editData, setEditData] = useState(null);

  // Open Add modal: auto-generate id (mirip autoNoSeri sebelumnya)
  const openAdd = () => {
    const autoId = Date.now().toString();
    setNewUser({
      id: autoId,
      nama: "",
      username: "",
      email: "",
      skpd: "",
      role: "",
      status: ""
    });
    setIsAddOpen(true);
  };

  // Handle add user (sama pola tambah barang)
  function handleAddUser(e) {
    e.preventDefault();
    if (!newUser.nama || !newUser.username) {
      alert("Nama dan Username wajib diisi!");
      return;
    }
    setDataPengguna(prev => [
      ...prev,
      { ...newUser }
    ]);
    setIsAddOpen(false);
    setNewUser({
      id: "",
      nama: "",
      username: "",
      email: "",
      skpd: "",
      role: "",
      status: ""
    });
  }

  // Handle update user
  function handleUpdateUser(e) {
    e.preventDefault();
    setDataPengguna(prev =>
      prev.map(u => u.id === editData.id ? editData : u)
    );
    setIsEditOpen(false);
  }

  // Delete user
  function deleteUser(id) {
    if (confirm("Yakin ingin hapus pengguna ini?")) {
      setDataPengguna(prev => prev.filter(u => u.id !== id));
    }
  }

  // State Dropdown Ekspor Data
  const [isExportOpen, setIsExportOpen] = useState(false);
  // Export CSV (menggunakan tableRef seperti sebelumnya)
  const handleExportCSV = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets["Sheet1"]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data-pengguna.csv");
  };

  // Export Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataPengguna);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Data Pengguna");
    XLSX.writeFile(wb, "data-pengguna.xlsx");
  };

  // Export PDF
  const handleExportPDF = () => {
    if (!dataPengguna || dataPengguna.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }
    const doc = new jsPDF("l", "mm", "a4");
    doc.text("Data Pengguna", 14, 10);
    const head = [["ID", "Nama", "Username", "Email", "SKPD", "Role", "Status"]];
    const body = dataPengguna.map(u => [u.id, u.nama, u.username, u.email, u.skpd, u.role, u.status]);
    autoTable(doc, {
      head,
      body,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save("data-pengguna.pdf");
  }

  const { isCollapsed } = useSidebar()

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-30" : "ml-0"}`}>
      <div className='p-5 mt-7 ml-55 md:ml-64'>
        <div className='flex flex-col md:flex-row md:justify-between gap-3 mb-4'>
          {/* kiri: show / search (sama style) */}
          <div className='flex items-center-safe gap-4'>
            <p>Show</p>
            <select onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} value={itemsPerPage} className='py-1 rounded-lg bg-gray-300'>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
            <p>entries</p>
            <div className='flex items-center-safe border rounded-lg border-gray-300 py-1'>
              <CiSearch className='text-2xl ml-3 text-gray-500' />
              <input
                type="text"
                placeholder='Cari berdasarkan nama, username, email, role...'
                className='ml-2 min-w-sm'
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                value={searchQuery}
              />
            </div>
          </div>

          {/* kanan: tambah + export */}
          <div className='flex gap-3 m-4'>
            <button className='flex items-center rounded-lg pr-2 text-white bg-(--color-middle) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-middle) active:bg-(--color-middle)'
              onClick={openAdd}>
              <IoAdd className='text-xl m-1' />
              Tambah Pengguna
            </button>

            <div className='relative inline-block'>
              <button className='flex pl-2 pb-2 justify-end-safe items-center-safe rounded-lg text-white bg-(--color-middle) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-middle) active:bg-(--color-middle)'
                onClick={() => setIsExportOpen(!isExportOpen)}>
                Export as <IoChevronDown className='text-xl m-1' />
              </button>
              {isExportOpen && (
              <div className='mt-2 absolute top-full right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-28'>
                <ul className='py-2 text-sm text-gray-700'>
                  <li><button onClick={handleExportCSV} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFileCsv className='w-4 h-4 me-1.5'/>CSV</button></li>
                  <li><button onClick={handleExportExcel} className='inline-flex w-full px-3.5 py-2 hover:bg-gray-100'><FaFileExcel className='w-4 h-4 me-1.5'/>Excel</button></li>
                  <li><button onClick={handleExportPDF} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFilePdf className='w-4 h-4 me-1.5'/>PDF</button></li>
                </ul>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto w-full p-5'>
          <table id='default-table' ref={tableRef} className='min-w-[600px] dataTable w-full border-collapse text-sm'>
            <thead className='bg-white px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap'>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Email</th>
                <th>SKPD</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {currentItems.map((u, idx) => (
                <tr key={u.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td>{u.id}</td>
                  <td>{u.nama}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.skpd}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={`
                      px-4 py-1 rounded-full text-sm font-medium
                      ${u.status === "Aktif" ? "bg-green-100 text-green-600" : ""}
                      ${u.status === "Tidak Aktif" ? "bg-yellow-100 text-yellow-600" : ""}
                      ${u.status === "Suspend" ? "bg-red-100 text-red-600" : ""}
                    `}>{u.status}</span>
                  </td>
                  <td>
                    <button onClick={() => { setEditData(u); setIsEditOpen(true); }}><FaRegEdit className='text-blue-800 text-2xl mr-3' /></button>
                    <button onClick={() => deleteUser(u.id)}><RiDeleteBin5Line className='text-red-800 text-2xl' /></button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">Data tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (sama style seperti aslinya) */}
        <div className='flex justify-center items-center gap-2'>
          <button disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className='text-gray-500 p-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-(--color-bold) active:bg-(--color-bold) active:text-white'
          >Sebelumnya</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-(--color-middle) text-white" : "bg-gray-300"}`}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className='text-gray-500 p-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-(--color-bold) active:bg-(--color-bold) active:text-white'
          >Selanjutnya</button>
        </div>

        {/* Modal Tambah Pengguna (layout mirror modal Tambah Barang supaya CSS tidak berubah) */}
        {isAddOpen && (
          <div id='modalPengguna' className='bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow-sm'>
                <div className='flex p-4 md:p-5 '>
                  <h3 className='text-xl font-semibold text-gray-900'>Tambah Pengguna</h3>
                </div>
                <form onSubmit={handleAddUser} className='p-4 md:p-5'>
                  <div className='grid gap-4 mb-4 grid-cols-2'>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>ID</label>
                      <input type="text" readOnly value={newUser.id}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Nama</label>
                      <input type="text" value={newUser.nama}
                        onChange={(e) => setNewUser({ ...newUser, nama: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Username</label>
                      <input type="text" value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Email</label>
                      <input type="email" value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>SKPD</label>
                      <input type="text" value={newUser.skpd}
                        onChange={(e) => setNewUser({ ...newUser, skpd: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Role</label>
                      <input type="text" value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Status</label>
                      <select value={newUser.status}
                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2'>
                        <option value="">Pilih Status</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                        <option value="Suspend">Suspend</option>
                      </select>
                    </div>

                    <div className='col-span-2 flex items-center justify-end space-x-4'>
                      <button type="button" className='text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5' onClick={() => setIsAddOpen(false)}>Cancel</button>
                      <button type="submit" className='text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5'>Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit Pengguna */}
        {isEditOpen && editData && (
          <div id='editPengguna' className='bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow-sm'>
                <div className='flex p-4 md:p-5 '>
                  <h3 className='text-xl font-semibold text-gray-900'>Edit Pengguna</h3>
                </div>
                <form onSubmit={handleUpdateUser} className='p-4 md:p-5'>
                  <div className='grid gap-4 mb-4 grid-cols-2'>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>ID</label>
                      <input type="text" readOnly value={editData.id}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Nama</label>
                      <input type="text" value={editData.nama}
                        onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Username</label>
                      <input type="text" value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Email</label>
                      <input type="email" value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>SKPD</label>
                      <input type="text" value={editData.skpd}
                        onChange={(e) => setEditData({ ...editData, skpd: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Role</label>
                      <input type="text" value={editData.role}
                        onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2' />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-normal text-gray-900'>Status</label>
                      <select value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2'>
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                        <option value="Suspend">Suspend</option>
                      </select>
                    </div>

                    <div className='col-span-2 flex items-center justify-end space-x-4'>
                      <button type="button" className='text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5' onClick={() => setIsEditOpen(false)}>Cancel</button>
                      <button type="submit" className='text-white bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5'>Change</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Pengguna;

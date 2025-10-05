// Asset Icon
import { CiSearch } from 'react-icons/ci';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoAdd, IoChevronDown } from "react-icons/io5";
import { FaFileCsv, FaFilePdf, FaFileExcel } from "react-icons/fa6";
// Asset Fungsi
import { useState, useEffect, useRef} from "react";
import { useSidebar } from '../Layout/SidebarContext';
// Template Tabel
import { DataTable } from 'simple-datatables';
import "simple-datatables/dist/style.css";
// Fungsi Ekspor
import jsPDF from "jspdf"; // PDF
import autoTable from 'jspdf-autotable'; // Download PDF
import * as XLSX from "xlsx"; // Excel
import { saveAs } from 'file-saver'; // Download File

const Barang = () => {
  // Data dummy
  const [dataBarang, setDataBarang] = useState([
    {
      tanggal: "2022-05-15",
      noSeri: "#20460",
      gambar: "/images/topi.jpg",
      nama: "Topi",
      jumlahStok: 10,
      jumlahFis: 9,
      selisih: 1,
      lokasi: "Lab 1",
      kategori: "Pakaian",
      status: "Baik"
    },
    {
      tanggal: "2022-08-13",
      noSeri: "#20461",
      gambar: "/images/komputer.jpg",
      nama: "Laptop",
      jumlahStok: 10,
      jumlahFis: 9,
      selisih: 1,
      lokasi: "Ruang 7",
      kategori: "Perangkat Komputer",
      status: "Baik"
    },
    {
      tanggal: "2012-03-02",
      noSeri: "#20462",
      gambar: "/images/monitor.jpg",
      nama: "Monitor",
      jumlahStok: 10,
      jumlahFis: 9,
      selisih: 1,
      lokasi: "Ruang Persediaan",
      kategori: "Perangkat Komputer",
      status: "Baik"
    },
    {
      tanggal: "2022-09-11",
      noSeri: "#20463",
      gambar: "/images/lampu.jpg",
      nama: "Lampu",
      jumlahStok: 10,
      jumlahFis: 9,
      selisih: 1,
      lokasi: "Lab 6",
      kategori: "Perangkat Pelengkap",
      status: "Rusak"
    },
    {
      tanggal: "2004-02-06",
      noSeri: "#20464",
      gambar: "/images/keyboard.jpg",
      nama: "Keyboard",
      jumlahStok: 10,
      jumlahFis: 9,
      selisih: 1,
      lokasi: "Ruang 10",
      kategori: "Perangkat Komputer",
      status: "Pemeliharaan"
    }
  ])

  // State tampilan table dari simple-datatable
  const tableRef = useRef(null);
  // Fungsi untuk mematikan fitur filter dan pagination dari simple-datatable
  useEffect(() => {
    if (tableRef.current) {
      const datatable = new DataTable(tableRef.current, {
        searchable: false,
        perPageSelect: false,
        paging: false
      })
      return () => datatable.destroy();
    }
  }, [])

  // State untuk Search
  const [searchQuery, setSearchQuery] = useState("");
  // Fungsi untuk filter barang di bagian search
    const filteredBarang = dataBarang.filter(item =>
      item.noSeri.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Pagination (ambil data sesuai halaman aktif)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBarang.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBarang.length / itemsPerPage)

  // State Modal Tambah Barang
  const [isAddOpen, setIsAddOpen] = useState(false);
  // Tambah state untuk form tambah barang
  const [newBarang, setNewBarang] = useState({
      tanggal: "",
      noSeri: "",
      gambar: "",
      nama: "",
      jumlahStok: "",
      jumlahFis: "",
      selisih: "",
      lokasi: "",
      kategori: "",
      status: ""
  });
  // Handle submit tambah barang
  function handleAddBarang(e) {
    e.preventDefault();
    // Cek kalau No Seri kosong
    if (!newBarang.noSeri || !newBarang.nama) {
      alert("No. Seri dan Nama Barang wajib diisi!");
      return;
    }
  // Hitung selisih otomatis
  const jumlahStok = Number(newBarang.jumlahStok) || 0;
  const jumlahFis = Number(newBarang.jumlahFis) || 0;
  const selisih = jumlahStok - jumlahFis;

  // Tambahkan data baru ke list barang
  setDataBarang((prev) => [
    ...prev,
    {
      ...newBarang,
      jumlahStok,
      jumlahFis,
      selisih,
    }
  ])
    // Tutup modal + reset form
    setIsAddOpen(false);
    setNewBarang({
      tanggal: "",
      noSeri: "",
      gambar: "",
      nama: "",
      jumlahStok: "",
      jumlahFis: "",
      selisih: "",
      lokasi: "",
      kategori: "",
      status: ""
      });
  }

  
  // State Modal Edit Barang
  const [isEditOpen, setIsEditOpen] = useState(false);
  // State menyimpan data barang yang mau diedit
  const [editData, setEditData] = useState(null);
  // Fungsi update data
  function handleUpdateBarang(e) {
    e.preventDefault();
    setDataBarang((prev) => 
      prev.map((item) => 
        item.noSeri === editData.noSeri ? {
            ...editData,
            selisih: Number(editData.jumlahStok) - Number(editData.jumlahFis),
          }
        : item
    )
  );
  setIsEditOpen(false);
  }

  // State Dropdown Ekspor Data
  const [isExportOpen, setIsExportOpen] = useState(false);
  // Export ke CSV
  const handleExportCSV = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets["Sheet1"]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data-barang.csv");
  }
  // Export ke Excel
  const handleExportExcel = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], {type: "application/octet-stream"}), "data-barang.xlsx");
  }
  // Export ke PDF
  const handleExportPDF = () => {
    if (!dataBarang || dataBarang.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }

  const doc = new jsPDF("l", "mm", "a4"); // l = landscape
  doc.text("Data Barang", 14, 10);

  // Header tabel
  const head = [["Tanggal", "No Seri", "Gambar", "Barang", "Jumlah Stok", "Jumlah Fisik", "Selisih", "Lokasi", "Kategori", "Status",]];

  // Data isi tabel
  const body = dataBarang.map((item) => [
    item.tanggal,
    item.noSeri,
    item.gambar,
    item.nama,
    item.jumlahStok,
    item.jumlahFis,
    item.selisih,
    item.lokasi,
    item.kategori,
    item.status,
  ]);

  // Generate tabel ke PDF
  autoTable(doc, {
    head,
    body,
    startY: 20,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  doc.save("data-barang.pdf");
}

  // Fungsi hapus barang
  function deleteBarang(noSeri) {
    if (confirm("Yakin ingin hapus barang ini?")) {
      setDataBarang(dataBarang.filter((item) => item.noSeri !== noSeri));
    }
  }

  const { isCollapsed } = useSidebar();

  return (
    // Tampilan Halaman Daftar Barang
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-30" : "ml-0"}`}>
      <div className='p-5 mt-7 ml-0 md:ml-64'>
        <div className='flex justify-between items-center'>
          {/* Bagian Kanan (Tampilan Pcs Data & Search Bar) */}
          <div className='flex items-center-safe gap-4'>
            <p>Show</p>
            <select onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage} className='py-1 rounded-lg bg-gray-300'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            </select>
            <p>entries</p>
            <div className='flex items-center-safe border rounded-lg border-gray-300 py-1'>
              <CiSearch className='text-2xl ml-3 text-gray-500'></CiSearch>
              <input 
                type="text" 
                placeholder='Cari berdasarkan barang, kategori atau nomor..' 
                className='ml-2 min-w-sm'
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
            {/* Bagian Kiri (Tombol Modal Tambah Barang dan Edit Barang) */}
            <div className='flex gap-3'>
              <button className='flex items-center rounded-lg pr-2 text-white bg-(--color-middle) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-middle) active:bg-(--color-middle)'
                    onClick={() => {
                      // Auto generate No Seri
                      const autoNoSeri = "#" + Date.now();
                      setNewBarang({
                        tanggal: "",
                        noSeri: autoNoSeri,
                        gambar: "",
                        nama: "",
                        jumlahStok: "",
                        jumlahFis: "",
                        selisih: "",
                        lokasi: "",
                        kategori: "",
                        status: ""
                      });
                      setIsAddOpen(true);
                    }}
                >
              <IoAdd className='text-xl m-1' />
              Tambah Barang
            </button>
            {/* Tombol Dropdown Ekspor Data */}
              <div className='relative inline-block'>
              <button className='flex pl-2 justify-end-safe items-center-safe rounded-lg text-white bg-(--color-middle) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-middle) active:bg-(--color-middle)'
                      onClick={() => setIsExportOpen(!isExportOpen)}>
                Export as <IoChevronDown className='text-xl m-1' />
              </button>
              {/* Dropdown Ekspor Data */}
              {isExportOpen && (
                <div id='exportData' className='mt-2 absolute top-full right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-28'>
                  <ul className='py-2 text-sm text-gray-700'>
                    <li>
                      <button onClick={handleExportCSV} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFileCsv className='w-4 h-4 me-1.5'/>CSV</button>
                    </li>
                    <li>
                      <button onClick={handleExportExcel} className='inline-flex w-full px-3.5 py-2 hover:bg-gray-100'><FaFileExcel className='w-4 h-4 me-1.5'/>Excel</button>
                    </li>
                    <li>
                      <button onClick={handleExportPDF} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFilePdf className='w-4 h-4 me-1.5'/>PDF</button>
                    </li>
                  </ul>
                </div>
              )}
              </div>
            </div>
        </div>

        {/* Tabel Data Barang */}
        <div className='p-5'>
          <table id='default-table' ref={tableRef} className='dataTable w-full border-collapse text-sm'>
            <thead className='bg-white px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap'>
              <tr>
              <th>Tanggal</th>
              <th>No. Seri</th>
              <th>Gambar</th>
              <th>Barang</th>
              <th>Kategori</th>
              <th>Jumlah Stok</th>
              <th>Jumlah Fisik</th>
              <th>Selisih</th>
              <th>Lokasi Barang</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody 
              className='w-full'>
              {currentItems.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td>{item.tanggal}</td>
                  <td>{item.noSeri}</td>
                  <td className='flex items-center gap-3'>
                    {item.gambar ? (
                      <img src={item.gambar} alt={item.nama} className='w-10 h-10 rounded-lg object-cover' />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                        No Img
                      </div>
                    )}
                  </td>
                  <td>{item.nama}</td>
                  <td>{item.kategori}</td>
                  <td>{item.jumlahStok}</td>
                  <td>{item.jumlahFis}</td>
                  <td>{item.selisih}</td>
                  <td>{item.lokasi}</td>
                  <td><span className={`
                      px-4 py-1 rounded-full text-sm font-medium
                      ${item.status === "Baik" && "bg-green-100 text-green-600"} 
                      ${item.status === "Pemeliharaan" && "bg-yellow-100 text-yellow-600"} 
                      ${item.status === "Rusak" && "bg-red-100 text-red-600"}`}>{item.status}</span>
                  </td>
                  <td>
                    <button onClick={() => {setEditData(item); setIsEditOpen(true);}}><FaRegEdit className='text-blue-800 text-2xl mr-3' /></button>
                    <button onClick={() => deleteBarang(item.noSeri)}><RiDeleteBin5Line className='text-red-800 text-2xl' /></button>
                  </td>
                </tr>
              ))}
            {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">
                    Data tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tombol Pagination */}
        <div className='flex justify-center items-center gap-2'>
          <button disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className='text-gray-500 p-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-(--color-bold) active:bg-(--color-bold) active:text-white'
          >
            Sebelumnya
          </button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-(--color-middle) text-white" : "bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className='text-gray-500 p-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-(--color-bold) active:bg-(--color-bold) active:text-white'
        >
          Selanjutnya
        </button>
        </div>
        
        {/* Modal Tambah Barang */}
            {isAddOpen && (
            <div id='modalBarang' className='bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
              <div className='relative p-4 w-full max-w-md max-h-full'>
                {/* Isi Modal Tambah Barang */}
                <div className='relative bg-white rounded-lg shadow-sm'>
                  {/* Modal Header */}
                  <div className='flex p-4 md:p-5 '>
                    <h3 className='text-xl font-semibold text-gray-900'>Tambah Barang</h3>
                  </div>
                  {/* Modal Body */}
                  <form onSubmit={handleAddBarang} className='p-4 md:p-5'>
                    <div className='grid gap-4 mb-4 grid-cols-2'>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Tanggal</label>
                        <input 
                          type="date"
                          value={newBarang.tanggal ? new Date(newBarang.tanggal).toISOString().split("T")[0] : ""}
                          onChange={(e) => 
                            setNewBarang({...newBarang, tanggal: e.target.value})
                          }
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">No. Seri</label>
                        <input 
                          type="text"
                          value={newBarang.noSeri}
                          readOnly
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900'>Gambar</label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="add-gambar"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                          </label>
                            <input 
                              id="add-gambar" 
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setNewBarang({ ...newBarang, gambar: URL.createObjectURL(file)});
                                }
                              }} 
                              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer" />
                        </div>
                        {newBarang.gambar && (
                          <img 
                            src={newBarang.gambar} 
                            alt="Preview"
                            className='mt-2 w-20 h-20 object-cover rounded-lg'
                          />
                        )}
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Barang</label>
                        <input 
                          type="text" 
                          value={newBarang.nama}
                          onChange={(e) => setNewBarang({...newBarang, nama: e.target.value})} 
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' 
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Kategori</label>
                        <input
                          type='text'
                          value={newBarang.kategori}
                          onChange={(e) => setNewBarang({...newBarang, kategori: e.target.value})}  
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500'
                        >
                        </input>
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Jumlah Stok</label>
                        <input 
                          type="number" 
                          value={newBarang.jumlahStok}
                          onChange={(e) => {
                            const stok = Number(e.target.value) || 0;
                            const fisik = Number(newBarang.jumlahFis) || 0;
                            setNewBarang({
                              ...newBarang,
                              jumlahStok: stok,
                              selisih: stok - fisik
                            });
                          }} 
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' 
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Jumlah Fisik</label>
                        <input 
                          type="number" 
                          value={newBarang.jumlahFis}
                          onChange={(e) => {
                            const fisik = Number(e.target.value) || 0;
                            const stok = Number(newBarang.jumlahStok) || 0;
                            setNewBarang({
                              ...newBarang,
                              jumlahFis: fisik,
                              selisih: stok - fisik
                            });
                          }} 
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' 
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Selisih</label>
                        <input 
                          type="number" 
                          value={newBarang.selisih}
                          readOnly
                          onChange={(e) => setNewBarang({...newBarang, selisih: e.target.value})} 
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' 
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Lokasi Barang</label>
                        <input 
                          type="text" 
                          value={newBarang.lokasi}
                          onChange={(e) => setNewBarang({...newBarang, lokasi: e.target.value})} 
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' 
                        />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Status</label>
                        <select 
                          value={newBarang.status}
                          onChange={(e) => setNewBarang({...newBarang, status: e.target.value})} 
                          className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' 
                        >
                          <option selected>Pilih Status</option>
                          <option value="Baik">Baik</option>
                          <option value="Pemeliharaan">Pemeliharaan</option>
                          <option value="Rusak">Rusak</option>
                        </select>
                      </div>
                        <div className='col-span-2 flex items-center justify-end space-x-4'>
                          <button className='text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500'
                          onClick={() => setIsAddOpen(false)}>Cancel</button>
                          <button className='text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500'>Save</button>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            )}

            {/* Modal Edit Barang */}
            {isEditOpen && editData && (
              <div id='editBarang' className='bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
              <div className='relative p-4 w-full max-w-md max-h-full'>
                {/* Isi Modal Edit Barang */}
                <div className='relative bg-white rounded-lg shadow-sm'>
                  {/* Modal Header */}
                  <div className='flex p-4 md:p-5 '>
                    <h3 className='text-xl font-semibold text-gray-900'>Edit Barang</h3>
                  </div>
                  {/* Modal Body */}
                  <form onSubmit={handleUpdateBarang} className='p-4 md:p-5'>
                    <div className='grid gap-4 mb-4 grid-cols-2'>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Tanggal</label>
                        <input type="date"
                              value={editData.tanggal ? new Date(editData.tanggal).toISOString().split("T")[0] : ""}
                              onChange={(e) => 
                                setEditData({...editData, tanggal: e.target.value})
                              }
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500'></input>
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">No. Seri</label>
                        <input type="text" 
                              value={editData.noSeri}
                              onChange={(e) => 
                                setEditData({...editData, noSeri: e.target.value})
                              }
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900'>Gambar</label>
                        
                        <div className="items-center justify-center w-full">
                          <label
                            htmlFor="edit-gambar"
                            className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                          >
                          </label>
                            <input id="edit-gambar" 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      setEditData({ ...editData, gambar: URL.createObjectURL(file)});
                                }
                              }}
                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer" />
                              <p className="text-xs text-center text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div>
                        {editData.gambar && (
                          <img
                            src={editData.gambar}
                            alt="Preview"
                            className="mt-2 w-10 h-10 object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Nama Barang</label>
                        <input type="text" 
                              value={editData.nama}
                              onChange={(e) => 
                                setEditData({...editData, nama: e.target.value})
                              }
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Kategori</label>
                        <input type='text' 
                              value={editData.kategori}
                              onChange={(e) => 
                                setEditData({...editData, kategori: e.target.value})
                              }
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500'></input>
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Jumlah Stok</label>
                        <input type="number" 
                              value={editData.jumlahStok}
                              onChange={(e) => {
                                const stok = Number(e.target.value) || 0;
                                const fisik = Number(editData.jumlahFis) || 0;
                                setEditData({
                                  ...editData,
                                  jumlahStok: stok,
                                  selisih: stok - fisik
                                });
                              }}
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Jumlah Fisik</label>
                        <input type="number" 
                              value={editData.jumlahFis}
                              onChange={(e) => {
                                const fisik = Number(e.target.value) || 0;
                                const stok = Number(editData.jumlahStok) || 0;
                                setEditData({
                                  ...editData,
                                  jumlahFis: fisik,
                                  selisih: stok - fisik
                                });
                              }}
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Selisih</label>
                        <input type="number" 
                              value={editData.selisih}
                              readOnly
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Lokasi Barang</label>
                        <input type="text" 
                              value={editData.lokasi}
                              onChange={(e) => 
                                setEditData({...editData, lokasi: e.target.value})
                              }
                              className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' />
                      </div>
                      <div>
                        <label className='block mb-2 text-sm font-normal text-gray-900' htmlFor="">Status</label>
                        <select value={editData.status}
                                onChange={(e) => 
                                  setEditData({...editData, status: e.target.value})
                                }
                                className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:ring-blue-500 focus:border-blue-500' >
                          <option value="Baik">Baik</option>
                          <option value="Pemeliharaan">Pemeliharaan</option>
                          <option value="Rusak">Rusak</option>
                        </select>
                      </div>
                        <div className='col-span-2 flex items-center justify-end space-x-4'>
                          <button className='text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500'
                          onClick={() => setIsEditOpen(false)}>Cancel</button>
                          <button className='text-white bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-500'>Change</button>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            )}

      </div>
    </div>
  )
}

export default Barang
import { BsCalendarDate } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { CiSearch } from 'react-icons/ci';
import { useSidebar } from '../Layout/SidebarContext';
import { useState, useEffect, useRef } from "react";
import { DataTable } from 'simple-datatables';
import "simple-datatables/dist/style.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";

const Laporan = () => {
  const [dataLaporan] = useState([
    { tanggal: "2022-05-15", noSeri: "#20460", gambar: "/images/topi.jpg", nama: "Topi", jumlahStok: 10, jumlahFis: 9, selisih: 1, lokasi: "Lab 1", kategori: "Pakaian", status: "Baik" },
    { tanggal: "2022-08-13", noSeri: "#20461", gambar: "/images/komputer.jpg", nama: "Laptop", jumlahStok: 10, jumlahFis: 9, selisih: 1, lokasi: "Ruang 7", kategori: "Perangkat Komputer", status: "Baik" },
    { tanggal: "2012-03-02", noSeri: "#20462", gambar: "/images/monitor.jpg", nama: "Monitor", jumlahStok: 10, jumlahFis: 9, selisih: 1, lokasi: "Ruang Persediaan", kategori: "Perangkat Komputer", status: "Baik" },
    { tanggal: "2022-09-11", noSeri: "#20463", gambar: "/images/lampu.jpg", nama: "Lampu", jumlahStok: 10, jumlahFis: 9, selisih: 1, lokasi: "Lab 6", kategori: "Perangkat Pelengkap", status: "Rusak" },
    { tanggal: "2004-02-06", noSeri: "#20464", gambar: "/images/keyboard.jpg", nama: "Keyboard", jumlahStok: 10, jumlahFis: 9, selisih: 1, lokasi: "Ruang 10", kategori: "Perangkat Komputer", status: "Pemeliharaan" }
  ]);

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

  const [searchQuery, setSearchQuery] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);

  // 🔹 Date Range State
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Filter data berdasarkan tanggal & pencarian
  const filteredLaporan = dataLaporan.filter(item => {
    const matchesSearch =
      item.noSeri.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());

    const itemDate = new Date(item.tanggal);
    const isInRange =
      (!startDate || itemDate >= new Date(startDate)) &&
      (!endDate || itemDate <= new Date(endDate));

    return matchesSearch && isInRange;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLaporan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLaporan.length / itemsPerPage);

  // === Fungsi Export ===
  const handleExportCSV = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets["Sheet1"]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data-barang.csv");
  };
  const handleExportExcel = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "data-barang.xlsx");
  };
  const handleExportPDF = () => {
    if (!dataLaporan.length) return alert("Tidak ada data untuk diekspor.");
    const doc = new jsPDF("l", "mm", "a4");
    doc.text("Data Laporan Barang", 14, 10);
    const head = [["Tanggal", "No Seri", "Gambar", "Barang", "Kategori", "Jumlah Stok", "Jumlah Fisik", "Selisih", "Lokasi", "Status"]];
    const body = dataLaporan.map(item => [
      item.tanggal, item.noSeri, item.gambar, item.nama, item.kategori,
      item.jumlahStok, item.jumlahFis, item.selisih, item.lokasi, item.status
    ]);
    autoTable(doc, { head, body, startY: 20 });
    doc.save("data-laporan.pdf");
  };

  const { isCollapsed } = useSidebar();

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-30" : "ml-0"}`}>
      <div className='p-5 ml-55 md:ml-64'>
        <h1 className="text-center text-3xl -mb-3">Laporan</h1>

        <div className='flex flex-col md:flex-row md:justify-between gap-3 mb-4'>
          <div className='flex items-center gap-4'>
            <p>Show</p>
            <select onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage} className='py-1 rounded-lg bg-gray-300'>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <p>entries</p>

            {/* 🔹 Filter Pencarian */}
            <div className='flex items-center border rounded-lg border-gray-300 py-1'>
              <CiSearch className='text-2xl ml-3 text-gray-500' />
              <input
                type="text"
                placeholder='Cari berdasarkan barang, kategori atau nomor..'
                className='ml-2 min-w-sm focus:outline-none'
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>

            {/* Dropdown Export */}
              <div className='relative inline-block md:hidden md:ml-auto'>
                <button
                  className='flex pl-2 pr-2 pb-1 whitespace-nowrap justify-center items-center rounded-lg text-white bg-(--color-middle)'
                  onClick={() => setIsExportOpen(!isExportOpen)}
                >
                  Export as <IoChevronDown className='text-xl ml-1' />
                </button>
                {isExportOpen && (
                  <div className='mt-2 absolute top-full right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-28'>
                    <ul className='py-2 text-sm text-gray-700'>
                      <li><button onClick={handleExportCSV} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFileCsv className='w-4 h-4 me-1.5' />CSV</button></li>
                      <li><button onClick={handleExportExcel} className='inline-flex w-full px-3.5 py-2 hover:bg-gray-100'><FaFileExcel className='w-4 h-4 me-1.5' />Excel</button></li>
                      <li><button onClick={handleExportPDF} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFilePdf className='w-4 h-4 me-1.5' />PDF</button></li>
                    </ul>
                  </div>
                )}
              </div>

            {/* 🔹 Tombol Pilih Tanggal di baris baru dan tengah */}
            <div className="flex w-full -ml-160 md:-ml-0 md:justify-center pt-30">
              <div className="relative inline-flex self-start">
                <button
                  onClick={() => setIsDateOpen(!isDateOpen)}
                  className="inline-flex items-center text-(--color-middle) font-medium hover:underline"
                >
                  <BsCalendarDate className="w-5 h-5 mr-2" />
                  {startDate ? startDate : "Start"} <p className="ms-1"> - {endDate ? endDate : "End"} </p>
                  <IoChevronDown className="w-3 h-3 ms-2" />
                </button>

                {/* 🔹 Dropdown tanggal */}
                {isDateOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600 p-3">
                    <div className="flex items-center justify-center gap-3">
                      <div className="relative">
                        <BsCalendarDate className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
                          placeholder="Start date"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="relative">
                        <BsCalendarDate className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
                          placeholder="End date"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Dropdown Export */}
              <div className='hidden relative md:inline-block md:ml-auto'>
                <button
                  className='flex pl-2 pr-2 pb-1 whitespace-nowrap justify-center items-center rounded-lg text-white bg-(--color-middle)'
                  onClick={() => setIsExportOpen(!isExportOpen)}
                >
                  Export as <IoChevronDown className='text-xl ml-1' />
                </button>
                {isExportOpen && (
                  <div className='mt-2 absolute top-5 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-28'>
                    <ul className='py-2 text-sm text-gray-700'>
                      <li><button onClick={handleExportCSV} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFileCsv className='w-4 h-4 me-1.5' />CSV</button></li>
                      <li><button onClick={handleExportExcel} className='inline-flex w-full px-3.5 py-2 hover:bg-gray-100'><FaFileExcel className='w-4 h-4 me-1.5' />Excel</button></li>
                      <li><button onClick={handleExportPDF} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'><FaFilePdf className='w-4 h-4 me-1.5' />PDF</button></li>
                    </ul>
                  </div>
                )}
              </div>
        </div>

        {/* 🔹 Tabel */}
        <div className='p-5 overflow-x-auto w-full'>
          <table id='default-table' ref={tableRef} className='min-w-[600px] w-full border-collapse text-sm'>
            <thead className='bg-white'>
              <tr>
                <th>Tanggal</th><th>No. Seri</th><th>Gambar</th><th>Barang</th><th>Kategori</th>
                <th>Jumlah Stok</th><th>Jumlah Fisik</th><th>Selisih</th><th>Lokasi Barang</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td>{item.tanggal}</td>
                  <td>{item.noSeri}</td>
                  <td><img src={item.gambar} alt={item.nama} className='w-10 h-10 rounded-lg object-cover' /></td>
                  <td>{item.nama}</td>
                  <td>{item.kategori}</td>
                  <td>{item.jumlahStok}</td>
                  <td>{item.jumlahFis}</td>
                  <td>{item.selisih}</td>
                  <td>{item.lokasi}</td>
                  <td>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium
                      ${item.status === "Baik" && "bg-green-100 text-green-600"}
                      ${item.status === "Pemeliharaan" && "bg-yellow-100 text-yellow-600"}
                      ${item.status === "Rusak" && "bg-red-100 text-red-600"}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr><td colSpan="10" className="text-center text-gray-500 py-4">Data tidak ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex justify-center items-center gap-2'>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className='text-gray-500 p-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-(--color-bold) active:bg-(--color-bold) active:text-white'>Sebelumnya</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-(--color-middle) text-white" : "bg-gray-300"}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className='text-gray-500 p-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-(--color-bold) active:bg-(--color-bold) active:text-white'>Selanjutnya</button>
        </div>
      </div>
    </div>
  );
};

export default Laporan;

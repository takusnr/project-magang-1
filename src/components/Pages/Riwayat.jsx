import { useSidebar } from '../Layout/SidebarContext';
import { CiSearch } from 'react-icons/ci';
import { useState } from "react";

const Riwayat = () => {

  const { isCollapsed } = useSidebar();

  const [dataRiwayat] = useState([
    { desk: "Menambahkan barang Printer", nama: "Andi", role: "Admin", tanggal: "2024-11-01" },
    { desk: "Mengedit barang Laptop", nama: "Budi", role: "User", tanggal: "2024-11-02" },
    { desk: "Menghapus barang Proyektor", nama: "Citra", role: "Admin", tanggal: "2024-11-03" },
    { desk: "Mengekspor data ke PDF", nama: "Dewi", role: "User", tanggal: "2024-11-04" },
    { desk: "Menambahkan barang Printer", nama: "Andi", role: "Admin", tanggal: "2024-11-01" },
    { desk: "Mengedit barang Laptop", nama: "Budi", role: "User", tanggal: "2024-11-02" },
    { desk: "Menghapus barang Proyektor", nama: "Citra", role: "Admin", tanggal: "2024-11-03" },
    { desk: "Mengekspor data ke PDF", nama: "Dewi", role: "User", tanggal: "2024-11-04" },
    { desk: "Menambahkan barang Printer", nama: "Andi", role: "Admin", tanggal: "2024-11-01" },
    { desk: "Mengedit barang Laptop", nama: "Budi", role: "User", tanggal: "2024-11-02" },
    { desk: "Menghapus barang Proyektor", nama: "Citra", role: "Admin", tanggal: "2024-11-03" },
    { desk: "Mengekspor data ke PDF", nama: "Dewi", role: "User", tanggal: "2024-11-04" },
    { desk: "Menambahkan barang Printer", nama: "Andi", role: "Admin", tanggal: "2024-11-01" },
    { desk: "Mengedit barang Laptop", nama: "Budi", role: "User", tanggal: "2024-11-02" },
    { desk: "Menghapus barang Proyektor", nama: "Citra", role: "Admin", tanggal: "2024-11-03" },
    { desk: "Mengekspor data ke PDF", nama: "Dewi", role: "User", tanggal: "2024-11-04" },
    { desk: "Menambahkan barang Printer", nama: "Andi", role: "Admin", tanggal: "2024-11-01" },
    { desk: "Mengedit barang Laptop", nama: "Budi", role: "User", tanggal: "2024-11-02" },
    { desk: "Menghapus barang Proyektor", nama: "Citra", role: "Admin", tanggal: "2024-11-03" },
    { desk: "Mengekspor data ke PDF", nama: "Dewi", role: "User", tanggal: "2024-11-04" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredRiwayat = dataRiwayat.filter(item =>
    item.desk.toLowerCase().includes(searchQuery.toLowerCase())||
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())||
    item.tanggal.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-40" : "ml-0"}`}>
      <div className='md:ml-64 ml-60'>
        <div className='flex p-4'>
          <h3 className='text-xl font-semibold text-gray-900' >Riwayat Aktifitas</h3>
        </div>
        <div className='px-4'>
          <div className='flex items-center border border-gray-300 py-1 px-2 w-80 md:w-96 rounded-md'>
                <CiSearch className='text-2xl text-gray-500'></CiSearch>
                    <input 
                      type="text" 
                      placeholder='Cari berdasarkan deskripsi, nama atau tanggal..' 
                      className='ml-2 w-full outline-none'
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                    />
          </div>
        </div>
        <div className='p-4 grid gap-4 mb-4'>
          <div className='overflow-y-auto max-h-full border border-gray-300'>
        <table className='table-fixed w-full border border-gray-300'>
          <thead>
            <tr>
              <th className='px-4 py-2 border border-gray-300 text-center'>Deskripsi</th>
              <th className='px-4 py-2 border border-gray-300 text-center'>Nama</th>
              <th className='px-4 py-2 border border-gray-300 text-center'>Role</th>
              <th className='px-4 py-2 border border-gray-300 text-center'>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiwayat.map((r, idx) => (
            <tr key={idx} >
              <td className='border border-gray-300 px-4 py-2'>{r.desk}</td>
              <td className='border border-gray-300 px-4 py-2'>{r.nama}</td>
              <td className='border border-gray-300 px-4 py-2'>{r.role}</td>
              <td className='border border-gray-300 px-4 py-2'>{r.tanggal}</td>
            </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Riwayat

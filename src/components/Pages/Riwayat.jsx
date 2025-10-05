import { useSidebar } from '../Layout/SidebarContext';

const Riwayat = () => {

  const { isCollapsed } = useSidebar();

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-40" : "ml-0"}`}>
      <div className='md:ml-64'>
        <div className='flex p-4'>
          <h3 className='text-xl font-semibold text-gray-900'>Riwayat Aktifitas</h3>
        </div>
        <div className='p-4 grid gap-4 mb-4'>
          <div className='overflow-y-auto max-h-full border border-gray-300'>
        <table className='table-fixed w-full border border-gray-500'>
          <thead>
            <tr>
              <th className='px-4 py-2 border border-gray-500 text-left'>Deskripsi</th>
              <th className='px-4 py-2 border border-gray-500 text-left'>Nama</th>
              <th className='px-4 py-2 border border-gray-500 text-left'>Role</th>
              <th className='px-4 py-2 border border-gray-500 text-left'>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menambahkan barang Printer</td>
              <td className='border border-gray-500 px-4 py-2'>Andi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-01</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengedit barang Laptop</td>
              <td className='border border-gray-500 px-4 py-2'>Budi</td>
              <td className='border border-gray-500 px-4 py-2'>User</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-02</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menghapus barang Proyektor</td>
              <td className='border border-gray-500 px-4 py-2'>Citra</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-03</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengekspor data ke PDF</td>
              <td className='border border-gray-500 px-4 py-2'>Dewi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-04</td>
            </tr>
              <tr>
              <td className='border border-gray-500 px-4 py-2'>Menambahkan barang Printer</td>
              <td className='border border-gray-500 px-4 py-2'>Andi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-01</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengedit barang Laptop</td>
              <td className='border border-gray-500 px-4 py-2'>Budi</td>
              <td className='border border-gray-500 px-4 py-2'>User</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-02</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menghapus barang Proyektor</td>
              <td className='border border-gray-500 px-4 py-2'>Citra</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-03</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengekspor data ke PDF</td>
              <td className='border border-gray-500 px-4 py-2'>Dewi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-04</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menambahkan barang Printer</td>
              <td className='border border-gray-500 px-4 py-2'>Andi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-01</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengedit barang Laptop</td>
              <td className='border border-gray-500 px-4 py-2'>Budi</td>
              <td className='border border-gray-500 px-4 py-2'>User</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-02</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menghapus barang Proyektor</td>
              <td className='border border-gray-500 px-4 py-2'>Citra</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-03</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengekspor data ke PDF</td>
              <td className='border border-gray-500 px-4 py-2'>Dewi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-04</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menambahkan barang Printer</td>
              <td className='border border-gray-500 px-4 py-2'>Andi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-01</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengedit barang Laptop</td>
              <td className='border border-gray-500 px-4 py-2'>Budi</td>
              <td className='border border-gray-500 px-4 py-2'>User</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-02</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menghapus barang Proyektor</td>
              <td className='border border-gray-500 px-4 py-2'>Citra</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-03</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengekspor data ke PDF</td>
              <td className='border border-gray-500 px-4 py-2'>Dewi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-04</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menambahkan barang Printer</td>
              <td className='border border-gray-500 px-4 py-2'>Andi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-01</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengedit barang Laptop</td>
              <td className='border border-gray-500 px-4 py-2'>Budi</td>
              <td className='border border-gray-500 px-4 py-2'>User</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-02</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menghapus barang Proyektor</td>
              <td className='border border-gray-500 px-4 py-2'>Citra</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-03</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengekspor data ke PDF</td>
              <td className='border border-gray-500 px-4 py-2'>Dewi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-04</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menambahkan barang Printer</td>
              <td className='border border-gray-500 px-4 py-2'>Andi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-01</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengedit barang Laptop</td>
              <td className='border border-gray-500 px-4 py-2'>Budi</td>
              <td className='border border-gray-500 px-4 py-2'>User</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-02</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Menghapus barang Proyektor</td>
              <td className='border border-gray-500 px-4 py-2'>Citra</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-03</td>
            </tr>
            <tr>
              <td className='border border-gray-500 px-4 py-2'>Mengekspor data ke PDF</td>
              <td className='border border-gray-500 px-4 py-2'>Dewi</td>
              <td className='border border-gray-500 px-4 py-2'>Admin</td>
              <td className='border border-gray-500 px-4 py-2'>2024-11-04</td>
            </tr>
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Riwayat

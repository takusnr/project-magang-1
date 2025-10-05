import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/AuthPages/Login';
import MainLayout from './components/Layout/MainLayout';
import Barang from './components/Pages/Barang';
import Dashboard from './components/Pages/Dashboard';
import Laporan from './components/Pages/Laporan';
import Pengguna from './components/Pages/Pengguna';
import Profile from './components/AuthPages/Profile';
import Riwayat from './components/Pages/Riwayat';

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/barang" element={<Barang />}></Route>
        <Route path="/pengguna" element={<Pengguna />}></Route>
        <Route path="/laporan" element={<Laporan />}></Route>
        <Route path="/riwayat" element={<Riwayat />}></Route>
        <Route path="/profil" element={<Profile />}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App

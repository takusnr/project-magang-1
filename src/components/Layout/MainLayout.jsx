import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
      
    </div>
  )
}

export default MainLayout

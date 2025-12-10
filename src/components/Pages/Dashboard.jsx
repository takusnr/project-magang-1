import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { FaBoxes } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { TbCubePlus } from "react-icons/tb";
import { IoChevronForward } from "react-icons/io5";
import Chart from "react-apexcharts";
import { useSidebar } from "../Layout/SidebarContext";

const Dashboard = () => {
    const optionsBar = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#607AD3", "#7C7C7C"],
    }

    const seriesBar = [
        {
            name: "Stock In",
            data: [620, 580, 640, 630, 600, 640, 610, 640, 620, 620, 620, 523],
        },
        {
            name: "Stock Out",
            data: [410, 400, 420, 390, 410, 420, 410, 420, 410, 410, 410, 400],
        },
    ]

    const optionsPie = {
        chart: {
            type: "pie",
        },
        labels: ["Stock In", "Stock Out"],
        colors: ["#607AD3", "#7C7C7C"],
        legend: {
            position: "bottom",
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%"; // tampil persentase
            },
        },
        tooltip: {
        y: {
        formatter: function (val) {
            return val; // tampil angka asli
                },
            },
        },
    }

    const seriesPie = [7543, 4911]

    const { isCollapsed } = useSidebar()

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "-ml-40" : "ml-0"}`}>
        <div className='bg-gray-50 md:ml-64 p-4'>
            {/* Header */}
            <div className="grid grid-cols-1 ml-85 md:m-0 md:grid-cols-3 gap-8 pb-4">
                <div className="max-w-sm p-6 flex bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                    <FaBoxes className="w-20 h-20 p-4 text-gray-500 mr-8 bg-gray-200 rounded-sm" />
                    <a className="">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight">12454</h5>
                        <div className="flex items-center">
                            <p className="text-xl font-normal text-gray-700">Total Stok</p>
                            <p className="ms-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-800 bg-blue-200 rounded-2xl hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-100">
                                100%
                                <GoArrowUpRight className="text-blue-800 ml-1"/>
                            </p>
                        </div>
                    </a>
                </div>
                <div className="max-w-sm p-6 flex bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                    <TbCubePlus className="w-20 h-20 p-4 text-gray-500 mr-8 bg-gray-200 rounded-sm" />
                    <a className="">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight">8634</h5>
                        <div className="flex items-center">
                            <p className="text-xl font-normal text-gray-700">Stok Masuk</p>
                            <p className="ms-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-green-800 bg-green-200 rounded-2xl hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-100">
                                60%
                                <GoArrowUpRight className="text-green-800 ml-1"/>
                            </p>
                        </div>
                    </a>
                </div>
                <div className="max-w-sm p-6 flex bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                    <FaTruckFast className="w-20 h-20 p-4 text-gray-500 mr-8 bg-gray-200 rounded-sm" />
                    <a className="">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight">3820</h5>
                        <div className="flex items-center">
                            <p className="text-xl font-normal text-gray-700">Stok Keluar</p>
                            <p className="ms-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-800 bg-red-200 rounded-2xl hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-100">
                                39%
                                <GoArrowDownRight className="text-red-800 ml-1"/>
                            </p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Grafik */}
            <div className="grid grid-cols-1 ml-63 md:m-0 md:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex justify-between pb-4 mb-4">
                        <div className="flex items-center">
                            <div>
                                <h5 className="leading-none text-2xl font-bold text-gray-900 mb-4">Bar Statistic Stock Opname</h5>
                                <p className="text-sm font-normal text-gray-500">Total Stock is 12,4K</p>
                            </div>
                        </div>
                    </div>

                <Chart options={optionsBar} series={seriesBar} type="bar" height={320} />

                    <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div className="flex justify-end items-center pt-5">
                            <a
                            href="#"
                            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                            View Report
                            <IoChevronForward className="ms-2"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pie Chart */}
            <div className="">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex justify-between pb-4 mb-4">
                        <div className="flex items-center">
                            <div>
                                <h5 className="leading-none text-2xl font-bold text-gray-900 mb-4">Pie Chart Stock Opname</h5>
                                <p className="text-sm font-normal text-gray-500">Total Stock is 100%</p>
                            </div>
                        </div>
                    </div>

                <Chart options={optionsPie} series={seriesPie} type="pie" height={320} className="w-full h-80" />

                    <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div className="flex justify-end items-center pt-5">
                            <a
                            href="#"
                            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                            View Report
                            <IoChevronForward className="ms-2"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
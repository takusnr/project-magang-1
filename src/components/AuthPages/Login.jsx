import { useState, useContext } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext); // ✅ akses context
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Login dummy — nanti bisa diganti API
        if (email === "admin@gmail.com" && password === "54321") {
            const loggedUser = {
                name: "Robert Mcfall",
                email: "admin@gmail.com",
                role: "Admin",
                password: "54321",
            };

            // ✅ Simpan user ke context + localStorage
            setUser(loggedUser);
            localStorage.setItem("user", JSON.stringify(loggedUser));

            alert("Login berhasil!");
            navigate("/"); // arahkan ke beranda
        } else {
            alert("Email atau password salah!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Logo Diskominfo dan Aplikasi */}
            <div className="hidden md:flex md:w-1/2 justify-center items-center bg-blue-900">
                <img src="/src/assets/logo-diskominfo.svg" alt="logo-diskominfo-jabar" className="w-full h-20" />
                <div className="pb-70 border-4 border-white"></div>
                <img src="/src/assets/logo-magang.svg" alt="logo-magang" className="w-full h-20" />
            </div>

            {/* Form Login */}
            <div className="flex w-full md:w-1/2 justify-center items-center bg-white px-6">
                <form
                    className="w-full max-w-md p-8"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-lg font-bold">Hello!</h1>
                    <p className="text-base mb-10">Sign In to Get Started</p>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-base mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username/Email"
                            className="text-base border rounded-lg border-gray-300 p-3 w-full mb-4"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />

                        <label htmlFor="password" className="text-base mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Input your password account"
                                className="text-base border rounded-lg border-gray-300 p-3 w-full mb-4"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-5 pb-3 flex items-center"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-5 text-sm text-gray-600">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    className="accent-[#607AD3]"
                                />
                                <span>Remember Me</span>
                            </label>
                            <a className="hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="text-lg text-white bg-[#607AD3] hover:bg-[#37474F] p-3 rounded-lg transition-colors duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm

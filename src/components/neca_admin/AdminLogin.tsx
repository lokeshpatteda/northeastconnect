import { Loginimg, Necalogolight } from "@/assets/images/images";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    // 🔥 Handle Input Change (LIVE VALIDATION)
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        // Live validation
        setErrors({
            ...errors,
            [name]: value.trim() ? "" : `${name} is required`,
        });
    };

    // ✅ Handle Submit
    const handleSubmit = (e: any) => {
        e.preventDefault();

        let newErrors: any = {};

        if (!form.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        // If no errors → submit
        if (Object.keys(newErrors).length === 0) {
            console.log("Form Submitted:", form);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center 
        bg-[radial-gradient(circle_at_top_left,#facc15_0%,#0f172a_40%,#020617_100%)]">

            <div className="w-[950px] h-[540px] rounded-3xl overflow-hidden 
            border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl flex">

                {/* LEFT SIDE */}
                <div className="w-1/2 relative hidden md:block">
                    <img
                        src={Loginimg}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>

                    <div className="relative z-10 flex flex-col justify-center h-full px-10 text-white">
                        <h1 className="text-3xl font-bold mb-4">
                            Welcome to NECA Admin
                        </h1>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Access your dashboard securely and manage <br /> operations efficiently
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-10">
                    <div className="w-full max-w-sm">

                        <div className="flex justify-center mb-5">
                            <img src={Necalogolight} className="h-12" />
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-[2px] w-15 bg-gradient-to-r from-transparent to-gray-400"></div>

                            <div>
                                <h2 className="text-2xl font-semibold text-white whitespace-nowrap">
                                    Admin Login
                                </h2>
                                <p className="text-center text-gray-400 mb-6 text-sm">
                                    NECA dashboard
                                </p>
                            </div>

                            <div className="h-[2px] w-15 bg-gradient-to-l from-transparent to-gray-400"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* USERNAME */}
                            <div className="relative">
                                <label className="text-sm block text-left text-gray-300">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    className={`w-full mt-1 px-4 py-2.5 bg-white/10 border ${errors.username ? "border-red-500" : "border-white/20"
                                        } rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none`}
                                />
                                {errors.username && (
                                    <p className="absolute right-1 text-red-400 text-xs mt-1 ">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div className="relative">
                                <label className="text-sm block text-left text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`w-full mt-1 px-4 py-2.5 bg-white/10 border ${errors.password ? "border-red-500" : "border-white/20"
                                            } rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none`}
                                    />

                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                {errors.password && (
                                    <p className="absolute right-1 text-red-400 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* REMEMBER + FORGOT */}
                            <div className="flex items-center justify-between text-sm text-gray-300">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="accent-yellow-400 w-4 h-4 cursor-pointer"
                                    />
                                    Remember me
                                </label>

                                <span className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                                    Forgot password?
                                </span>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-center text-xs text-gray-500 mt-6">
                            © NECA Admin Panel
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
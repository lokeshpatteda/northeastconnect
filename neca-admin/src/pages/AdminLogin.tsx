import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/login_bg.jpg';
import logo from '../assets/necalogo-light.png';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (
            credentials.email === 'admin@neca.org' ||
            credentials.email === 'admin'
        ) {
            if (credentials.password === 'neca@2026') {
                localStorage.setItem('neca_admin_auth', 'true');
                navigate('/dashboard');
                return;
            }
        }

        setError('Invalid email or password');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500/90 via-black to-neutral-950 p-4 font-outfit">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[800px] flex flex-col md:flex-row rounded-[28px] overflow-hidden shadow-4xl border border-white/30 backdrop-blur-xl bg-white/5"
            >

                {/* LEFT SIDE */}
                <div className="hidden lg:block md:block md:w-1/2 relative min-h-[420px] ">
                    <img
                        src={bgImage}
                        alt="Welcome"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center text-center p-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Welcome to NECA  <span className="text-yellow-500">Admin</span>
                        </h1>

                        <p className="text-gray-300 text-sm max-w-xs">
                            Access your dashboard securely and manage operations efficiently with modern tools.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:w-1/2 p-10 bg-[#000000] flex flex-col justify-center">

                    {/* LOGO */}
                    <img src={logo} alt="NECA Logo" className="h-12 mb-6 mx-auto" />

                    <div className="text-center mb-6">

                        {/* TITLE WITH SMOOTH LINES */}
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-gray-500"></div>
                            <div>
                                <h2 className="text-white text-lg font-semibold whitespace-nowrap">
                                    Admin Login
                                </h2>
                                <p className="text-gray-400 text-xs">
                                    Operations admin space
                                </p>
                            </div>
                            <div className="h-[2px]  flex-1 bg-gradient-to-l from-transparent to-gray-500"></div>
                        </div>

                        {/* SUBTITLE (closer + aligned) */}


                    </div>

                    {/* FORM */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-gray-400 ml-1">User name</label>
                            <input
                                type="text"
                                placeholder="admin@neca.org"
                                className="w-full mt-1 bg-[#334155] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
                                value={credentials.email}
                                onChange={(e) =>
                                    setCredentials({ ...credentials, email: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className='mb-5'>
                            <label className="text-sm text-gray-400 ml-1">Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full bg-[#334155] border border-transparent rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
                                    value={credentials.password}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, password: e.target.value })
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>



                        {/* ERROR */}
                        {error && (
                            <p className="text-red-400 text-xs text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                {error}
                            </p>
                        )}

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="cursor-pointer mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-full font-semibold transition-all"
                        >
                            Login
                        </button>

                        {/* FOOTER */}
                        <p className="text-gray-500 text-xs text-center mt-6">
                            © NECA Admin Panel
                        </p>

                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
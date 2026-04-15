import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/neca-logo.png';
import bgImage from '../assets/partner.png';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Updated credentials to match the image's email field concept
        if (credentials.email === 'admin@neca.org' || credentials.email === 'admin') {
            if (credentials.password === 'neca@2026') {
                localStorage.setItem('neca_admin_auth', 'true');
                navigate('/dashboard');
                return;
            }
        }
        setError('Invalid email or password');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] p-4 font-outfit">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[1000px] flex flex-col md:flex-row bg-[#1e2533] rounded-[24px] overflow-hidden shadow-2xl border border-white/5"
            >
                {/* Left Side: Image & Welcome */}
                <div className="md:w-1/2 relative min-h-[400px]">
                    <img 
                        src={bgImage} 
                        alt="Welcome" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Welcome to <br /> <span className="text-yellow-400">NECA Admin</span>
                        </h1>
                        <p className="text-slate-200 text-lg max-w-sm leading-relaxed">
                            Access your dashboard securely and manage operations efficiently with modern tools.
                        </p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
                    <img src={logo} alt="NECA Logo" className="h-16 mb-8" />
                    
                    <div className="flex items-center gap-4 w-full mb-8">
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <h2 className="text-white text-xl font-bold whitespace-nowrap">Admin Login</h2>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>
                    <p className="text-slate-400 text-sm mb-8 -mt-6">Secure access to NECA dashboard</p>

                    <form onSubmit={handleLogin} className="w-full space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                            <input 
                                type="text" 
                                placeholder="admin@neca.org"
                                className="w-full bg-[#2a3447] border border-white/5 rounded-xl px-5 py-3.5 text-white outline-none focus:border-yellow-400/50 transition-all"
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    className="w-full bg-[#2a3447] border border-white/5 rounded-xl px-5 py-3.5 text-white outline-none focus:border-yellow-400/50 transition-all"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 border border-white/20 rounded bg-white/5 group-hover:border-yellow-400 transition-colors"></div>
                                <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-xs text-yellow-400 hover:underline">Forgot Password?</a>
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                {error}
                            </p>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-yellow-400 text-slate-900 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:scale-[1.01] transition-all shadow-xl shadow-yellow-400/10 active:scale-95 mt-4"
                        >
                            Login
                        </button>

                        <div className="text-center pt-8">
                            <p className="text-slate-600 text-[10px] tracking-[0.2em] uppercase font-bold">
                                © NECA Admin Panel
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;

import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    MessageSquare, 
    Settings, 
    LogOut, 
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/neca-logo.png';

const SidebarItem = ({ icon: Icon, label, active, onClick, to }: any) => (
    <Link to={to} className="no-underline">
        <div 
            onClick={onClick}
            className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 group ${
                active ? 'bg-primary text-slate-900 font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
            <span className="text-sm tracking-wide">{label}</span>
            {active && <motion.div layoutId="active" className="ml-auto w-1 h-6 bg-slate-900 rounded-full" />}
        </div>
    </Link>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Memberships', path: '/memberships' },
        { icon: MessageSquare, label: 'Contact Us', path: '/contacts' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('neca_admin_auth');
        navigate('/');
    };

    return (
        <div className="flex min-h-screen bg-bg-darker text-white font-outfit">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-72 border-r border-white/10 bg-bg-dark/50 backdrop-blur-xl">
                <div className="p-8 pb-4 flex items-center justify-center">
                    <img src={logo} alt="NECA Admin" className="h-16 w-auto object-contain" />
                </div>
                <div className="px-8 pb-8 text-center">
                    <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase opacity-70">Admin Portal</span>
                </div>

                <nav className="flex-1 mt-6">
                    {menuItems.map((item) => (
                        <SidebarItem 
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            to={item.path}
                            active={location.pathname === item.path}
                        />
                    ))}
                </nav>

                <div className="p-6">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between bg-bg-dark/30 backdrop-blur-md sticky top-0 z-40">
                    <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsMobileOpen(true)}>
                        <Menu size={24} />
                    </button>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-96 focus-within:border-primary/50 transition-colors">
                        <Search size={18} className="text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search records..." 
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-300 placeholder:text-slate-600"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-bg-dark"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-200">Admin User</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-hover border-2 border-white/20 p-0.5 shadow-lg shadow-primary/10">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="rounded-full bg-slate-800" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 pb-12 flex-1 relative overflow-y-auto">
                    {/* Background Orbs */}
                    <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
                    <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] -z-10" />
                    
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" 
                        />
                        <motion.aside 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 bg-bg-dark shadow-2xl z-50 lg:hidden flex flex-col"
                        >
                            <div className="p-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                                        <span className="text-slate-900 font-bold">N</span>
                                    </div>
                                    <h2 className="font-bold">NECA</h2>
                                </div>
                                <button onClick={() => setIsMobileOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <nav className="flex-1">
                                {menuItems.map((item) => (
                                    <SidebarItem 
                                        key={item.path}
                                        icon={item.icon}
                                        label={item.label}
                                        to={item.path}
                                        active={location.pathname === item.path}
                                        onClick={() => setIsMobileOpen(false)}
                                    />
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;

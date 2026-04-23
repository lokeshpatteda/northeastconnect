import { AnimatePresence, motion } from 'framer-motion';
import {
    Bell,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Search,
    Settings,
    Users,
    X,
    Calendar,
    Clock
} from 'lucide-react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/neca-logo.png';
import logolight from '../assets/necalogo-light.png';
import { ModeToggle } from './ModeToggle';


const SidebarItem = ({ icon: Icon, label, active, onClick, to }: any) => (
    <Link to={to} className="no-underline ">
        <div
            onClick={onClick}
            className={`flex items-center rounded-md gap-4 px-6 py-4 cursor-pointer transition-all duration-300 group ${active ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
        >
            <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
            <span className="text-sm tracking-wide">{label}</span>
            {active && <motion.div layoutId="active" className="ml-auto w-1 h-6 bg-primary-foreground/50 rounded-full" />}
        </div>
    </Link>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { DataService } = await import('../services/dataService');
                const members = await DataService.getMemberships();
                const contacts = await DataService.getContacts();

                const pendingMembers = members.filter((m: any) => m.status === 'pending');
                const newContacts = contacts.filter((c: any) => c.status === 'new');

                const newNotifs = [
                    ...pendingMembers.map((m: any) => ({
                        id: `m-${m.id}`,
                        type: 'membership',
                        name: m.name,
                        label: 'New membership application pending review.',
                        date: m.date
                    })),
                    ...newContacts.map((c: any) => ({
                        id: `c-${c.id}`,
                        type: 'contact',
                        name: c.name,
                        label: 'New contact message received.',
                        date: c.date
                    }))
                ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setNotifications(newNotifs);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Memberships', path: '/memberships' },
        { icon: MessageSquare, label: 'Contact Us', path: '/contacts' },
        { icon: Calendar, label: 'Upcoming Events', path: '/events' },
        { icon: Clock, label: 'Recent Events', path: '/recent-events' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('neca_admin_auth');
        navigate('/');
    };

    return (
        <div className="flex h-full bg-background text-foreground font-outfit">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-72  backdrop-blur-xl mx-3">
                <div className="p-8 pt-6 pb-4 flex items-center justify-center">
                    {/* Light logo */}
                    <img
                        src={logo}
                        className="h-11 w-auto object-contain pr-3 block dark:hidden"
                    />
                    {/* Dark logo */}
                    <img
                        src={logolight}
                        className="h-11 w-auto object-contain pr-3 hidden dark:block"
                    />
                    <div className="pl-3 text-center border-l dark:border-white/30">
                        <div className="text-[10px] text-primary font-black tracking-[0.3em] uppercase opacity-70">Admin Portal</div>
                    </div>
                </div>

                <nav className="flex-1 mt-4">
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

                <div className="p-6 px-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 w-full cursor-pointer text-destructive bg-destructive/15 border border-destructive/20 hover:text-destructive/100  hover:bg-destructive/25 rounded-md transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <header className="h-20 pl-0  pr-8 flex items-center justify-between bg-card/30 backdrop-blur-md">
                    <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setIsMobileOpen(true)}>
                        <Menu size={24} />
                    </button>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/30 border border-border rounded-full w-96 focus-within:border-primary/50 transition-colors">
                        <Search size={18} className="text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <ModeToggle />
                        <button
                            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsNotificationsOpen(true)}
                        >
                            <Bell size={20} />
                            {notifications.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                            )}
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-border">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-foreground">Admin User</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/80 border-2 border-border p-0.5 shadow-lg shadow-primary/10">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?_=20150327203541" alt="avatar" className="rounded-full bg-muted" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className=" flex-1 relative  border rounded-[15px] bg-gray-500/15">
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

            {/* Notifications Drawer */}
            <AnimatePresence>
                {isNotificationsOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsNotificationsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <h2 className="font-bold text-lg text-foreground">Notifications</h2>
                                <button onClick={() => setIsNotificationsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {notifications.length === 0 ? (
                                    <div className="text-center text-muted-foreground mt-10">No new notifications</div>
                                ) : (
                                    notifications.map(notif => (
                                        <div key={notif.id} className="p-4 bg-muted/30 rounded-xl border border-border">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.type === 'membership' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-500'}`}>
                                                    {notif.type === 'membership' ? <Users size={14} /> : <MessageSquare size={14} />}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-foreground">{notif.name}</h4>
                                                    <p className="text-[10px] text-muted-foreground">{new Date(notif.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{notif.label}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;

import { useEffect, useState } from 'react';
import {
    Users,
    MessageSquare,
    TrendingUp,
    UserPlus,
    Clock,
    CheckCircle2,
    AlertCircle,
    X
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
    const colorClasses: Record<string, string> = {
        yellow: 'bg-primary/10 text-primary',
        blue: 'bg-blue-400/10 text-blue-400',
        red: 'bg-red-400/10 text-red-400',
    };

    return (
        <div className="bg-card backdrop-blur-xl border border-border rounded-[15px] p-5 flex flex-col gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 cursor-pointer">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${colorClasses[color] || 'bg-muted text-muted-foreground'}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">
                        <TrendingUp size={14} />
                        <span>{trend}%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-muted-foreground text-sm font-medium tracking-wide">{title}</p>
                <h3 className="text-3xl font-bold mt-1 text-foreground tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalContacts: 0,
        pendingMembers: 0,
        newContacts: 0
    });

    const [recentActivites, setRecentActivities] = useState<any[]>([]);
    const [allActivities, setAllActivities] = useState<any[]>([]);
    const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);
    const [isApproving, setIsApproving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const members = await DataService.getMemberships();
            const contacts = await DataService.getContacts();
            updateDashboard(members, contacts);
        };

        const updateDashboard = (members: any[], contacts: any[]) => {
            setStats({
                totalMembers: members.length,
                totalContacts: contacts.length,
                pendingMembers: members.filter(m => m.status === 'pending').length,
                newContacts: contacts.filter(c => c.status === 'new').length
            });

            const allActs = [
                ...members.map(m => ({
                    id: m.id,
                    type: 'membership',
                    name: m.name,
                    date: m.date,
                    status: m.status,
                    label: 'New membership application'
                })),
                ...contacts.map(c => ({
                    id: c.id,
                    type: 'contact',
                    name: c.name,
                    date: c.date,
                    status: c.status,
                    label: 'New message received'
                }))
            ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setAllActivities(allActs);
            setRecentActivities(allActs.slice(0, 6));
        };

        fetchData();

        // Socket Listeners
        socket.on('new-membership', () => fetchData());
        socket.on('new-contact', () => fetchData());

        return () => {
            socket.off('new-membership');
            socket.off('new-contact');
        };
    }, []);

    const handleApproveAll = async () => {
        setIsApproving(true);
        try {
            const pendingMembers = allActivities.filter(a => a.type === 'membership' && a.status === 'pending');
            for (const member of pendingMembers) {
                await DataService.updateMembershipStatus(member.id, 'approved');
            }
            // The socket will trigger a refetch, but we can also manually refetch to be safe
            const members = await DataService.getMemberships();
            const contacts = await DataService.getContacts();
            
            // Re-calculate stats to update dashboard immediately
            setStats({
                totalMembers: members.length,
                totalContacts: contacts.length,
                pendingMembers: members.filter(m => m.status === 'pending').length,
                newContacts: contacts.filter(c => c.status === 'new').length
            });
            
            const allActs = [
                ...members.map(m => ({ id: m.id, type: 'membership', name: m.name, date: m.date, status: m.status, label: 'New membership application' })),
                ...contacts.map(c => ({ id: c.id, type: 'contact', name: c.name, date: c.date, status: c.status, label: 'New message received' }))
            ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setAllActivities(allActs);
            setRecentActivities(allActs.slice(0, 6));

        } catch (error) {
            console.error("Failed to approve all", error);
        } finally {
            setIsApproving(false);
        }
    };

    const handleExportCSV = () => {
        const headers = ['Type', 'Name', 'Date', 'Status', 'Label'];
        const rows = allActivities.map(a => [
            a.type, 
            `"${a.name}"`, 
            `"${new Date(a.date).toLocaleDateString()}"`, 
            a.status, 
            `"${a.label}"`
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map(e => e.join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-4 animate-fade font-outfit flex flex-col h-[87vh]">
            <header className="flex flex-col px-6 pt-6 mb-0">
                <h1 className="text-2xl font-semibold tracking-[1px] text-foreground ">Admin Dashboard </h1>
                <p className="text-muted-foreground text-sm">Monitor performance, activity, and key metrics in one place.</p>
            </header>
            <div className="space-y-4 flex-1 overflow-y-auto p-6 py-4 pr-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Applications"
                        value={stats.totalMembers}
                        icon={Users}
                        trend="12"
                        color="yellow"
                    />
                    <StatCard
                        title="New Inquiries"
                        value={stats.totalContacts}
                        icon={MessageSquare}
                        trend="5"
                        color="blue"
                    />
                    <StatCard
                        title="Pending Review"
                        value={stats.pendingMembers}
                        icon={Clock}
                        color="yellow"
                    />
                    <StatCard
                        title="Action Required"
                        value={stats.newContacts}
                        icon={AlertCircle}
                        color="red"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity Card */}
                    <div className="lg:col-span-2 bg-card backdrop-blur-xl border border-border rounded-[15px] p-6 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Submissions</h3>
                            <button onClick={() => setIsSubmissionsModalOpen(true)} className="text-primary text-sm font-bold hover:underline transition-all hover:text-primary/80">View All</button>
                        </div>

                        <div className="space-y-2">
                            {recentActivites.map((activity, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={idx}
                                    className="flex items-center gap-6 p-3 rounded-md cursor-pointer hover:bg-muted/50 transition-all group border border-transparent hover:border-border"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activity.type === 'membership' ? 'bg-primary/10 text-primary' : 'bg-blue-400/10 text-blue-400'
                                        }`}>
                                        {activity.type === 'membership' ? <UserPlus size={20} /> : <MessageSquare size={20} />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{activity.name}</h4>
                                        <p className="text-sm text-muted-foreground font-medium">{activity.label}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </p>
                                        <div className="mt-1.5 flex items-center justify-end gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${activity.status === 'pending' || activity.status === 'new' ? 'bg-primary animate-pulse' : 'bg-green-400'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">{activity.status}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / System Info */}
                    <div className="space-y-5">
                        <div className="bg-card backdrop-blur-xl border border-border rounded-[15px] p-6 border-primary/20 shadow-md">
                            <h3 className="text-xl font-bold mb-6 text-foreground tracking-tight">Quick Actions</h3>
                            <div className="space-y-4">
                                <button 
                                    onClick={handleApproveAll}
                                    disabled={isApproving || stats.pendingMembers === 0}
                                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/10 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <CheckCircle2 size={18} />
                                    <span>{isApproving ? 'Approving...' : 'Approve All Pending'}</span>
                                </button>
                                <button 
                                    onClick={handleExportCSV}
                                    className="w-full py-3 rounded-full border border-border hover:bg-muted transition-all font-bold text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Download Export (.CSV)
                                </button>
                            </div>
                        </div>

                        <div className="bg-card backdrop-blur-xl border border-border rounded-[15px] p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/10 shadow-md">
                            <h3 className="text-lg font-bold mb-3 text-foreground">System Insights</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                You can click on any application to view more details, upload supporting documents, or initiate background checks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submissions Drawer */}
            <AnimatePresence>
                {isSubmissionsModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSubmissionsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <h2 className="font-bold text-xl text-foreground">All Submissions</h2>
                                <button onClick={() => setIsSubmissionsModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                {allActivities.map((activity, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-border transition-all"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${activity.type === 'membership' ? 'bg-primary/10 text-primary' : 'bg-blue-400/10 text-blue-400'}`}>
                                            {activity.type === 'membership' ? <UserPlus size={20} /> : <MessageSquare size={20} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-foreground truncate">{activity.name}</h4>
                                            <p className="text-sm text-muted-foreground font-medium truncate">{activity.label}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                                {new Date(activity.date).toLocaleDateString()}
                                            </p>
                                            <div className="mt-1.5 flex items-center justify-end gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${activity.status === 'pending' || activity.status === 'new' ? 'bg-primary animate-pulse' : 'bg-green-400'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">{activity.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {allActivities.length === 0 && (
                                    <div className="text-center text-muted-foreground py-10">
                                        No submissions found.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;

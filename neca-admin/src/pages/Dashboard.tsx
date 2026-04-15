import { useEffect, useState } from 'react';
import { 
    Users, 
    MessageSquare, 
    TrendingUp, 
    UserPlus, 
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
    const colorClasses: Record<string, string> = {
        yellow: 'bg-primary/10 text-primary',
        blue: 'bg-blue-400/10 text-blue-400',
        red: 'bg-red-400/10 text-red-400',
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 flex flex-col gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 hover:border-primary/20">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${colorClasses[color] || 'bg-slate-400/10 text-slate-400'}`}>
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
                <p className="text-slate-400 text-sm font-medium tracking-wide">{title}</p>
                <h3 className="text-3xl font-bold mt-1 text-white tracking-tight">{value}</h3>
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

            const activities = [
                ...members.slice(0, 3).map(m => ({ 
                    type: 'membership', 
                    name: m.name, 
                    date: m.date, 
                    status: m.status,
                    label: 'New membership application'
                })),
                ...contacts.slice(0, 3).map(c => ({ 
                    type: 'contact', 
                    name: c.name, 
                    date: c.date, 
                    status: c.status,
                    label: 'New message received'
                }))
            ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setRecentActivities(activities);
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

    return (
        <div className="space-y-8 animate-fade font-outfit">
            <header className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold tracking-tight text-white">Portal Overview</h1>
                <p className="text-slate-400 font-medium">Welcome back, Admin. Here's what's happening today.</p>
            </header>

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Card */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white tracking-tight">Recent Submissions</h3>
                        <button className="text-primary text-sm font-bold hover:underline transition-all">View All</button>
                    </div>
                    
                    <div className="space-y-6">
                        {recentActivites.map((activity, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx} 
                                className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                    activity.type === 'membership' ? 'bg-primary/10 text-primary' : 'bg-blue-400/10 text-blue-400'
                                }`}>
                                    {activity.type === 'membership' ? <UserPlus size={20} /> : <MessageSquare size={20} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{activity.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{activity.label}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </p>
                                    <div className="mt-1.5 flex items-center justify-end gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${activity.status === 'pending' || activity.status === 'new' ? 'bg-primary animate-pulse' : 'bg-green-400'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-tight text-slate-400">{activity.status}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / System Info */}
                <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 border-primary/20 shadow-xl shadow-primary/5">
                        <h3 className="text-xl font-bold mb-6 text-white tracking-tight">Quick Actions</h3>
                        <div className="space-y-4">
                            <button className="w-full bg-primary text-slate-900 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-hover hover:scale-[1.02] transition-all shadow-lg shadow-primary/10">
                                <CheckCircle2 size={18} />
                                <span>Approve All Pending</span>
                            </button>
                            <button className="w-full py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
                                Download Export (.CSV)
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                        <h3 className="text-lg font-bold mb-3 text-white">System Insights</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                            You can click on any application to view more details, upload supporting documents, or initiate background checks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

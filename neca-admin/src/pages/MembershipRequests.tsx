import { useEffect, useState } from 'react';
import { DataService, type MembershipData } from '../services/dataService';
import { Search, Filter, MoreVertical, Eye, Check, X, Download, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

const socket = io(import.meta.env.VITE_API_URL);

const MembershipRequests = () => {
    const [requests, setRequests] = useState<MembershipData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<MembershipData | null>(null);

    useEffect(() => {
        const fetchMemberships = async () => {
            const data = await DataService.getMemberships();
            setRequests(data);
        };
        fetchMemberships();

        socket.on('new-membership', (newReq) => {
            setRequests(prev => [newReq, ...prev]);
        });

        socket.on('membership-updated', (updatedReq) => {
            setRequests(prev => prev.map(r => r.id === updatedReq.id ? updatedReq : r));
            if (selectedRequest?.id === updatedReq.id) {
                setSelectedRequest(updatedReq);
            }
        });

        socket.on('membership-deleted', (id) => {
            setRequests(prev => prev.filter(r => r.id !== id));
            if (selectedRequest?.id === id) {
                setSelectedRequest(null);
            }
        });

        return () => {
            socket.off('new-membership');
            socket.off('membership-updated');
            socket.off('membership-deleted');
        };
    }, [selectedRequest]);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await DataService.updateMembershipStatus(id, newStatus);
            toast.success(`Application ${newStatus} successfully`);
        } catch (error) {
            console.error("Status Update Failed:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to archive this request?')) {
            try {
                await DataService.deleteMembership(id);
                toast.success("Request archived successfully");
            } catch (error) {
                console.error("Deletion Failed:", error);
                toast.error("Failed to archive request");
            }
        }
    };

    const filteredRequests = requests.filter(req =>
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade font-outfit">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 pt-6 mb-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-[1px] text-foreground">Membership Requests</h1>
                    <p className="text-muted-foreground text-sm">Review and manage community membership applications.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full hover:bg-muted transition-all font-bold text-sm text-foreground">
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            </header>

            {/* Content Card */}
            <div className="bg-card backdrop-blur-xl border border-border rounded-[15px] overflow-hidden  m-6 my-4 mr-6">
                {/* Table Controls */}
                <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
                    <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 border border-border rounded-xl w-full md:w-96 focus-within:border-primary/50 transition-all shadow-inner">
                        <Search size={18} className="text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, email or city..."
                            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg hover:opacity-80 transition-all text-sm font-bold text-foreground">
                            <Filter size={16} />
                            <span>Filter Results</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto max-h-[65vh] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-card/80 backdrop-blur-md z-10">
                            <tr className="bg-muted/30">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Applicant</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Contact Info</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Location</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Type</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border font-medium">
                            {filteredRequests.map((req, idx) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={req.id}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-lg border border-primary/10">
                                                {req.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground group-hover:text-primary transition-colors text-base">{req.name}</p>
                                                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-black">Applied: {new Date(req.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm text-foreground/80">{req.email}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{req.phone}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm text-foreground/80">{req.city}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{req.occupation}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="px-3 py-1.5 bg-muted border border-border rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            {req.membership}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${req.status === 'pending' ? 'bg-primary shadow-[0_0_8px_rgba(250,204,21,0.5)] animate-pulse' : req.status === 'rejected' ? 'bg-red-400' : 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]'}`} />
                                            <span className={`text-[11px] font-black uppercase tracking-widest ${req.status === 'pending' ? 'text-primary' : req.status === 'rejected' ? 'text-red-400' : 'text-green-400'}`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right relative">
                                        <div className="absolute right-5 top-6 flex items-center justify-end gap-2.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 hidden group-hover:flex">
                                            {req.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(req.id, 'approved')}
                                                    className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedRequest(req)}
                                                className="p-2.5 bg-muted text-foreground border border-border rounded-xl hover:bg-muted/80 transition-all cursor-pointer"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(req.id)}
                                                className="p-2.5 bg-red-400/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all cursor-pointer"
                                                title="Delete"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <button className="p-2 text-slate-500 group-hover:hidden hover:text-white transition-colors cursor-pointer">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredRequests.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users size={40} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-muted-foreground font-bold text-lg mb-2">No matching records</h3>
                            <p className="text-muted-foreground/60 text-sm max-w-xs mx-auto">Try adjusting your search filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Application Detail Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRequest(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-card rounded-[32px] overflow-hidden shadow-2xl border border-border"
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Profile Visual */}
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[24px] bg-primary/20 flex-shrink-0 border border-primary/10 overflow-hidden flex items-center justify-center">
                                        {selectedRequest.image_url ? (
                                            <img src={selectedRequest.image_url} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-5xl font-black text-primary">{selectedRequest.name.charAt(0)}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-3xl font-bold text-foreground">{selectedRequest.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedRequest.status === 'pending' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-green-400/20 text-green-400 border border-green-400/30'
                                                    }`}>
                                                    {selectedRequest.status}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground font-medium">{selectedRequest.membership} Applicant</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Email</p>
                                                <p className="text-foreground font-bold">{selectedRequest.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Phone</p>
                                                <p className="text-foreground font-bold">{selectedRequest.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Location</p>
                                                <p className="text-foreground font-bold">{selectedRequest.city}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Occupation</p>
                                                <p className="text-foreground font-bold">{selectedRequest.occupation}</p>
                                            </div>
                                        </div>

                                        <div className="bg-muted/30 rounded-2xl p-6 border border-border italic text-muted-foreground text-sm leading-relaxed">
                                            "{selectedRequest.message}"
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            {selectedRequest.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(selectedRequest.id, 'approved')}
                                                    className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                                                >
                                                    Approve Application
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedRequest(null)}
                                                className="flex-1 bg-muted text-foreground border border-border py-4 rounded-2xl font-bold hover:bg-muted/80 transition-all"
                                            >
                                                Close Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MembershipRequests;


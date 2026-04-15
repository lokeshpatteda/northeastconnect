import { useEffect, useState } from 'react';
import { DataService, type ContactData } from '../services/dataService';
import { Search, Mail, MessageSquare, Trash2, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

const socket = io(import.meta.env.VITE_API_URL);

const ContactInquiries = () => {
    const [inquiries, setInquiries] = useState<ContactData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            const data = await DataService.getContacts();
            setInquiries(data);
        };
        fetchContacts();

        socket.on('new-contact', (newContact) => {
            setInquiries(prev => [newContact, ...prev]);
        });

        socket.on('contact-updated', (updatedContact) => {
            setInquiries(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
        });

        socket.on('contact-deleted', (id) => {
            setInquiries(prev => prev.filter(c => c.id !== id));
        });

        return () => {
            socket.off('new-contact');
            socket.off('contact-updated');
            socket.off('contact-deleted');
        };
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await DataService.updateContactStatus(id, newStatus);
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            console.error("Status Update Failed:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to archive this message?')) {
            try {
                await DataService.deleteContact(id);
                toast.success("Message archived successfully");
            } catch (error) {
                console.error("Deletion Failed:", error);
                toast.error("Failed to archive message");
            }
        }
    };

    const filteredInquiries = inquiries.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade font-outfit">
            <header>
                <h1 className="text-4xl font-bold tracking-tight text-white">Contact Inquiries</h1>
                <p className="text-slate-400 mt-1 font-medium">Direct messages from the website's contact form.</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-6 shadow-lg">
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl w-full md:w-96 focus-within:border-blue-400/50 transition-all">
                        <Search size={18} className="text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-300 placeholder:text-slate-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                        <span>Total: {filteredInquiries.length} Messages</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredInquiries.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={item.id}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 hover:border-blue-400/30 group transition-all duration-300 shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-5 cursor-pointer" onClick={() => setSelectedContact(item)}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-black text-lg border border-blue-400/10">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-slate-200 group-hover:text-blue-400 transition-colors tracking-tight">{item.name}</h4>
                                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                                    <Mail size={12} className="text-slate-600" />
                                                    <span>{item.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                                {new Date(item.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                            </span>
                                            {item.status === 'new' ? (
                                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/30 animate-pulse">New</span>
                                            ) : (
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.status === 'replied' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 relative overflow-hidden group-hover:bg-white/[0.05] transition-colors">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20" />
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-2">{item.subject}</p>
                                        <p className="text-slate-300 leading-relaxed font-medium text-sm italic line-clamp-2">"{item.message}"</p>
                                    </div>
                                </div>

                                <div className="md:w-40 flex md:flex-col justify-end md:justify-center gap-3">
                                    <button
                                        onClick={() => handleStatusUpdate(item.id, 'replied')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-slate-950 rounded-xl hover:scale-105 transition-all font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95"
                                    >
                                        <CheckCircle size={16} />
                                        <span>Mark Reply</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-slate-400 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all font-bold text-xs"
                                    >
                                        <Trash2 size={16} />
                                        <span>Archive</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredInquiries.length === 0 && (
                        <div className="py-24 text-center bg-white/5 backdrop-blur-xl border border-dashed border-white/10 rounded-[20px] shadow-inner">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare size={40} className="text-slate-700" />
                            </div>
                            <h3 className="text-slate-400 font-bold text-lg mb-2">No inquiries found</h3>
                            <p className="text-slate-600 text-sm max-w-xs mx-auto">Your inbox is either empty or filtered. Try changing your search query.</p>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selectedContact && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedContact(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-[#1e2533] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 p-8 md:p-12">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-black text-xl border border-blue-400/10">
                                            {selectedContact.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{selectedContact.name}</h3>
                                            <p className="text-slate-400 text-sm">{selectedContact.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedContact.status === 'new' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' : 'bg-green-400/20 text-green-400 border border-green-400/30'
                                        }`}>
                                        {selectedContact.status}
                                    </span>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2">Subject</p>
                                    <p className="text-blue-400 font-bold text-lg">{selectedContact.subject}</p>
                                </div>

                                <div className="pt-4">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-2">Message</p>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-slate-300 leading-relaxed italic">
                                        "{selectedContact.message}"
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        onClick={() => { handleStatusUpdate(selectedContact.id, 'replied'); setSelectedContact(null); }}
                                        className="flex-1 bg-blue-500 text-slate-900 py-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/20"
                                    >
                                        Mark as Replied
                                    </button>
                                    <button onClick={() => setSelectedContact(null)} className="flex-1 bg-white/5 text-slate-300 border border-white/10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactInquiries;

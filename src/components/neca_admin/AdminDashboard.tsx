import { useState } from "react";
import AdminLeftpanel from "./AdminLeftpanel"
import AdminToppanel from "./AdminToppanel"
import {
    Users,
    UserPlus,
    CheckCircle,
    Handshake,
    UserCheck
} from "lucide-react";

const AdminDashboard = () => {
    const members = [
        {
            name: "Lokesh",
            email: "lokesh@gmail.com",
            phone: "+91 9876543210",
            city: "Hyderabad",
            occupation: "Professional",
            type: "General",
            status: "Active",
        },
        {
            name: "Ravi",
            email: "ravi@gmail.com",
            phone: "+91 9999999999",
            city: "Secunderabad",
            occupation: "Student",
            type: "Volunteer",
            status: "New",
        },
        {
            name: "Anita",
            email: "anita@gmail.com",
            phone: "+91 8888888888",
            city: "Hyderabad",
            occupation: "Business",
            type: "Partnership",
            status: "Active",
        },
    ];

    const [open, setOpen] = useState(false);

    // 📊 Stats Calculation
    const total = members.length;
    const active = members.filter(m => m.status === "Active").length;
    const newMembers = members.filter(m => m.status === "New").length;

    const general = members.filter(m => m.type === "General").length;
    const volunteer = members.filter(m => m.type === "Volunteer").length;
    const partnership = members.filter(m => m.type === "Partnership").length;

    const stats = [
        { title: "Total Members", value: total, icon: Users },
        { title: "Active Members", value: active, icon: CheckCircle },
        { title: "New Members", value: newMembers, icon: UserPlus },
        { title: "General", value: general, icon: UserCheck },
        { title: "Volunteer", value: volunteer, icon: Handshake },
        { title: "Partnership", value: partnership, icon: Handshake },
    ];

    return (
        <div className="flex h-screen ">

            {/* Sidebar */}
            <AdminLeftpanel open={open} setOpen={setOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Topbar */}
                <AdminToppanel setOpen={setOpen} />
                {/* Content */}
                <div className="p-4 sm:p-6 space-y-6 h-screen bg-gray-100 rounded-t-[25px]">

                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">

                        {stats.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition" >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500">{item.title}</p>
                                            <h1 className="text-lg sm:text-xl font-bold">{item.value}</h1>
                                        </div>
                                        <Icon size={18} className="text-yellow-500" />
                                    </div>
                                </div>
                            );
                        })}

                    </div>


                    <h2 className="text-lg text-left font-semibold mb-4">
                        Members List
                    </h2>


                    {/* TABLE */}
                    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 overflow-x-auto">


                        <table className="w-full min-w-[700px] text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="py-3 text-left">Name</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-left">Phone</th>
                                    <th className="text-left">City</th>
                                    <th className="text-left">Occupation</th>
                                    <th className="text-left">Type</th>
                                    <th className="text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {members.map((m, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-3 text-left font-medium">{m.name}</td>
                                        <td className="text-left">{m.email}</td>
                                        <td className="text-left">{m.phone}</td>
                                        <td className="text-left">{m.city}</td>
                                        <td className="text-left">{m.occupation}</td>

                                        <td className="text-left">
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                                                {m.type}
                                            </span>
                                        </td>

                                        <td className="text-left">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${m.status === "Active"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-blue-100 text-blue-600"
                                                    }`} >
                                                {m.status}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

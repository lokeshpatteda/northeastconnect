import { Necalogo } from "@/assets/images/images";
import {
    BarChart3,
    FileText,
    LayoutDashboard,
    Settings,
    UserCircle,
    Users,
    X
} from "lucide-react";
import { useState } from "react";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Membership Forms", icon: FileText },
    { name: "Members", icon: Users },
    { name: "Profiles", icon: UserCircle },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
];
type SidebarProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
};


const AdminLeftpanel = ({ open, setOpen }: SidebarProps) => {

    const [active, setActive] = useState("Dashboard");

    return (
        <>


            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <div
                className={`fixed md:fixed z-50 top-0 left-0 h-screen w-64 bg-white flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
            >

                {/* HEADER / LOGO */}
                <div className="p-6 pb-3  flex items-center justify-between">
                    <img src={Necalogo} className="h-10 " />

                    {/* Close button (mobile only) */}
                    <button className="md:hidden" onClick={() => setOpen(false)}>
                        <X />
                    </button>
                </div>

                {/* MENU */}
                <div className="flex-1 p-4 space-y-2">

                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.name}
                                onClick={() => {
                                    setActive(item.name);
                                    setOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-300
                ${active === item.name
                                        ? "bg-yellow-400 text-black shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}

                </div>

                {/* USER PROFILE */}
                <div className="p-4 border-t">
                    <div className="flex text-left items-center gap-3">

                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                            A
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Admin</p>
                            <p className="text-xs text-gray-500">admin@neca.com</p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default AdminLeftpanel;
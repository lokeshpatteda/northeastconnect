import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

type TopbarProps = {
    setOpen: (value: boolean) => void;
};

const AdminToppanel = ({ setOpen }: TopbarProps) => {

    const [openProfile, setOpenProfile] = useState(false);

    return (
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur">

            <div className="flex items-center justify-between px-4 sm:px-6 py-4">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    {/* ✅ MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu />

                    </button>

                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Dashboard
                    </h1>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* SEARCH */}
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                        />
                    </div>

                    {/* NOTIFICATION */}
                    <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
                        <Bell className="text-gray-600" />

                        <span className="absolute top-1 right-1 bg-yellow-400 text-[10px] px-1.5 rounded-full">
                            3
                        </span>
                    </div>

                    {/* PROFILE */}
                    <div className="relative">

                        <div
                            onClick={() => setOpenProfile(!openProfile)}
                            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                                A
                            </div>

                            <span className="text-sm font-medium hidden sm:block">
                                Admin
                            </span>

                            <ChevronDown size={16} />
                        </div>

                        {/* DROPDOWN */}
                        {openProfile && (
                            <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg p-2 z-50">

                                <p className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
                                    Profile
                                </p>

                                <p className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
                                    Settings
                                </p>

                                <p className="px-3 py-2 hover:bg-red-100 text-red-500 rounded cursor-pointer text-sm">
                                    Logout
                                </p>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminToppanel;
import { Necalogolight } from '@/assets/images/images';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import ScrollTopButton from './ScrollTopButton';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#0f1720] text-gray-300 pt-16 pb-6">

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1.2fr] gap-6">

                    {/* ABOUT */}
                    <div>
                        <div className="flex items-center mb-6">
                            <img src={Necalogolight} className="h-12 w-auto " />
                        </div>

                        <p className="text-sm text-gray-400 text-left leading-relaxed">
                            North-East Connect Association (NECA) is dedicated to building a
                            connected and inclusive community by supporting cultural exchange,
                            collaboration, and social engagement among Northeast residents in Telangana.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">

                            <div className="border border-gray-600 p-3 rounded-full hover:bg-yellow-400 hover:text-black cursor-pointer transition">
                                <FaFacebookF />
                            </div>

                            <div className="border border-gray-600 p-3 rounded-full hover:bg-yellow-400 hover:text-black cursor-pointer transition">
                                <FaInstagram />
                            </div>

                            <div className="border border-gray-600 p-3 rounded-full hover:bg-yellow-400 hover:text-black cursor-pointer transition">
                                <FaLinkedinIn />
                            </div>

                        </div>
                    </div>


                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>


                        <ul className="space-y-3 text-sm">

                            <li className="hover:text-yellow-400 cursor-pointer">
                                <Link to="/home">Home</Link>
                            </li>

                            <li className="hover:text-yellow-400 cursor-pointer">
                                <Link to="/about">About Us</Link>
                            </li>

                            <li className="hover:text-yellow-400 cursor-pointer">
                                <Link to="/what-we-do">What We Do</Link>
                            </li>

                            <li className="hover:text-yellow-400 cursor-pointer">
                                <Link to="/membership">Membership</Link>
                            </li>

                            <li className="hover:text-yellow-400 cursor-pointer">
                                <Link to="/events">Events</Link>
                            </li>

                            <li className="hover:text-yellow-400 cursor-pointer">
                                <Link to="/contact">Contact</Link>
                            </li>

                        </ul>
                    </div>


                    {/* CONTACT INFO */}
                    <div>

                        <h3 className="text-lg font-semibold text-white mb-4">
                            Contact Info
                        </h3>

                        <div className="space-y-4 text-sm text-left">

                            <div className="flex gap-3 items-start">
                                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                                <p>
                                    North-East Connect Association (NECA) <br />
                                    Sundarayya Vignana Kendram, Gachibowli, <br />
                                    Hyderabad, Telangana – 500032
                                </p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaEnvelope className="text-yellow-400" />
                                <p>northeastconnectassociation@gmail.com</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <FaPhoneAlt className="text-yellow-400" />
                                <p>+91 9493460031</p>
                            </div>

                            <p className="text-gray-400">
                                Dr. K Trilok Chandan Goud – Coordinator, NECA
                            </p>

                        </div>

                    </div>


                    {/* LEGAL INFO */}
                    <div>

                        <h3 className="text-lg font-semibold text-white mb-4">
                            Legal Info
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400 text-left">

                            <li>
                                Registered under the Telangana Societies Registration Act, 2001
                                (Reg. No. 1121 of 2025)
                            </li>

                            <li>
                                PAN: AAMAN0270C
                            </li>

                            <li>
                                NITI Aayog DARPAN ID: TS/2026/0982277
                            </li>

                        </ul>

                    </div>

                </div>


                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">

                    © {new Date().getFullYear()} North-East Connect Association. All Rights Reserved.

                </div>

            </footer>
            <ScrollTopButton />
        </div>
    )
}

export default Footer

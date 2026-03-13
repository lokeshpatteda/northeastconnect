import { useEffect, useState } from 'react'

import { Necalogo } from '@/assets/images/images'
import { faArrowRight, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About Us', href: '/about' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
]
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navigationbar = () => {

    const [isSticky, setIsSticky] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div>
            <div className="max-w-9/10  m-auto bg-gradient-to-r from-gray-900 to-gray-800 p-3 px-4 rounded-b-lg">
                <div className=" font-medium flex justify-between text-white">
                    <label> <FontAwesomeIcon icon={faPhone} className='text-yellow-400 me-1' /> +91 9493460031</label>
                    <label className='flex items-center gap-2'> <FontAwesomeIcon icon={faEnvelope} className='text-yellow-400 me-1 pt-1' /> <a href="mailto:northeastconnectassociation@gmail.com" className="hidden sm:block text-white hover:text-yellow-200">northeastconnectassociation@gmail.com</a></label>
                </div>
            </div>
            <div
                className={`w-full transition-all duration-300 ${isSticky
                    ? "fixed top-0 left-0 z-50 bg-white shadow-md backdrop-blur-md"
                    : "relative bg-transparent"
                    }`}
            >
                <div className="p-4 max-w-7xl px-0 m-auto">
                    <Disclosure as="nav" className="bg-white">
                        {({ open }) => (
                            <>
                                <div className="mx-auto max-w-7xl px-5 sm:px-0 lg:px-0">
                                    <div className="flex h-16 items-center justify-between">

                                        {/* Logo */}
                                        <div className="flex items-center">
                                            <img src={Necalogo} className="h-12 w-auto" />
                                        </div>

                                        {/* Desktop Menu */}
                                        <div className="hidden sm:flex space-x-8">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    onClick={() => setActiveTab(item.name)}
                                                    className={classNames(
                                                        activeTab === item.name
                                                            ? "text-black border-b-3 border-yellow-500"
                                                            : "text-gray-600 hover:text-black hover:border-b-3 hover:border-yellow-500",
                                                        "px-3 py-2 text-md font-medium border-b-3 border-transparent transition"
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Desktop Button */}
                                        <div className="hidden sm:block">
                                            <Link to="/membership">
                                                <button className="px-6 py-2 cursor-pointer bg-yellow-400 font-semibold rounded-full hover:bg-yellow-500 flex items-center gap-2">
                                                    Become a Member <FontAwesomeIcon icon={faArrowRight} />
                                                </button>
                                            </Link>
                                        </div>

                                        {/* Mobile Menu Button */}
                                        <div className="sm:hidden">
                                            <DisclosureButton className="p-2">
                                                {open ? (
                                                    <XMarkIcon className="h-6 w-6" />
                                                ) : (
                                                    <Bars3Icon className="h-6 w-6" />
                                                )}
                                            </DisclosureButton>
                                        </div>

                                    </div>
                                </div>

                                {/* Mobile Menu */}
                                <DisclosurePanel className="sm:hidden px-4 pb-6">

                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setActiveTab(item.name)}
                                            className={classNames(
                                                activeTab === item.name
                                                    ? "text-black font-semibold"
                                                    : "text-gray-700",
                                                "block py-3 border-b"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}

                                    {/* Mobile Button */}
                                    <div className="mt-6">
                                        <button className="w-full py-3 bg-yellow-400 rounded-full hover:bg-yellow-500 font-semibold cursor-pointer ">
                                            Become a Member  <FontAwesomeIcon icon={faArrowRight} />
                                        </button>
                                    </div>

                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </div>
    )
}

export default Navigationbar

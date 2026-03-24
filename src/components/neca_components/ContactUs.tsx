import { FaFacebookF, FaInstagram } from "react-icons/fa"
import Footer from "./Footer"
import Navigationbar from "./Navigationbar"
import { Partner } from "@/assets/images/images"
import { useEffect } from "react"

const ContactUs = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navigationbar />
            <section className="py-10" id="contact">


                <div className="text-center mb-16">
                    <p className="text-green-600 font-medium">
                        Get In Touch
                    </p>

                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        Contact Us
                    </h2>
                    <p className='text-gray-500'>We'd love to hear from you. Whether you have a question, want to
                        collaborate, or are interested in membership, please reach out.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

                    {/* LEFT SIDE - CONTACT DETAILS */}
                    <div
                        className="relative rounded-2xl overflow-hidden min-h-[420px] flex items-center bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${Partner})`,
                        }}
                    >

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60"></div>

                        {/* Content */}
                        <div className="relative z-10 text-white p-8 w-full backdrop-blur-sm">

                            {/* Manager */}
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold">
                                    Dr. K Trilok Chandan Goud
                                </h2>
                                <p className="text-gray-200">
                                    Coordinator, NECA
                                </p>
                            </div>

                            {/* Address */}
                            <div className="flex items-center justify-center gap-4 mb-5">

                                <p className="text-sm">
                                    North-East Connect Association (NECA) <br />
                                    Sundarayya Vignana Kendram, Gachibowli, Hyderabad <br />
                                    Telangana – 500032
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex items-center justify-center gap-4 mb-5">

                                <p className="text-sm">
                                    northeastconnectassociation@gmail.com
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-center gap-4 mb-6">

                                <p className="text-sm">
                                    +91 9493460031
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center justify-center gap-4 mt-6">

                                <div className="bg-white/20 backdrop-blur p-3 rounded-full hover:bg-yellow-400 hover:text-black cursor-pointer transition">
                                    <FaFacebookF />
                                </div>

                                <div className="bg-white/20 backdrop-blur p-3 rounded-full hover:bg-yellow-400 hover:text-black cursor-pointer transition">
                                    <FaInstagram />
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDE - CONTACT FORM */}
                    <div className="bg-white p-8 rounded-2xl border  shadow-md">

                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            Send Us a Message
                        </h3>

                        <form className="space-y-4">

                            {/* Name */}
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />


                            {/* Subject */}
                            <select
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option>Membership Inquiry</option>
                                <option>Volunteering</option>
                                <option>Partnership</option>
                                <option>General</option>
                            </select>

                            {/* Message */}
                            <textarea
                                rows={4}
                                placeholder="Message"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            ></textarea>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-semibold w-full"
                            >
                                Submit
                            </button>

                        </form>

                    </div>

                </div>
            </section>

            <Footer />

        </div>
    )
}

export default ContactUs

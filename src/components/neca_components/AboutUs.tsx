import { Event2 } from "@/assets/images/images"
import Footer from "./Footer"
import Navigationbar from "./Navigationbar"
import { FaBullseye, FaEye } from "react-icons/fa"

const AboutUs = () => {
    return (
        <div>

            <Navigationbar />
            <div>

                {/* HERO */}
                <section className="relative h-[45vh] flex items-center justify-center text-white">

                    <img
                        src={Event2}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/60"></div>

                    <h1 className="relative text-5xl font-bold">
                        About Us
                    </h1>

                </section>


                {/* WHO WE ARE */}
                <section className="py-10 bg-white">

                    <div className="max-w-7xl mx-auto px-6">

                        <h2 className="text-4xl text-left font-bold text-gray-800 mb-6">
                            Who We Are
                        </h2>

                        <p className="text-gray-600 mb-6 text-left">
                            The North-East Connect Association is an independent, non-profit organization dedicated to
                            advancing the principles of justice, equality, and inclusivity. We serve as a bridge between the
                            vibrant Northeast Indian communities and the local population of Telangana, with a special focus
                            on the Hyderabad region.
                            Registered under the Telangana Societies Registration Act, 2001 (Reg. No. 1121 of 2025), we are
                            committed to creating pathways for shared growth and harmony. Our work is driven by the belief
                            that diversity is our greatest strength.

                        </p>



                    </div>

                </section>


                {/* VISION & MISSION */}
                <section className="py-24 bg-gray-50">

                    <div className="max-w-7xl mx-auto px-6">

                        {/* Section Title */}
                        <div className="text-center mb-16">
                            <p className="text-green-600 font-medium">Our Purpose</p>
                            <h2 className="text-4xl font-bold text-gray-800">
                                Vision & Mission
                            </h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                                Guiding principles that drive the North-East Connect Association in
                                building a stronger, more inclusive community.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-1 gap-10">

                            {/* Vision Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-xl transition">

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-yellow-400 text-black p-4 rounded-full text-xl">
                                        <FaEye />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-800">
                                        Our Vision
                                    </h3>
                                </div>

                                <p className="text-gray-600 text-left leading-relaxed">
                                    To create a Telangana where individuals from Northeast India are
                                    not just residents, but confident, active, and celebrated members
                                    of society, contributing fully to a shared future.
                                </p>

                            </div>


                            {/* Mission Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-xl transition">

                                <div className="flex items-center  gap-4 mb-6">
                                    <div className="bg-yellow-400 text-black p-4 rounded-full text-xl">
                                        <FaBullseye />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            Our Mission
                                        </h3>
                                        <p className="text-gray-600 text-left mb-0">
                                            Our mission is to foster seamless integration and assimilation through:
                                        </p>
                                    </div>
                                </div>


                                <div className="grid md:grid-cols-4 gap-8">

                                    <div className="p-6 shadow rounded-xl text-center">
                                        <h4 className="font-semibold text-lg"> Cultural Exchange</h4>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Promoting mutual understanding and respect for the
                                            rich cultural diversity of Northeast India and Telangana.
                                        </p>
                                    </div>

                                    <div className="p-6 shadow rounded-xl text-center">
                                        <h4 className="font-semibold text-lg">  Community Building</h4>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Creating supportive networks and platforms for
                                            dialogue and collaboration.
                                        </p>
                                    </div>

                                    <div className="p-6 shadow rounded-xl text-center">
                                        <h4 className="font-semibold text-lg">  Empowerment</h4>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Providing resources and assistance to enhance
                                            social and professional engagement.
                                        </p>
                                    </div>

                                    <div className="p-6 shadow rounded-xl text-center">
                                        <h4 className="font-semibold text-lg">Advocacy</h4>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Collaborating with institutions and authorities to
                                            create an inclusive environment.
                                        </p>
                                    </div>

                                </div>




                            </div>

                        </div>

                    </div>

                </section>

                {/* CORE VALUES */}
                <section className="py-20 bg-white">

                    <div className="max-w-7xl mx-auto px-6">

                        <h2 className="text-4xl font-bold text-center mb-12">
                            Our Core Values
                        </h2>

                        <div className="grid md:grid-cols-4 gap-8">

                            <div className="p-6 shadow rounded-xl text-center">
                                <h4 className="font-semibold text-lg">Inclusivity</h4>
                                <p className="text-gray-600 text-sm mt-2">
                                    We welcome and celebrate people from all backgrounds.
                                </p>
                            </div>

                            <div className="p-6 shadow rounded-xl text-center">
                                <h4 className="font-semibold text-lg">Respect</h4>
                                <p className="text-gray-600 text-sm mt-2">
                                    We foster dialogue and activities built on mutual respect and understanding
                                </p>
                            </div>

                            <div className="p-6 shadow rounded-xl text-center">
                                <h4 className="font-semibold text-lg">Empowerment</h4>
                                <p className="text-gray-600 text-sm mt-2">
                                    We equip individuals with the tools and confidence to participate fully in
                                    society.

                                </p>
                            </div>

                            <div className="p-6 shadow rounded-xl text-center">
                                <h4 className="font-semibold text-lg">Collaboration</h4>
                                <p className="text-gray-600 text-sm mt-2">
                                    We believe in the power of working together with communities,
                                    institutions, and the government.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </div>

            <Footer />
        </div>
    )
}

export default AboutUs

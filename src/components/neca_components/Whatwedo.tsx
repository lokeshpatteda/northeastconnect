import { Event5 } from "@/assets/images/images";
import Footer from "./Footer"
import Navigationbar from "./Navigationbar"
import { useEffect } from "react";

const Whatwedo = () => {
    const objectives = [
        "Foster Integration of Northeast communities into Telangana society.",
        "Support and empower Northeast residents living in Telangana.",
        "Provide assistance for social, cultural and professional engagement.",
        "Create platforms for dialogue and collaborative activities.",
        "Cultivate friendship and cooperation between communities.",
        "Collaborate with institutions and civil society for inclusion.",
        "Promote education and support meritorious students.",
        "Celebrate cultural heritage through festivals and activities.",
        "Encourage recreation and wellbeing among members."
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navigationbar />
            <section className="relative h-[45vh] flex items-center justify-center text-white">

                <img
                    src={Event5}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <h1 className="relative text-5xl font-bold">
                    What We Do
                </h1>

            </section>


            {/* OBJECTIVES */}
            <section className="py-20 bg-gray-50">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        Aims & Objectives
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {objectives.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                            >

                                <p className="text-gray-600">
                                    {item}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>

            </section>
            <Footer />
        </div>
    )
}

export default Whatwedo

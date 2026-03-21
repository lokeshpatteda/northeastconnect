import news from "@/pages/news"
import { useEffect, useState } from "react"
import Footer from "./Footer"
import Navigationbar from "./Navigationbar"


const Newsandevents = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % news.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <Navigationbar />
            <section className="py-16 bg-gray-50" id="events">

                <div className="text-center mb-16">
                    <p className="text-green-600 font-medium">
                        Updates
                    </p>

                    <h2 className="text-4xl font-bold text-gray-800 mb-3">
                        News & <span className="text-yellow-500">Events</span>
                    </h2>
                    <p className='text-gray-500'>Discover NECA’s recent activities, upcoming programs, and important announcements that support integration, cultural exchange, <br /> and community engagement.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">

                    {/* LEFT - ACTIVE EVENT */}
                    <div className="transition-all duration-700">

                        <h3 className="text-lg text-left font-semibold text-gray-700 mb-4">
                            Upcoming Events
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-6 border-t pt-6 items-center">

                            {/* DATE BLOCK */}
                            <div className="text-center min-w-[80px]">

                                <p className="text-gray-500 text-sm uppercase">
                                    {news[activeIndex].month}
                                </p>

                                <p className="text-5xl font-bold text-yellow-500 leading-none">
                                    {news[activeIndex].day}
                                </p>

                                <p className="text-gray-600 text-sm">
                                    {news[activeIndex].weekday}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {news[activeIndex].year}
                                </p>

                            </div>

                            {/* IMAGE */}
                            <img
                                src={news[activeIndex].img}
                                className="w-full sm:w-56 h-40 rounded-xl object-cover shadow-md transition-all duration-500"
                            />

                            {/* CONTENT */}
                            <div className="flex-1 text-left">

                                <h4 className="font-semibold text-gray-800 text-lg">
                                    {news[activeIndex].title}
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                    {news[activeIndex].month} {news[activeIndex].day}, {news[activeIndex].year}
                                </p>

                                <p className="text-sm text-gray-600 mt-2">
                                    NECA is organizing programs to strengthen community connections and promote cultural exchange.
                                </p>

                                <a
                                    href="#"
                                    className="inline-block mt-3 text-sm font-medium text-gray-800 hover:text-yellow-500"
                                >
                                    {news[activeIndex].view}
                                </a>

                            </div>

                        </div>
                    </div>


                    {/* RIGHT - OTHER EVENTS */}
                    <div className="space-y-5">

                        {news
                            .filter((_, i) => i !== activeIndex)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-start opacity-80 hover:opacity-100 transition"
                                >

                                    <img
                                        src={item.img}
                                        className="w-20 h-14 object-cover rounded-md"
                                    />

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">
                                            {item.title}
                                        </h4>

                                        <p className="text-sm text-left text-gray-500 mt-1">
                                            {news[activeIndex].month} {news[activeIndex].day}, {news[activeIndex].year}
                                        </p>
                                    </div>

                                </div>
                            ))}

                    </div>

                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Newsandevents

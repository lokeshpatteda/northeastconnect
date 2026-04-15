import news from "@/pages/news"
import { useEffect, useState } from "react"
import Footer from "./Footer"
import Navigationbar from "./Navigationbar"
import RecentActivity from "./RecentActivity"


const Newsandevents = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);

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

                <div className="max-w-7xl mx-auto px-4 grid  md:grid-cols-[3fr_1.1fr] gap-10">

                    {/* LEFT - ACTIVE EVENT */}
                    <div className="transition-all duration-700">

                        <h3 className="text-lg text-left font-semibold text-gray-700 mb-4">
                            Upcoming Events
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-6 border-t pt-6 items-center">

                            {/* DATE BLOCK */}
                            <div className="text-center min-w-[80px]">

                                <p className="text-gray-600 text-sm uppercase">
                                    {news[activeIndex].month}
                                </p>
                                <div className='flex gap-2 items-center justify-center'>

                                    <p className="text-5xl font-bold text-yellow-600 leading-none">
                                        {news[activeIndex].day}
                                    </p>
                                    <p className="text-xl font-bold text-gray-800 border-l border-gray-400 pl-3">
                                        {news[activeIndex].time}
                                    </p>


                                </div>

                                <p className="text-gray-600 text-sm">
                                    {news[activeIndex].weekday}
                                </p>

                                <p className="text-xs text-gray-500">
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

                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    The program will be honored by the gracious presence of <br /> <b>Mr. Raghunath Reddy Garu,</b> Director of Continental Hospital, as the Chief Guest, along with active involvement of NECA and participation from hospital staff to ensure meaningful discussions and the success of the session.
                                </p>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="mt-3 cursor-pointer inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition"
                                >
                                    View Details
                                </button>

                            </div>
                        </div>
                    </div>


                    {/* RIGHT - OTHER EVENTS */}
                    <div className="space-y-5 text-left">

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


                    {openModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

                            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden p-4">

                                {/* HEADER IMAGE */}
                                <div className="relative">
                                    <img
                                        src={news[activeIndex].img}
                                        className="w-full h-56 object-cover rounded-t-2xl"
                                    />

                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* TITLE ON IMAGE */}
                                    <h2 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                                        {news[activeIndex].title}
                                    </h2>

                                    {/* CLOSE */}
                                    <button
                                        onClick={() => setOpenModal(false)}
                                        className="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-gray-700 hover:bg-white"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 px-0 space-y-5">

                                    {/* DATE + TIME */}
                                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-1">
                                        <div className='text-left'>
                                            <p className="text-xs text-gray-500">Date</p>
                                            <p className="font-medium text-gray-800">
                                                {news[activeIndex].month} {news[activeIndex].day}, {news[activeIndex].year}
                                            </p>
                                        </div>

                                        <div className='text-left'>
                                            <p className="text-xs text-gray-500">Time</p>
                                            <p className="font-medium text-gray-800">
                                                {news[activeIndex].time}
                                            </p>
                                        </div>
                                    </div>



                                    {/* DESCRIPTION */}
                                    <div className="text-left p-3">
                                        <p className="text-sm text-gray-500 mb-1">Description</p>
                                        <p className="text-sm text-gray-800 leading-relaxed">
                                            The program will be honored by the gracious presence of <b>Mr. Raghunath Reddy Garu</b>, Director of Continental Hospital, as the Chief Guest. The event will also include active participation from NECA and hospital staff, fostering meaningful discussions and promoting inclusivity.
                                        </p>
                                    </div>

                                    {/* LOCATION */}
                                    <div className="block md:flex items-center justify-between gap-4 px-3 border-t pt-3">

                                        <div className="flex-1 text-left">
                                            <p className="text-xs text-gray-500">Coordinator</p>

                                            <div className="font-medium text-gray-800">
                                                <h5>Dr Trilok Chandan Goud</h5>
                                                <p className='text-sm text-gray-600'>Continental Hospital, Hyderabad</p>
                                                <p className='text-sm font-bold text-gray-600'>+91 9493460031</p>
                                            </div>
                                        </div>

                                        {/* SMALL MAP */}
                                        <div className="w-full mt-3 md:mt-0 md:w-60  h-24 rounded-xl overflow-hidden shadow-sm border">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8803999142892!2d78.33688297493548!3d17.417526383474797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb947fdee4f5a1%3A0x2ca09b4d2e3a79f!2sContinental%20Hospitals!5e0!3m2!1sen!2sin!4v1776236103517!5m2!1sen!2sin"
                                                className="w-full h-full border-0"
                                                loading="lazy"
                                            ></iframe>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <RecentActivity />

            </section >
            <Footer />
        </div>
    )
}

export default Newsandevents

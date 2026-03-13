import news from "@/pages/news"
import Footer from "./Footer"
import Navigationbar from "./Navigationbar"
import { Event5 } from "@/assets/images/images"

const Newsandevents = () => {
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* LEFT SIDE - UPCOMING EVENT */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-left">
                            Upcoming Events
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-5 border-t pt-6">

                            {/* Date */}
                            <div className="text-center sm:w-16">
                                <p className="text-sm uppercase text-gray-500">APR</p>
                                <p className="text-4xl font-bold text-gray-800">02</p>
                            </div>

                            {/* Image */}
                            <img
                                src={Event5}
                                className="w-full sm:w-44 h-32 rounded-md object-cover"
                                alt="Event"
                            />

                            {/* Content */}
                            <div className="flex-1 text-left">
                                <h4 className="font-semibold text-gray-800">
                                    NECA Sensitization Program
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                    KIMS Hospital, Secunderabad
                                </p>

                                <p className="text-sm text-gray-600 mt-2">
                                    NECA is organizing a sensitization program aimed at promoting
                                    awareness and strengthening community connections between
                                    Northeast residents and local institutions.
                                </p>

                                <a
                                    href="#"
                                    className="inline-block mt-3 text-sm font-medium text-underline text-gray-800 hover:text-yellow-500"
                                >
                                    View Event Details
                                </a>
                            </div>

                        </div>
                    </div>


                    {/* RIGHT SIDE - NEWS LIST */}
                    <div className="space-y-5">

                        {news.map((news, index) => (
                            <div key={index} className="flex gap-4 items-start">

                                <img
                                    src={news.img}
                                    className="w-20 h-14 object-cover rounded-md"
                                />

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        {news.title}
                                    </h4>

                                    <p className="text-xs text-left text-gray-500">
                                        {news.date}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section >
            <Footer />
        </div>
    )
}

export default Newsandevents

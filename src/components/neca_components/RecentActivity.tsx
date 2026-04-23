
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Import extracted data and components
import activities, { type ActivityData } from "@/pages/activitiesData";
import ContinentalHospitalActivity from "./ContinentalHospitalActivity";
import KIMSHospitalActivity from "./KIMSHospitalActivity";

const RecentActivity = () => {
    const [current, setCurrent] = useState(0);
    const [api, setApi] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<ActivityData | null>(null);

    // ✅ Sync dots with carousel
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    // Data is imported from activitiesData

    return (
        <div className="max-w-7xl mx-auto px-4 mt-16">
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Recents & Activities
            </h3>

            {/* Carousel */}
            <Carousel
                setApi={setApi}
                opts={{ align: "center", loop: true }}
                plugins={[
                    Autoplay({
                        delay: 2500,
                        stopOnInteraction: false,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {activities.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/4 p-3"
                        >
                            {/* ✅ Clickable Card */}
                            <div
                                onClick={() => setSelectedItem(item)}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300"
                            >
                                {/* Image */}
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-44 object-cover"
                                />

                                {/* Content */}
                                <div className="p-4">

                                    <h4 className="text-sm text-left font-semibold text-gray-800">
                                        {item.title}
                                    </h4>
                                    <div className="flex justify-between align-center mt-2">
                                        <p className="text-xs">
                                            {item.upcome ? (
                                                <span className="text-green-600 font-medium">
                                                    {item.upcome}
                                                </span>
                                            ) : (
                                                <span className="text-gray-600 font-medium">
                                                    {item.month} {item.day}, {item.year}
                                                </span>
                                            )}
                                        </p>
                                        <div>
                                            <button className="cursor-pointer inline-flex items-center gap-1 text-xs px-2 py-1 bg-yellow-100 rounded-full font-medium text-yellow-600 hover:text-yellow-700 transition">View Details</button>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
                {activities.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${current === index
                            ? "w-6 bg-yellow-500"
                            : "w-2 bg-gray-300"
                            }`}
                    />
                ))}
            </div>

            {/* ✅ MODAL */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-6"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full md:w-[90%] max-w-6xl h-[90vh] md:h-[85vh] rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease] flex flex-col md:flex-row relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 z-20 bg-white/50 backdrop-blur-md hover:bg-white text-gray-800 p-2.5 rounded-full cursor-pointer transition-all shadow-sm"
                        >
                            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                        </button>

                        {/* Left/Top Section - Image and Basic Info */}
                        <div className="w-full md:w-2/5 lg:w-[35%] bg-gray-50 flex flex-col border-r border-gray-200 relative shrink-0">
                            <div className="relative h-64 md:h-full w-full">
                                <img
                                    src={selectedItem.img}
                                    alt={selectedItem.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-bold leading-tight text-white mb-4 drop-shadow-md">
                                        {selectedItem.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                                        <span className="bg-yellow-500 text-black px-3 py-1.5 rounded-lg shadow-sm">
                                            {selectedItem.month} {selectedItem.day}, {selectedItem.year}
                                        </span>
                                        {selectedItem.title.includes("Continental Hospital") && (
                                            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/30">
                                                Continental Hospital, HYD
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right/Bottom Section - Scrollable Content */}
                        <div className="w-full md:w-3/5 lg:w-[65%] p-6 md:p-10 lg:p-12 overflow-y-auto bg-white custom-scrollbar">
                            {selectedItem.id === "continental-hospital" ? (
                                <ContinentalHospitalActivity />
                            ) : selectedItem.id === "kims-hospital" ? (
                                <KIMSHospitalActivity />
                            ) : (
                                // Default Layout for other activities
                                <div className="space-y-6 h-full flex flex-col justify-center">
                                    <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-2 w-fit">
                                        Event Details
                                    </div>
                                    <h2 className="text-xl font-extrabold text-gray-900 mb-4">{selectedItem.title}</h2>
                                    <p className="text-gray-600 leading-relaxed  max-w-2xl">
                                        NECA organizes impactful programs that promote cultural exchange, strengthen community bonds, and support social integration across communities.
                                    </p>

                                    <div className="mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="font-bold text-gray-900 mb-2">About this event</h4>
                                        <p className="text-gray-600 text-sm">More details about this specific event will be updated soon. Stay tuned for photos, comprehensive summaries, and key takeaways from the program.</p>
                                    </div>

                                    <div className=" pt-8 mt-auto">
                                        <div className=" flex justify-end align-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900 flex items-center gap-3">
                                                    <span className="w-8 h-[0.3px] bg-gray-500 rounded-full"></span>
                                                    North-East Connect Association</p>
                                                <p className="text-xs text-gray-500">Hyderabad, Telangana</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentActivity;
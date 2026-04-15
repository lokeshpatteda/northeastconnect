
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

// ✅ Import your images
import {
    Activity1,
    Activity2,
    Activity3,
    Activity4,
    Activity5,
    Activity6,
} from "@/assets/images/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Activity = {
    img: string;
    title: string;
    month: string;
    day: string;
    weekday: string;
    year: string;
    view: string;
    upcome: string;
};

const RecentActivity = () => {
    const [current, setCurrent] = useState(0);
    const [api, setApi] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<Activity | null>(null);

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

    // ✅ DATA
    const activities: Activity[] = [
        {
            img: Activity1,
            title: "Sensitization program at KIMS Hospital",
            month: "Apr",
            day: "02",
            weekday: "Thursday",
            year: "2026",
            upcome: "",
            view: "View Details",
        },
        {
            img: Activity2,
            title: "Cultural Exchange Program",
            month: "Apr",
            day: "05",
            weekday: "Sunday",
            year: "2026",
            upcome: "Upcoming",
            view: "View Details",
        },
        {
            img: Activity3,
            title: "Health Awareness Camp",
            month: "Apr",
            day: "10",
            weekday: "Friday",
            year: "2026",
            upcome: "Upcoming",
            view: "View Details",
        },
        {
            img: Activity4,
            title: "Community Meetup",
            month: "Apr",
            day: "15",
            weekday: "Wednesday",
            year: "2026",
            upcome: "Upcoming",
            view: "View Details",
        },
        {
            img: Activity5,
            title: "Youth Engagement Program",
            month: "Apr",
            day: "20",
            weekday: "Monday",
            year: "2026",
            upcome: "Upcoming",
            view: "View Details",
        },
        {
            img: Activity6,
            title: "Social Awareness Drive",
            month: "Apr",
            day: "25",
            weekday: "Saturday",
            year: "2026",
            upcome: "Upcoming",
            view: "View Details",
        },
    ];

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
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        {item.title}
                                    </h4>

                                    <p className="text-xs mt-2">
                                        {item.upcome ? (
                                            <span className="text-green-600 font-medium">
                                                {item.upcome}
                                            </span>
                                        ) : (
                                            <span className="text-yellow-600 font-medium">
                                                {item.month} {item.day}, {item.year}
                                            </span>
                                        )}
                                    </p>


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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-[90%] max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease]"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={selectedItem.img}
                                alt={selectedItem.title}
                                className="w-full h-64 object-cover"
                            />

                            {/* Close */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full cursor-pointer hover:bg-white"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {selectedItem.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {selectedItem.month} {selectedItem.day}, {selectedItem.year}
                            </p>

                            <p className="text-gray-600 mt-4 leading-relaxed">
                                NECA organizes impactful programs that promote cultural
                                exchange, strengthen community bonds, and support social
                                integration across communities.
                            </p>

                            <button className="mt-5 px-5 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentActivity;
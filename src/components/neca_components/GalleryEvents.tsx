import { useState } from "react";
import Navigationbar from "./Navigationbar";
import Footer from "./Footer";
import {
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import { Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6, Gallerykims1, Gallerykims2, Gallerykims3, Gallerykims4 } from "@/assets/images/images";

const Gallery = () => {

    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const galleryData = [
        {
            title: "KIMS Hospital Sensitisation",
            count: 6,
            images: [Gallerykims1, Gallerykims2, Gallerykims3, Gallerykims4],
        },
        {
            title: "Continental Hospital Sensitisation",
            count: 4,
            images: [Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6],
        },

    ];

    // 👉 NEXT IMAGE
    const nextImage = () => {
        if (selectedAlbum && activeIndex !== null) {
            setActiveIndex((activeIndex + 1) % selectedAlbum.images.length);
        }
    };

    // 👉 PREV IMAGE
    const prevImage = () => {
        if (selectedAlbum && activeIndex !== null) {
            setActiveIndex(
                (activeIndex - 1 + selectedAlbum.images.length) %
                selectedAlbum.images.length
            );
        }
    };

    return (
        <>
            <Navigationbar />

            <section className="py-16 bg-gray-100">

                <div className="max-w-7xl mx-auto px-4">

                    <div className="text-center mb-12">
                        <p className="text-green-600">Our Moments</p>
                        <h2 className="text-4xl font-bold">Photo Gallery</h2>
                    </div>

                    {/* ================== ALBUM VIEW ================== */}
                    {!selectedAlbum && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {galleryData.map((album, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedAlbum(album)}
                                    className="cursor-pointer group"
                                >

                                    <div className="grid grid-cols-2 gap-3 shadow-md">

                                        {album.images.slice(0, 4).map((img: any, i: number) => (
                                            <img
                                                key={i}
                                                src={img}
                                                className="h-28 w-full object-cover rounded-lg group-hover:scale-105 transition"
                                            />
                                        ))}

                                    </div>

                                    <div className="mt-3 text-left">
                                        <h3 className="font-semibold">{album.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {album.count} Photos
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                    {/* ================== ALBUM IMAGES ================== */}
                    {selectedAlbum && activeIndex === null && (
                        <div>

                            {/* Back */}
                            <div className="flex items-center justify-end">
                                <button
                                    onClick={() => setSelectedAlbum(null)}
                                    className="mb-4 text-black text-sm font-medium cursor-pointer p-2 px-4 bg-yellow-500  rounded-full hover:bg-yellow-600  transition-all duration-300"
                                >
                                    Back to Albums
                                </button>
                            </div>

                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                                {selectedAlbum.images.map((img: any, i: number) => (
                                    <img
                                        key={i}
                                        src={img}
                                        onClick={() => setActiveIndex(i)}
                                        className="h-64 w-full object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                                    />
                                ))}

                            </div>

                        </div>
                    )}

                    {/* ================== SLIDER ================== */}
                    {activeIndex !== null && selectedAlbum && (
                        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

                            {/* CLOSE */}
                            <button
                                className="absolute top-5 right-5 text-white"
                                onClick={() => setActiveIndex(null)}
                            >
                                <X size={30} />
                            </button>

                            {/* LEFT */}
                            <button
                                onClick={prevImage}
                                className="absolute left-5 text-white"
                            >
                                <ChevronLeft size={40} />
                            </button>

                            {/* IMAGE */}
                            <img
                                src={selectedAlbum.images[activeIndex]}
                                className="max-w-[90%] max-h-[80%] rounded-xl"
                            />

                            {/* RIGHT */}
                            <button
                                onClick={nextImage}
                                className="absolute right-5 text-white"
                            >
                                <ChevronRight size={40} />
                            </button>

                        </div>
                    )}

                </div>

            </section>

            <Footer />
        </>
    );
};

export default Gallery;
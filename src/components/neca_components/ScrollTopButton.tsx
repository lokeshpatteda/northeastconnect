import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollTopButton = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <button
                onClick={scrollToTop}
                className="bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 border-4 border-gray-100 cursor-pointer"
            >
                <FaArrowUp />
            </button>
        </div>
    );
};

export default ScrollTopButton;
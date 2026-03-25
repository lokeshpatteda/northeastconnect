import { Event1, Event2, Event3, Event4, Event5, Event8, Event9, IntroImage, Partner } from '@/assets/images/images';
import members from '@/pages/membersdata';
import news from '@/pages/news';
import getinvolved from '@/pages/textdata';
import { faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircleFadingPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navigationbar from './Navigationbar';
import RecentActivity from './RecentActivity';


const LandingPage = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [Event1, Event2, Event3, Event4, Event5, Event8, Event9];

    useEffect(() => {
        const slider = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(slider);
    }, [images.length]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % news.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div>
                <Navigationbar />
                {/* herosection */}
                <section className="relative h-[80vh] w-full overflow-hidden" id="home">

                    {/* Background Slides */}
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                                } animate-[zoom_20s_infinite]`}
                            style={{ backgroundImage: `url(${img})` }}
                        ></div>
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 text-white">

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className='text-yellow-400'> Bridging </span> Communities,  <span className='text-yellow-400'> Building </span> Bonds
                        </h1>

                        <p className="max-w-3xl text-lg md:text-xl mb-8">
                            Welcome to the North-East Connect Association (NECA). We are dedicated
                            to fostering a unified, inclusive society where individuals from
                            Northeast India can thrive as integral members of the Telangana
                            community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/events">
                                <button className="px-6 py-3 bg-yellow-400 text-black cursor-pointer rounded-full font-medium hover:bg-yellow-500">
                                    Upcoming Events
                                </button>
                            </Link>
                            <Link to="/membership">
                                <button className="px-6 py-3 border border-white rounded-full cursor-pointer font-medium hover:bg-white hover:text-black">
                                    Support Our Work <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </Link>
                        </div>

                    </div>
                </section>
                {/* herosection */}

                <section className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                        {/* left Content */}
                        <div>

                            <h2 className="text-4xl font-bold text-left text-gray-800 mb-3">
                                Building a Stronger Community
                            </h2>

                            <div className="w-20 h-1 bg-yellow-500 mb-6"></div>

                            <p className="text-gray-600 mb-6 text-left leading-relaxed">
                                NECA is a registered non-profit society in Telangana, established to
                                facilitate the seamless integration and assimilation of people from
                                Northeast India into the social, cultural, and economic fabric of
                                the state.
                            </p>

                            <p className="text-gray-600 mb-8 text-left leading-relaxed">
                                We believe in the power of mutual understanding and shared
                                experiences to build a harmonious and vibrant community for all.
                            </p>

                            {/* Bullet Points */}
                            <div className="space-y-4">

                                <div className="flex items-start gap-3">
                                    <FontAwesomeIcon icon={faCircleCheck} className="text-yellow-500 text-lg pt-2" />
                                    <p className="text-gray-700 text-left">
                                        Promoting cultural exchange and understanding between Northeast
                                        communities and the people of Telangana.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3 text-left">
                                    <FontAwesomeIcon icon={faCircleCheck} className="text-yellow-500 text-lg pt-2" />
                                    <p className="text-gray-700">
                                        Organizing community events, networking opportunities, and
                                        professional workshops.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3 text-left">
                                    <FontAwesomeIcon icon={faCircleCheck} className="text-yellow-500 text-lg pt-2" />
                                    <p className="text-gray-700">
                                        Supporting members through shared experiences, collaboration,
                                        and community engagement.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* right Image */}
                        <div>
                            <img
                                src={IntroImage}
                                alt="NECA Community"
                                className=" h-full object-cover"
                            />
                        </div>

                    </div>
                </section>

                <section className="py-10">
                    <div className="max-w-5xl mx-auto px-6">
                        {/* Heading */}
                        <div className="text-center mb-16">
                            <p className="text-green-600 font-medium">
                                Join Our Mission
                            </p>

                            <h2 className="text-4xl font-bold text-gray-800 mt-2">
                                Get <span className="text-yellow-500">Involved</span> With NECA
                            </h2>
                        </div>

                        {/* Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {getinvolved.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                                >

                                    {/* Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            className="h-[25vh] w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
                                        />

                                        <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs px-4 py-1 rounded-full">
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col h-[32vh]">
                                        <div className=''>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-500 text-left text-sm mb-4">
                                                {item.text}
                                            </p>

                                            {/* Benefits */}
                                            <ul className="text-sm text-gray-600 text-left space-y-1 ps-4 mb-4">
                                                {item.benefits.map((benefit, i) => (
                                                    <li className='list-disc' key={i}> {benefit}</li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>

                                    <div className='mx-3 mb-3 p-4 bg-gray-50 rounded-lg mt-auto'>
                                        {/* Progress style bar */}
                                        {/* <div className="flex justify-between text-sm text-gray-500 mb-3">
                                            <span>Community Impact</span>
                                            <span>{item.progress}%</span>
                                        </div>

                                        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                                            <div
                                                className="bg-yellow-400 h-2 rounded-full"
                                                style={{ width: `${item.progress}%` }}
                                            ></div>
                                        </div> */}

                                        {/* Button */}
                                        <Link to="/membership">
                                            <button className="w-50 cursor-pointer border border-gray-800 text-gray-800 py-2 rounded-full hover:bg-gray-800 hover:text-white transition">
                                                {item.button}
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                <section className="relative w-full h-[420px] overflow-hidden">

                    {/* Background Image */}
                    <img
                        src={Event8}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="NECA Community"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/60 to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6 text-white">

                        <div className="max-w-2xl">

                            <p className="text-yellow-400 font-medium mb-3">
                                North-East Connect Association
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                Building Bridges Between Communities
                            </h2>

                            <p className="text-gray-200 mb-6">
                                NECA fosters cultural exchange, community support, and professional
                                networking to help people from Northeast India integrate into the
                                vibrant social and economic life of Telangana.
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-4">

                                <button className="px-6 py-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30">
                                    Discover More
                                </button>
                                <Link to="/membership">
                                    <button className="px-6 py-3 bg-yellow-400 text-black rounded-full cursor-pointer    hover:bg-yellow-500">
                                        Join NECA
                                    </button>
                                </Link>


                            </div>

                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 w-full overflow-hidden leading-none">
                        <svg
                            viewBox="0 0 1440 150"
                            className="w-full h-16"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,80 C300,150 600,0 900,80 C1100,130 1300,120 1440,60 L1440,150 L0,150 Z"
                                fill="#ffffff"
                            ></path>
                        </svg>
                    </div>

                </section>

                <section className="py-20 ">
                    <div className="max-w-7xl mx-auto px-6">

                        <div className="text-center mb-16">
                            <p className="text-green-600 font-medium">
                                Our Leadership
                            </p>

                            <h2 className="text-4xl font-bold text-gray-800 mb-3">
                                Founding <span className="text-yellow-500">Members</span>
                            </h2>
                            <p className='text-gray-500'>Our association is guided by a dedicated team of office bearers and executive committee
                                members.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                            {members.map((member, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/member/${member.id}`)}
                                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-500 overflow-hidden cursor-pointer "
                                >

                                    {/* Image */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-72 object-cover cursor-pointer grayscale group-hover:grayscale-0 transform transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0  transition"></div>

                                        {/* Plus Icon Group */}
                                        <div className="absolute bottom-4 right-4 group/plus">

                                            {/* Plus Button */}
                                            <div className="bg-yellow-400 p-3 rounded-full cursor-pointer hover:rotate-45 transition duration-300">
                                                <CircleFadingPlus />
                                            </div>

                                            {/* Floating Social Icons */}
                                            <div className="absolute bottom-14 right-0 flex flex-col items-center gap-3">

                                                <div className="bg-white p-2 rounded-full shadow hover:bg-yellow-400 cursor-pointer
      opacity-0 translate-y-4
      group-hover/plus:opacity-100
      group-hover/plus:translate-y-0
      transition duration-300 delay-75">
                                                    <FaFacebookF />
                                                </div>

                                                <div className="bg-white p-2 rounded-full shadow hover:bg-yellow-400 cursor-pointer
      opacity-0 translate-y-4
      group-hover/plus:opacity-100
      group-hover/plus:translate-y-0
      transition duration-300 delay-150">
                                                    <FaLinkedinIn />
                                                </div>

                                                <div className="bg-white p-2 rounded-full shadow hover:bg-yellow-400 cursor-pointer
      opacity-0 translate-y-4
      group-hover/plus:opacity-100
      group-hover/plus:translate-y-0
      transition duration-300 delay-300">
                                                    <FaTwitter />
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center transition-all duration-500 bg-transparent group-hover:bg-black/80">
                                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-white transition-colors duration-500">
                                            {member.name}
                                        </h3>

                                        <p className="text-yellow-500 text-sm mt-1">
                                            {member.role}
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </section>


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

                                    <p className="text-gray-600 text-sm uppercase">
                                        {news[activeIndex].month}
                                    </p>

                                    <p className="text-5xl font-bold text-yellow-600 leading-none">
                                        {news[activeIndex].day}
                                    </p>

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
                    <RecentActivity />

                </section>


                <section className="py-10" id="contact">


                    <div className="text-center mb-16">
                        <p className="text-green-600 font-medium">
                            Get In Touch
                        </p>

                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            Contact <span className="text-yellow-500">Us</span>
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

            </div >
        </>
    )
}

export default LandingPage


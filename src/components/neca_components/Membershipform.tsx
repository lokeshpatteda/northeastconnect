import { Necalogo } from "@/assets/images/images";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "./Footer";

const Membershipform = () => {

    const navigate = useNavigate();

    const [previewOpen, setPreviewOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        occupation: "",
        membership: "General Membership",
        message: "",
    });

    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            if (photo) {
                data.append('profileImage', photo);
            }

            // Save to shared Backend for Admin Portal
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/memberships`, {
                method: 'POST',
                body: data
            });

            if (!response.ok) throw new Error('Failed to submit form');

            const newSubmission = await response.json();
            console.log("Form Submitted to Backend with Image", newSubmission);
            
            toast.success("Subscription successful! Your application has been sent to our admin team.");
            navigate("/home");
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="py-20 bg-gray-50">

                <div className="max-w-5xl mx-auto px-0 md:px-6">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <p className="text-green-600 font-medium">
                            Join With Us
                        </p>
                        <h2 className="text-4xl font-bold text-gray-800">
                            Join NECA <span className="text-yellow-500"> Community </span>
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Become part of the North-East Connect Association and contribute
                            to building a stronger and <br /> inclusive community in Telangana.
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-lg rounded-2xl p-10"
                    >
                        <div className="flex justify-between p-4 px-0 pb-6 mb-6 border-b flex items-center">
                            <img src={Necalogo} className="h-12" />
                            <button
                                type="button"
                                onClick={() => setPreviewOpen(true)}
                                className=" bg-yellow-400 hover:bg-yellow-500 cursor-pointer px-8 py-3 rounded-full font-semibold font-semibold py-3 rounded-full transition"
                            >
                                Preview
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 text-left gap-6">
                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-sm font-medium">Phone Number</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="+91"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="text-sm font-medium">City</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Your city"
                                />
                            </div>

                            {/* Occupation */}
                            <div>
                                <label className="text-sm font-medium">Occupation</label>
                                <input
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Student / Professional / Business"
                                />
                            </div>

                            {/* Membership */}
                            <div>
                                <label className="text-sm font-medium">Membership Interest</label>
                                <select
                                    name="membership"
                                    value={formData.membership}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400" >
                                    <option>General Membership</option>
                                    <option>Volunteer</option>
                                    <option>Partner / Organization</option>
                                </select>
                            </div>

                            {/* Upload */}
                            <div className="md:col-span-3">

                                <label className="text-sm font-medium">
                                    Upload Profile Photo
                                </label>

                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    className="mt-3 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-yellow-400 cursor-pointer"
                                >

                                    <p className="text-gray-500">
                                        Drag & Drop your photo here
                                    </p>

                                    <p className="text-sm text-gray-400 mt-1">or</p>

                                    <label className="text-yellow-500 font-semibold cursor-pointer">
                                        Browse File
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleBrowse}
                                        />
                                    </label>

                                    {photoPreview && (
                                        <img
                                            src={photoPreview}
                                            className="w-24 h-24 rounded-full mx-auto mt-4 object-cover"
                                        />
                                    )}

                                </div>

                            </div>

                            {/* Message */}
                            <div className="md:col-span-3">
                                <label className="text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={(e) => handleChange(e)}
                                    rows={4}
                                    placeholder="Tell us why you want to join NECA"
                                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                        </div>

                        {/* Submit */}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={() => navigate("/home")}
                                className=" bg-gray-200 border border-gray-300 hover:bg-gray-300 cursor-pointer px-8 py-3 rounded-full font-semibold text-black font-semibold py-3 rounded-full transition"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 cursor-pointer rounded-full font-semibold"
                            >
                                Submit
                            </button>

                        </div>

                    </form>

                </div>

                {/* Preview Modal */}
                {previewOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

                        <div className="bg-white rounded-2xl shadow-xl w-[520px] p-8">

                            <h3 className="text-2xl font-semibold text-center mb-6">
                                Details Preview
                            </h3>

                            {/* Photo Preview */}
                            {photoPreview && (
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={photoPreview}
                                        alt="Profile Preview"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-md"
                                    />
                                </div>
                            )}

                            {/* Info Table */}
                            <table className="w-full text-left border-collapse">

                                <tbody className="text-gray-700">

                                    <tr className="border-b">
                                        <td className="py-3 font-semibold w-40">Full Name</td>
                                        <td className="py-3">{formData.name}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="py-3 font-semibold">Email</td>
                                        <td className="py-3">{formData.email}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="py-3 font-semibold">Phone</td>
                                        <td className="py-3">{formData.phone}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="py-3 font-semibold">City</td>
                                        <td className="py-3">{formData.city}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="py-3 font-semibold">Occupation</td>
                                        <td className="py-3">{formData.occupation}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="py-3 font-semibold">Membership</td>
                                        <td className="py-3">{formData.membership}</td>
                                    </tr>

                                    <tr>
                                        <td className="py-3 font-semibold align-top">Message</td>
                                        <td className="py-3">{formData.message}</td>
                                    </tr>

                                </tbody>

                            </table>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-8">

                                <button
                                    onClick={() => setPreviewOpen(false)}
                                    className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                >
                                    Close
                                </button>

                                <button
                                    className="px-5 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 font-semibold transition"
                                >
                                    Confirm
                                </button>

                            </div>

                        </div>
                    </div>
                )}

            </section>
            <Footer />
        </>
    );
};

export default Membershipform;
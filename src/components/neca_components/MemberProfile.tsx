import { Necalogo } from "@/assets/images/images";
import members from "@/pages/membersdata";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const MemberProfile = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const member = members.find((m) => m.id === id);

    if (!member) return <div>Member not found</div>;

    return (
        <>
            <section className="py-10 bg-gray-50">


                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
                    <div className="flex justify-between p-4 pt-0 pb-6 mb-6 border-b flex items-center">
                        <img src={Necalogo} className="h-12" />


                        <button
                            onClick={() => navigate(-1)}
                            className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full font-semibold font-semibold py-3 rounded-full transition"
                        >
                            Back
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="flex gap-6 items-center mb-10">

                            <img
                                src={member.img}
                                className="w-40 h-40 rounded-full object-cover border-6 border-grey-800"
                            />

                            <div className="text-left">
                                <h1 className="text-3xl font-bold">{member.name}</h1>
                                <p className="text-yellow-500 font-semibold">{member.role}</p>
                                <p className="text-gray-600 font-semibold">{member.degustation}</p>
                            </div>

                        </div>

                        <div className="text-left mb-6">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title1}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.bio}
                            </p>
                        </div>

                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title2}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.subbio}
                            </p>
                            {member.minstylist && (
                                <ul className="list-disc pl-7 text-gray-600 leading-relaxed mt-3">
                                    {member.minstylist.map((item, index) => {
                                        const [title, description] = item.split(":");
                                        return (
                                            <li key={index}>
                                                <span className="font-semibold text-black-600">{title}:</span> {description}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            <p className="text-gray-600 leading-relaxed pt-3">
                                {member.subbio2}
                            </p>
                        </div>

                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title3}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.childbio}
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-3">
                                {member.childbio2}
                            </p>
                            <div className="space-y-4 pl-4 my-3">
                                {member.special?.map((item, index) => (
                                    <div key={index} className="">
                                        <h3 className="font-semibold text-gray-800">
                                            {item.subtitle}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.subdata}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title4}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.subchildbio}
                            </p>

                            <p className="text-gray-600 leading-relaxed mt-3">
                                {member.subchildbio2}
                            </p>

                            <div className="space-y-4 pl-4 my-3">
                                {member.subinfo?.map((item, index) => (
                                    <div key={index} className="">
                                        <h3 className="font-semibold text-gray-800">
                                            {item.subtitle}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.subdata}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title5}
                            </h2>

                            <div className="text-gray-600 leading-relaxed">
                                {member.minsubbio}
                            </div>

                            <div className="text-gray-600 leading-relaxed mt-3">
                                {member.minsubbio2}
                            </div>
                            {member.awards && (
                                <ul className="list-disc pl-7 text-gray-600 leading-relaxed">
                                    {member.awards.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title6}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.subminbio}
                            </p>

                            <p className="text-gray-600 leading-relaxed mt-4">
                                {member.subminbio2}
                            </p>

                        </div>

                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title7}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.lowsubbio}
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-3">
                                {member.lowsubbio2}
                            </p>
                        </div>
                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title8}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.lowsubbio4}
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-5">
                                {member.lowsubbio5}
                            </p>
                        </div>
                        <div className="text-left mb-4">
                            <h2 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-2">
                                {member.title9}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {member.lowsubbio3}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default MemberProfile;

const KIMSHospitalActivity = () => {
    return (
        <div className="space-y-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                    Program Overview
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    KIMS Hospitals and NECA Host Cultural Awareness
                </h2>
                <h4 className="font-medium text-gray-500 mt-2">
                    Secunderabad
                </h4>
            </div>

            <p className="text-gray-600">
                Telangana Director General of Police (Law & Order) M. Mahesh Bhagwat on Thursday said there is a need to further strengthen the cultural bond between Telangana and the North-Eastern States. He was speaking as the chief guest at a cultural awareness programme on the heritage and traditions of the North-East, jointly organised by KIMS Hospitals and the North East Connect Association (NECA) at KIMS Hospitals, Secunderabad.
            </p>

            {/* Event Highlights */}
            <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Highlights</h3>
                <p className="text-gray-700 mb-4">
                    The program brought together healthcare professionals, administrators, and community members to discuss practical strategies for inclusive patient care.
                </p>
                <ul className="space-y-5">
                    <li className="flex items-start gap-3 text-left">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span><strong>Mr. Bhagwat -</strong> said such initiatives play a vital role in enhancing awareness about the history, culture, traditions and languages of the North-Eastern States. He noted that a large number of people from the region are contributing to Telangana, particularly Hyderabad, in sectors such as healthcare, education and other professions, and stressed the importance of respecting and preserving their cultural identity.</span>
                    </li>
                    <li className="flex items-start gap-3 text-left">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span><strong>Dr. B. Bhaskar Rao -</strong> Chairman and Managing Director of KIMS Group of Hospitals, who attended as the guest of honour, said many professionals from the North-Eastern States serve in the group's hospitals across nursing, paramedical and other departments. The programme, he said, was organised to promote a better understanding of their unique culture and way of life while fostering a more inclusive and welcoming work environment.</span>
                    </li>

                    <li className="flex items-start gap-3 text-left">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span><strong>Paparrao Biyyala - </strong> Among those present were Paparrao Biyyala, President of NECA and retired IAS officer; Gautam Sawang, Vice-President of NECA and retired IPS officer; Stephen Ronojit Sen, Treasurer; Board Member Dr. K. Rajeswara Rao (Retd. IAS); Sridhar Muppidi; Dr. Sambit Sahu, Director – Medical Operations, KIMS Hospitals; and members of the North-Eastern community residing in Hyderabad.</span>
                    </li>
                </ul>
            </div>

            {/* Impact */}
            <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
                    Program Impact
                </h3>
                <p className="text-gray-700 text-left" >
                    The programme concluded with vibrant cultural performances, including the traditional Bihu dance of Assam, a showcase of traditional attire representing all eight North-Eastern States, and a Manipuri dance performance, all of which received an enthusiastic response from the audience.
                </p>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl shadow-lg mt-6">
                <p className="text-white  italic leading-relaxed">Telangana–North East Cultural Bond Should Grow Stronger: DGP Mahesh Bhagwat"</p>
            </div>

            {/* Footer Signature */}
            <div className="flex justify-end pt-10 mt-10 border-t border-gray-100">
                <div className="text-right flex items-center gap-4">

                    <div>
                        <p className="text-base font-bold text-gray-900 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-gray-500 rounded-full"></span>
                            North-East Connect Association (NECA-Team)</p>
                        <p className="text-sm text-gray-500">Hyderabad, Telangana</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KIMSHospitalActivity;

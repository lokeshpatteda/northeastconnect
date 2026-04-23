
const KIMSHospitalActivity = () => {


    return (
        <div className="space-y-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                    Program Overview
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    Sensitization Program at KIMS Hospital
                </h2>
                <h4 className="font-medium text-gray-500 mt-2">
                    Healthcare Environment
                </h4>
            </div>

            <p className="text-gray-600">
                The North East Connect Association (NECA) organized a vital sensitization program at KIMS Hospital, focusing on improving cultural awareness and addressing the unique challenges faced by Northeast Indians in healthcare settings.
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
                        <span><strong>Interactive Workshops:</strong> Engaging sessions designed to help medical staff recognize and mitigate unconscious bias.</span>
                    </li>
                    <li className="flex items-start gap-3 text-left">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span><strong>Cultural Exchange:</strong> Open dialogues promoting a better understanding of the diverse traditions from the eight states of Northeast India.</span>
                    </li>
                    <li className="flex items-start gap-3 text-left">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span><strong>Policy Discussions:</strong> Review of existing hospital guidelines to ensure they support an equitable and respectful environment for all patients and staff.</span>
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
                    Initiatives like the sensitization program at KIMS Hospital are crucial steps towards building trust between healthcare institutions and the communities they serve. By prioritizing empathy and cultural competence, we are working to ensure that every individual receives care with dignity.
                </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-10 text-center">
                <h4 className="font-bold text-gray-900 mb-2">More Updates Coming Soon</h4>
                <p className="text-gray-600 text-sm">Detailed summaries, photos, and key takeaways from the KIMS Hospital event will be published shortly.</p>
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

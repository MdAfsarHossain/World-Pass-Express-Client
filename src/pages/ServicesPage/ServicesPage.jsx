import { useEffect } from "react";
import { FaBusinessTime } from "react-icons/fa6";
import { GrUserFemale } from "react-icons/gr";
import { MdOutlineMedicalServices, MdTravelExplore } from "react-icons/md";
import { PiOfficeChair, PiStudentDuotone } from "react-icons/pi";
import { Typewriter } from "react-simple-typewriter";

const ServicesPage = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <div className="mt-10">
            {/* Heading */}
            <div className="">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
                    World{" "}
                    <span className="text-green-600">
                        <Typewriter
                            words={["Pass Express"]}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>{" "}
                    Services
                </h1>
            </div>

            {/* Services */}
            <div className="px-5 md:px-5 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-10 mt-10 mb-20">
                {/* Tourist Visa */}
                <div className="bg-gray-50 shadow-lg hover:shadow-2xl transition-all border-0 px-5 py-5  rounded-xl flex flex-row gap-2 justify-center items-start">
                    <div className="">
                        <MdTravelExplore className="text-7xl text-amber-500" />
                    </div>
                    <div className="">
                        <h1 className="text-xl lg:text-2xl font-bold uppercase text-slate-700">
                            Tourist Visa
                        </h1>
                        <p>
                            A short-term visa allowing individuals to visit a country for
                            leisure, sightseeing, or visiting friends and family. It typically
                            prohibits work or business activities.
                        </p>
                    </div>
                </div>

                {/* Student Visa */}
                <div className="bg-gray-50 shadow-lg hover:shadow-2xl transition-all border-0 px-5 py-5  rounded-xl flex flex-row gap-2 justify-center items-start">
                    <div className="">
                        <PiStudentDuotone className="text-7xl text-amber-500" />
                    </div>
                    <div className="">
                        <h1 className="text-xl lg:text-2xl font-bold uppercase text-slate-700">
                            Student Visa
                        </h1>
                        <p>
                            Granted to individuals pursuing educational courses in foreign
                            institutions. It is usually tied to the duration of the course and
                            may allow limited work rights.
                        </p>
                    </div>
                </div>

                {/* Official Visa */}
                <div className="bg-gray-50 shadow-lg hover:shadow-2xl transition-all border-0 px-5 py-5  rounded-xl flex flex-row gap-2 justify-center items-start">
                    <div className="">
                        <PiOfficeChair className="text-7xl text-amber-500" />
                    </div>
                    <div className="">
                        <h1 className="text-xl lg:text-2xl font-bold uppercase text-slate-700">
                            Official Visa
                        </h1>
                        <p>
                            Issued to government officials and diplomats traveling for
                            official duties or international assignments. It often comes with
                            diplomatic privileges.
                        </p>
                    </div>
                </div>

                {/* Business Visa */}
                <div className="bg-gray-50 shadow-lg hover:shadow-2xl transition-all border-0 px-5 py-5  rounded-xl flex flex-row gap-2 justify-center items-start">
                    <div className="">
                        <FaBusinessTime className="text-7xl text-amber-500" />
                    </div>
                    <div className="">
                        <h1 className="text-xl lg:text-2xl font-bold uppercase text-slate-700">
                            Business Visa
                        </h1>
                        <p>
                            Allows travelers to visit a country for business-related purposes
                            such as attending meetings, conferences, or exploring investment
                            opportunities. It does not permit full-time employment.
                        </p>
                    </div>
                </div>

                {/* Medical Visa */}
                <div className="bg-gray-50 shadow-lg hover:shadow-2xl transition-all border-0 px-5 py-5  rounded-xl flex flex-row gap-2 justify-center items-start">
                    <div className="">
                        <MdOutlineMedicalServices className="text-7xl text-amber-500" />
                    </div>
                    <div className="">
                        <h1 className="text-xl lg:text-2xl font-bold uppercase text-slate-700">
                            Medical Visa
                        </h1>
                        <p>
                            Granted to those seeking medical treatment in another country. It
                            may require documentation from medical institutions confirming the
                            need for treatment.
                        </p>
                    </div>
                </div>

                {/* Spouse Visa */}
                <div className="bg-gray-50 shadow-lg hover:shadow-2xl transition-all border-0 px-5 py-5  rounded-xl flex flex-row gap-2 justify-center items-start">
                    <div className="">
                        <GrUserFemale className="text-7xl text-amber-500" />
                    </div>
                    <div className="">
                        <h1 className="text-xl lg:text-2xl font-bold uppercase text-slate-700">
                            Spouse Visa
                        </h1>
                        <p>
                            Issued to individuals joining their spouse who resides or works in
                            a foreign country. It often requires proof of marriage and may
                            allow work rights, depending on the country’s policies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
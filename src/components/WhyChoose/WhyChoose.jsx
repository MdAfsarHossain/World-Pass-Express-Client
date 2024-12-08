import CountUp from "react-countup";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { LiaUniversitySolid } from "react-icons/lia";

const WhyChoose = () => {
  return (
    <div className="bg-[url(https://i.ibb.co.com/dQXMqDr/airoplane.jpg)] py-0 bg-fixed bg-cover">
      <div className="hero-overlay bg-opacity-40 rounded-lg pt-16 pb-10">
        {/* Heading */}
        <div className="flex flex-col justify-center items-center text-center gap-3 border-0">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold uppercase text-white ">
            Why Choose World Pass Express?
          </h1>
          <p className="px-5 lg:px-0 lg:w-2/3 mx-auto text-gray-300 text-lg">
            World Pass Express is your one-stop solution for all visa-related
            needs, offering a seamless platform to access comprehensive visa
            information, apply online, and track your application status.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around items-center px-20 py-16 gap-12">
          {/* Students */}
          <div className="flex flex-col justify-center items-center md:items-start  border-0 gap-3 bg-black bg-opacity-30 p-3 rounded-lg">
            <div className="text-center">
              <FaUserGraduate className="text-6xl text-amber-500" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-start">
              <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
                <CountUp end={750} enableScrollSpy />+
              </h1>
              <h1 className="text-gray-200 text-xl md:text-3xl font-bold uppercase">
                Students
              </h1>
            </div>
          </div>

          {/* Universities */}
          <div className="flex flex-col justify-center items-center md:items-start border-0 gap-3 bg-black bg-opacity-30 p-3 rounded-lg">
            <div className="text-center">
              <LiaUniversitySolid className="text-6xl text-amber-500" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-start">
              <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
                <CountUp end={120} enableScrollSpy />+
              </h1>
              <h1 className="text-gray-100 text-xl md:text-3xl font-bold uppercase">
                Universities
              </h1>
            </div>
          </div>

          {/* Countries */}
          <div className="flex flex-col justify-center items-center md:items-start border-0 gap-3 bg-black bg-opacity-30 p-3 rounded-lg">
            <div className="text-center">
              <AiOutlineGlobal className="text-6xl text-amber-500" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-start">
              <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
                <CountUp end={90} enableScrollSpy />+
              </h1>
              <h1 className="text-gray-100 text-xl md:text-3xl font-bold uppercase">
                Countries
              </h1>
            </div>
          </div>

          {/* Immigrations */}
          <div className="flex flex-col justify-center items-center md:items-start border-0 gap-1 bg-black bg-opacity-30 p-3 rounded-lg">
            <div className="text-center">
              <IoIosPeople className="text-6xl text-amber-500" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-start">
              <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
                <CountUp end={950} enableScrollSpy />+
              </h1>
              <h1 className="text-gray-100 text-xl md:text-3xl font-bold uppercase">
                Immigrations
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;

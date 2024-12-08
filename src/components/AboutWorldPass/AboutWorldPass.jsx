import React from "react";
import { Typewriter } from "react-simple-typewriter";

const AboutWorldPass = () => {
  return (
    <div>
      {/* Heading */}
      <div className="mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
          About{" "}
          <span className="text-green-600">
            <Typewriter
              words={["World Pass"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>{" "}
          Express
        </h1>
      </div>

      <div className="px-5 lg:px-0 flex flex-col lg:flex-row gap-10 mt-14 justify-center items-center">
        <div className=" flex-1 grid grid-cols-4 grid-rows-4 border-0 gap-5">
          <img
            className="w-full h-full col-span-2 row-span-2 rounded-xl"
            src="https://plus.unsplash.com/premium_photo-1677529498680-fdb9d5ee762a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            className="w-full h-full col-span-2 row-span-4 rounded-xl"
            src="https://images.unsplash.com/photo-1694633993779-f4bc997985ec?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            className="w-full h-full col-span-2 row-span-2 rounded-xl"
            src="https://plus.unsplash.com/premium_photo-1677529497024-00d7310248bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col  gap-5">
          <h1 className="text-lg md:text-xl lg:text-2xl text-justify">
            <span className="font-bold text-green-500 text-2xl">
              World Pass Express
            </span>{" "}
            is a user-friendly platform designed to simplify the visa
            application process for travelers worldwide. It offers a seamless
            experience, allowing users to:
          </h1>

          <ul className="text-lg lg:text-xl flex flex-col gap-2 lg:gap-5 list-disc px-10 ">
            <li>
              <span className="font-bold">Explore Visa Requirements:</span>{" "}
              Search for different visa types based on country, purpose, and
              processing time.
            </li>
            <li>
              <span className="font-bold">Apply Online:</span> Submit
              applications directly through the portal with easy-to-follow
              instructions.
            </li>
            <li>
              <span className="font-bold">Track Applications:</span> Stay
              updated on the status of visa submissions with real-time updates.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutWorldPass;

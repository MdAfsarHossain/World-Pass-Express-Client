import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import SingleVisaCard from "../SingleVisaCard/SingleVisaCard";

const LatestVisas = () => {
  const [latestVisasData, setLatestVisasData] = useState([]);
  const [flag, setFlag] = useState(true);

  // Fetch latest visas data from an API or a database
  useEffect(() => {
    const getLatestVisasData = async () => {
      setFlag(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/latest-visas`
      );

      setLatestVisasData(data);
      setFlag(false);
    };

    getLatestVisasData();
  }, []);

  return (
    <div className="mb-40">
      {/* Heading */}
      <div className="mt-20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
          Latest{" "}
          <span className="text-green-600">
            <Typewriter
              words={["Visas"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>{" "}
          {/* Data */}
        </h1>
      </div>

      {/* Loading Spinner */}
      {flag && (
        <div
          id="loadingSpinner"
          className="h-28 py-52 flex flex-col justify-center items-center"
        >
          <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
        </div>
      )}

      {/* Latest Data */}
      {!flag && (
        <div className="px-10 md:px-10 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5 mt-14">
          {latestVisasData?.map((visa) => (
            <SingleVisaCard key={visa?._id} visa={visa}></SingleVisaCard>
          ))}
        </div>
      )}

      <div className="flex flex-col justify-center items-center mt-10">
        <Link
          to="/all-visas"
          className="bg-white text-green-500  font-bold px-8 py-2 rounded-full border-2 border-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 transition-all uppercase"
        >
          See All Visas
        </Link>
      </div>
    </div>
  );
};

export default LatestVisas;

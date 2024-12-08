import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useLocation } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import SingleVisaCard from "../../components/SingleVisaCard/SingleVisaCard";

const AllVisas = () => {
  // TODO: Fetch visas from the backend API and display them here.
  const allVisas = useLoaderData() || {};
  const [displayVisasData, setDisplayVisasData] = useState(allVisas);
  const location = useLocation();

  // State to store the selected visa type
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [searchText, setSearchText] = useState("");

  // List of visa types
  const visaTypes = [
    "All VISA",
    "Tourist visa",
    "Student visa",
    "Official visa",
    "Business visa",
    "Medical visa",
  ];

  useEffect(() => {
    const getVisasDataByUsingSearch = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/all-visas?filter=${selectedVisaType}&search=${searchText}`
      );
      setDisplayVisasData(data);
    };

    setTimeout(() => {
      document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("handleLoading").style.display = "block";
    }, 2000);

    window.scrollTo({ top: 0, behavior: "smooth" });

    getVisasDataByUsingSearch();
  }, [searchText, selectedVisaType]);

  // Handle Visa type change event
  const handleChange = async (event) => {
    setSelectedVisaType(event.target.value);

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/all-visas?filter=${
        event.target.value
      }&search=${searchText}`
    );

    setDisplayVisasData(data);
  };

  // Handle search button click event
  const handleSearchBtn = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/all-visas?filter=${selectedVisaType}&search=${searchText}`
    );
    setDisplayVisasData(data);
  };

  return (
    <div className="px-0">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | All Visas</title>
      </Helmet>

      <div
        id="loadingSpinner"
        className="h-screen flex flex-col justify-center items-center"
      >
        <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
      </div>

      {/* Handle Loading Spinner */}
      <div id="handleLoading" className="hidden">
        {/* Heading */}
        <div className="mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
            All{" "}
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

        {/* Search and filter */}
        <div
          id="searchFilter"
          className="px-5 md:px-10 lg:px-0 flex flex-row mt-10 mb-10  gap-10 items-center justify-center md:justify-between border-0"
        >
          {/* Dummy */}
          <div className="hidden lg:block border-0"></div>

          {/* Search */}
          <div className="border-0 flex flex-row gap-5">
            <input
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              placeholder="Enter country name...."
              className="input input-bordered input-success lg:w-[350px]"
            />
            <button
              onClick={handleSearchBtn}
              className="btn btn-success text-white"
            >
              Search
            </button>
          </div>

          {/* Filter by visa type */}
          <div className="hidden md:block">
            <div className="visa-dropdown flex flex-row gap-2 justify-end items-center text-center">
              <label htmlFor="visaType" className=" mb-2 text-xl">
                Filter:
              </label>
              <select
                id="visaType"
                value={selectedVisaType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="" disabled>
                  -- Choose Visa Type --
                </option>
                {visaTypes?.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* {selectedVisaType && (
                    <p className="mt-3 text-sm text-green-600">
                      You selected: <strong>{selectedVisaType}</strong>
                    </p>
                  )} */}
            </div>
          </div>
        </div>

        <div id="visasAllDataId">
          <div className="px-10 md:px-10 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5">
            {displayVisasData?.map((visa) => (
              <SingleVisaCard key={visa?._id} visa={visa} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllVisas;

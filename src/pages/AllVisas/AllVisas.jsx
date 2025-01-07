import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SingleVisaCard from "../../components/SingleVisaCard/SingleVisaCard";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const AllVisas = () => {
  // TODO: Fetch visas from the backend API and display them here.
  // const allVisas = useLoaderData() || {};
  const [displayVisasData, setDisplayVisasData] = useState([]);
  const location = useLocation();

  // For Pagination
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalVisa, setTotalVisa] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // State to store the selected visa type
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [flag, setFlag] = useState(true);

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
    // const getVisasDataByUsingSearch = async () => {
    //   setFlag(true);
    //   const { data } = await axios.get(
    //     `${
    //       import.meta.env.VITE_API_URL
    //     }/all-visas?filter=${selectedVisaType}&search=${searchText}`
    //   );
    //   setFlag(false);
    //   setDisplayVisasData(data);
    // };

    window.scrollTo({ top: 0, behavior: "smooth" });

    // getVisasDataByUsingSearch();
  }, [searchText, selectedVisaType, currentPage]);

  // Load all visas data by using tanstack query
  const { data: allVisas = [], isLoading } = useQuery({
    queryKey: [
      "allVisas",
      currentPage,
      itemsPerPage,
      searchText,
      selectedVisaType,
    ],
    queryFn: async () => {
      setFlag(true);
      const { data } = await axiosSecure(
        `/all-visa-for-pagination?filter=${selectedVisaType}&search=${searchText}&page=${currentPage}&size=${itemsPerPage}`
      );
      setFlag(false);
      return data;
    },
  });

  // Count Total Visa
  useEffect(() => {
    const getTotalVisa = async () => {
      setFlag(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/visa-count?filter=${selectedVisaType}&search=${searchText}`
      );
      setFlag(false);
      setTotalVisa(data.count);
    };

    getTotalVisa();
  }, [searchText, selectedVisaType]);

  // console.log("Total Visa: ", totalVisa);

  const numberOfPages = Math.ceil(totalVisa / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  // Handle Pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  // Handle Visa type change event
  const handleChange = async (event) => {
    setSelectedVisaType(event.target.value);
    setFlag(true);

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/all-visas?filter=${event.target.value
      }&search=${searchText}`
    );

    setDisplayVisasData(data);
    setFlag(false);
  };

  // Handle search button click event
  const handleSearchBtn = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL
      }/all-visas?filter=${selectedVisaType}&search=${searchText}`
    );
    setDisplayVisasData(data);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-0">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | All Visas</title>
      </Helmet>

      {/* Handle Loading Spinner */}
      {/* hidden */}
      <div id="handleLoading" className="">
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

        {flag && (
          <div
            id="loadingSpinner"
            className="h-28 py-52 flex flex-col justify-center items-center"
          >
            <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
          </div>
        )}

        {!flag && (
          <div id="visasAllDataId">
            <div className="px-10 md:px-10 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5">
              {allVisas?.map((visa) => (
                <SingleVisaCard key={visa?._id} visa={visa} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-1  mt-16">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          title="previous"
          type="button"
          className="disabled:cursor-not-allowed inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md  border-gray-800"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Pages Number */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            type="button"
            className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md  border-gray-800 ${currentPage === btnNum
                ? "bg-blue-500 text-white border-blue-500"
                : ""
              }`}
            title="Page 2"
          >
            {btnNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          title="next"
          type="button"
          className="disabled:cursor-not-allowed inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md  border-gray-800"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      {/* End of Pagination */}
    </div>
  );
};

export default AllVisas;

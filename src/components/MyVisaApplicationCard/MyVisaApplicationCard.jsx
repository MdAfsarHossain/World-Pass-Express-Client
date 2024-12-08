import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyVisaApplicationCard = ({ myApplication, visaId, handleDelete }) => {
  const [visasData, setVisasData] = useState([]);

  useEffect(() => {
    const getVisasData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/visa-details/${visaId}`
      );

      setVisasData(data);
    };
    getVisasData();
  });

  const {
    countryName,
    description,
    countryImage,
    visaProcessing,
    ageRestriction,
    fee,
    validity,
    selectedVisaType,
    selectedApplicationMethod,
    selectedDocuments,
    authorEmail,
    authorName,
    authorImage,
  } = visasData || {};

  const { appliedDate, _id, applicantName, applicantEmail } = myApplication;

  return (
    <div data-aos="flip-left" className="shadow-lg rounded-lg hover:scale-105">
      {/* Image and Location */}
      <div className="h-44 relative">
        <img className="rounded w-full h-full" src={countryImage} alt="" />
        <div
          className="absolute bottom-3 bg-yellow-500 ml-2 py-[2px]"
          style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 95%, 0% 100%)" }}
        >
          <p className=" px-10 text-center font-bold  text-black">
            {countryName}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-start gap-5">
        {/* Details */}
        <div className="px-5 mt-3">
          {/* Visa Type */}
          <div className={`${selectedVisaType === 'Business visa' && 'bg-green-100'} ${selectedVisaType === 'Medical visa' && 'bg-lime-200'} ${selectedVisaType === 'Student visa' && 'bg-orange-200'} ${selectedVisaType === 'Official visa' && 'bg-amber-200'} ${selectedVisaType === 'Tourist visa' && 'bg-sky-200'} w-fit px-2 rounded-lg`}>
            <h1 className="font-bold text-base">{selectedVisaType}</h1>
          </div>

          {/* Processing Time */}
          <div className="">
            <h1 className="text-base">
              <span className="font-semibold">Processing Time:</span>{" "}
              {visaProcessing} Days
            </h1>
          </div>

          {/* Total Fee */}
          <div className="">
            <h1 className="text-base">
              <span className="font-semibold">Visa Fee:</span> ${fee}
            </h1>
          </div>

          {/* Validity */}
          <div className="">
            <h1 className="text-base">
              <span className="font-semibold">Validity:</span> {validity} Months
            </h1>
          </div>

          {/* Application Method */}
          <div className="">
            <h1 className="text-base">
              <span className="font-semibold">Application Method:</span>{" "}
              {selectedApplicationMethod}
            </h1>
          </div>

          {/* Applicant Name */}
          <div className="">
            <h1 className="text-base">
              <span className="font-semibold">Applicant Name:</span>{" "}
              {applicantName}
            </h1>
          </div>

          {/* Applicant Email */}
          <div className="">
            <h1 className="text-base"><span className="font-semibold">Applicant Email:</span> {applicantEmail}</h1>
          </div>

          {/* Applied Date */}
          <div className="">
            <h1 className="text-base"><span className="font-semibold">Applied date:</span> {appliedDate}</h1>
          </div>
        </div>

        {/* Delete Button */}
        <div className="mb-8 text-center w-full">
          <Link
            onClick={() => handleDelete(myApplication?._id)}
            className="bg-red-500 text-white font-bold px-10 py-2 rounded-full border-2 border-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500 transition-all"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyVisaApplicationCard;

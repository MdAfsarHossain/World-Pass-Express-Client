import React from "react";
import { Link } from "react-router-dom";

const MyAddedVisaCard = ({ visa, handleUpdate, handleDelete }) => {
  const {
    _id,
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
  } = visa || {};

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

      {/* Details */}
      <div className="px-5 mt-3">
        {/* Visa Type */}
        <div className={`${selectedVisaType === 'Business visa' && 'bg-green-100'} ${selectedVisaType === 'Medical visa' && 'bg-lime-200'} ${selectedVisaType === 'Student visa' && 'bg-orange-200'} ${selectedVisaType === 'Official visa' && 'bg-amber-200'} ${selectedVisaType === 'Tourist visa' && 'bg-sky-200'} w-fit px-2 rounded-lg`}>
          <h1 className="font-bold text-base">{selectedVisaType}</h1>
        </div>

        {/* Processing Time */}
        <div className="">
          <h1 className="text-base">Processing Time: {visaProcessing} Days</h1>
        </div>

        {/* Total Fee */}
        <div className="">
          <h1 className="text-base">Visa Fee: ${fee}</h1>
        </div>

        {/* Validity */}
        <div className="">
          <h1 className="text-base">Validity: {validity} Months</h1>
        </div>

        {/* Application Method */}
        <div className="">
          <h1 className="text-base">
            Application Method: {selectedApplicationMethod}
          </h1>
        </div>

        {/* View Details */}
        <div className="mt-5 flex flex-row justify-center items-center gap-8 mb-8">
          <Link
            onClick={handleUpdate(visa?._id)}
            // to={`/visa-details/${_id}`}
            className="bg-green-500 text-white font-bold px-5 py-2 rounded-full border-2 border-green-500 hover:bg-transparent hover:border-green-500 hover:text-green-500 transition-all"
          >
            Update
          </Link>
          <Link
            onClick={handleDelete(visa?._id)}
            // to={`/visa-details/${_id}`}
            className="bg-red-500 text-white font-bold px-5 py-2 rounded-full border-2 border-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500 transition-all"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAddedVisaCard;

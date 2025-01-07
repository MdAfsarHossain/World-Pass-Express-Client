import axios from "axios";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const VisaDetails = () => {
  const visa = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleApplyVisa = async () => {
    document.getElementById("applyModal").showModal();
  };

  const handleApplyVisaData = async (e) => {
    e.preventDefault();
    const form = e.target;

    const firstName = form.firstname.value;
    const lastName = form.lastname.value;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // console.log("applyVisaData");
    const applyVisaData = {
      visaId: visa?._id,
      applicantEmail: user?.email,
      authorEmail: visa?.authorEmail,
      countryName: visa?.countryName,
      fee: visa?.fee,
      selectedVisaType: selectedVisaType,
      applicantName: firstName + " " + lastName,
      appliedDate: formattedDate,
      // appliedDate: new Date().toLocaleDateString(),
    };

    // console.table(applyVisaData);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/apply-visa`,
        applyVisaData
      );

      toast.success("Visa Application submitted successfully.");
      navigate("/all-visas");

      document.getElementById("applyModal").close();
    } catch (error) {
      toast.error("Error :", error.message);
    }
  };

  return (
    <div>
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | Visa Details</title>
      </Helmet>

      {/* Country Image */}
      <div className="px-5 lg:px-0 relative mt-10 rounded-xl">
        <img
          src={countryImage}
          alt={`${countryName}`}
          className="w-full h-80  rounded-xl object-cover"
        />
        <div className="absolute bottom-5 left-10 lg:left-5 bg-black bg-opacity-50 p-3 rounded-lg">
          <h1 className="text-4xl font-bold uppercase text-green-500">
            {countryName}
          </h1>
          <p className="text-2xl text-white uppercase">{selectedVisaType}</p>
        </div>
      </div>

      {/* View Details */}
      <div className="mt-5 lg:mt-10 grid grid-cols-12 items-start justify-center">
        {/* Left Side */}
        <div className="p-6 col-span-12 lg:col-span-8">
          {/* Description */}
          <div className="">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 uppercase border-b-4 border-amber-500 w-fit">
              Description
            </h2>
            <p className="text-gray-700 mb-6 text-lg">{description}</p>
          </div>

          {/* Visa Details */}
          <div className="">
            <h2 className="mt-5 lg:mt-10 text-xl lg:text-2xl font-semibold text-gray-800 mb-4 uppercase border-b-4 border-amber-500 w-fit">
              Visa Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-1 lg:gap-3">
              <div>
                <h3 className="text-gray-600  text-xl">Processing Time:</h3>
                <p className="text-gray-800 text-lg">{visaProcessing} Days</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-xl">Age Restriction:</h3>
                <p className="text-gray-800 text-lg">
                  {ageRestriction > 0 ? ageRestriction : "No restriction"} years
                </p>
              </div>
              <div>
                <h3 className="text-gray-600 text-xl">Visa Fee:</h3>
                <p className="text-gray-800 text-lg">${fee}</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-xl">Validity:</h3>
                <p className="text-gray-800 text-lg">{validity} months</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-xl">Application Method:</h3>
                <p className="text-gray-800 text-lg">
                  {selectedApplicationMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="">
            <h2 className="mt-10 text-xl lg:text-2xl font-semibold text-gray-800  mb-4 uppercase border-b-4 border-amber-500 w-fit">
              Required Documents
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {selectedDocuments?.map((doc, index) => (
                <li
                  key={index}
                  className="bg-lime-300 text-black font-semibold mb-3 w-fit px-2 list-none rounded-md shadow-lg font py-1 hover:skew-x-6"
                >
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Author Information */}
          <div className="">
            <h2 className="mt-10 text-xl lg:text-2xl font-semibold text-gray-800  mb-4 uppercase border-b-4 border-amber-500 w-fit">
              Author Information
            </h2>
            <div className="p-6 border-t border-gray-300 bg-gray-50 flex items-center gap-4">
              <img
                src={authorImage}
                alt={authorName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-gray-800 font-semibold">{authorName}</h3>
                <p className="text-gray-600 text-sm">{authorEmail}</p>
              </div>
            </div>
          </div>
          {/* End Of Author */}
        </div>

        {/* Right Side */}
        <div className="p-6 col-span-12 lg:col-span-4">
          {/* Calender  */}
          <div className="w-full mx-auto">
            <Calendar value={new Date()} className="w-full" />
          </div>

          {/* Apply Button Section */}
          <div className="mt-10 w-full md:w-1/2 md:mx-auto lg:w-full">
            <button
              disabled={user?.email === visa?.authorEmail ? true : false || !user}
              onClick={handleApplyVisa}
              className="disabled:cursor-not-allowed  btn-primary bg-green-500 text-white px-5 py-2 rounded-lg font-bold w-full border-2 border-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500 transition-all"
            >
              Apply For VISA
            </button>
          </div>
        </div>
      </div>

      {/* Apply VISA Modal */}
      <dialog id="applyModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="">
            <form
              onSubmit={handleApplyVisaData}
              className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
            >
              <div className="col-span-full">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  disabled={true}
                  className="w-full input input-bordered"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  required
                  placeholder="First name"
                  className="w-full input input-bordered"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Last name
                </label>
                <input
                  id="lastname"
                  required
                  type="text"
                  placeholder="Last name"
                  className="w-full input input-bordered"
                />
              </div>

              <div className="col-span-3">
                <label htmlFor="address" className="text-sm">
                  Fee
                </label>
                <input
                  id="address"
                  type="text"
                  disabled
                  defaultValue={visa?.fee}
                  className="w-full input input-bordered"
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="address" className="text-sm">
                  Current Date
                </label>
                <input
                  id="address"
                  type="text"
                  disabled
                  defaultValue={new Date().toDateString()}
                  className="w-full input input-bordered"
                />
              </div>

              <div className="col-span-full">
                <button
                  type="submit"
                  // onClick={handleApplyVisaData}
                  className="btn bg-green-500 w-full text-white font-bold text-xl uppercase hover:bg-green-400 border-2 border-green-500 hover:border-green-400"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          {/* <div className="modal-action">
            <form method="dialog"> */}
          {/* if there is a button in form, it will close the modal */}
          {/* <button className="btn">Apply</button>
            </form>
          </div> */}
        </div>
      </dialog>
      {/* End of Apply VISA Modal */}
    </div>
  );
};

export default VisaDetails;

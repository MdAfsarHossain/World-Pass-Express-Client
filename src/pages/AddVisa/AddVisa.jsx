import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AddVisa = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State to store the selected visa type
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [selectedApplicationMethod, setSelectedApplicationMethod] =
    useState("");

  // State to store selected documents
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // List of required document options
  const documentOptions = [
    "Valid passport",
    "Visa application form",
    "Recent passport-sized photograph",
    "Proof of accommodation",
    "Travel itinerary",
  ];

  // List of application methods
  const applicationMethods = ["Online", "In-person", "Online and in-person"];

  // List of visa types
  const visaTypes = [
    "Tourist visa",
    "Student visa",
    "Official visa",
    "Business visa",
    "Medical visa",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the document to the selected list
      setSelectedDocuments((prev) => [...prev, value]);
    } else {
      // Remove the document from the selected list
      setSelectedDocuments((prev) => prev.filter((doc) => doc !== value));
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const countryName =
      data.countryName.charAt(0).toUpperCase() + data.countryName.slice(1);
    const description = data.description;
    const countryImage = data.countryImage;
    const visaProcessing = data.visaProcessing;
    const ageRestriction = data.ageRestriction;
    const fee = data.fee;
    const validity = data.validity;

    const addVisaData = {
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
      authorEmail: user?.email,
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      createdAt: new Date(),
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-visa`,
        addVisaData
      );
      toast.success("New visa added successfully!");
      navigate("/all-visas");
    } catch (error) {
      toast.error("Error adding visa: " + error.message);
    }
  };

  // Handle change event
  const handleChange = (event) => {
    setSelectedVisaType(event.target.value);
  };

  // Handle change event
  const handleChangeApplicationMethod = (event) => {
    setSelectedApplicationMethod(event.target.value);
  };

  return (
    <div className="lg:px-10">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | Add Visa</title>
      </Helmet>

      {/* Heading */}
      <div className="mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
          Add{" "}
          <span className="text-green-600">
            <Typewriter
              words={["New Visa"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>{" "}
          Data
        </h1>
      </div>

      <section className="p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-2xl">
            <div className="grid grid-cols-6 gap-4 col-span-full">
              {/* Country Name */}
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="touristsSpotName" className="text-base">
                  Country Name
                </label>
                <input
                  id="countryName"
                  type="text"
                  name="countryName"
                  placeholder="Country Name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("countryName", { required: true })}
                />
                {errors.countryName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Country Image */}
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="countryImage" className="text-base">
                  Country Image URL
                </label>
                <input
                  id="countryImage"
                  type="text"
                  name="countryImage"
                  placeholder="Country Image URL"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("countryImage", { required: true })}
                />
                {errors.countryImage && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Visa Type */}
              <div className="col-span-full sm:col-span-2">
                <div className="visa-dropdown">
                  <label htmlFor="visaType" className="block mb-2 text-base ">
                    Select Visa Type
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
                    {visaTypes.map((type, index) => (
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

              {/* Visa Processing */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="averageCost" className="text-base">
                  Visa Processing
                </label>
                <input
                  id="visaProcessing"
                  type="number"
                  name="visaProcessing"
                  placeholder="Visa Processing Days"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("visaProcessing", { required: true })}
                />
                {errors.visaProcessing && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Age Restriction */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="ageRestriction" className="text-base">
                  Age Restriction
                </label>
                <input
                  id="averageCost"
                  type="number"
                  name="ageRestriction"
                  placeholder="Age Restriction"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("ageRestriction", { required: true })}
                />
                {errors.ageRestriction && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Required Documents */}
              <div className="col-span-full">
                <div className="col-span-full sm:col-span-2">
                  <div className="">
                    <h2 className="mb-4">Select Required Documents</h2>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                      {documentOptions.map((document, index) => (
                        <div key={index} className="mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={document}
                              onChange={handleCheckboxChange}
                              className="form-checkbox text-blue-500"
                            />
                            <span>{document}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    {selectedDocuments.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-md font-semibold">
                          Selected Documents:
                        </h3>
                        <ul className="list-disc pl-5">
                          {selectedDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div className="col-span-full">
                <label htmlFor="bio" className="text-base">
                  Short Description
                </label>
                <textarea
                  id="bio"
                  placeholder="Write short description"
                  name="description"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Fee */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="fee" className="text-base">
                  Fee
                </label>
                <input
                  id="fee"
                  type="number"
                  name="fee"
                  placeholder="Fee"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("fee", { required: true })}
                />
                {errors.fee && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Validity */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="validity" className="text-base">
                  Validity
                </label>
                <input
                  id="validity"
                  type="number"
                  name="validity"
                  placeholder="Validity"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("validity", { required: true })}
                />
                {errors.validity && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Application Method */}
              <div className="col-span-full sm:col-span-2">
                <div className="">
                  <label
                    htmlFor="applicationMethod"
                    className="block mb-2 text-base "
                  >
                    Select Application Method
                  </label>
                  <select
                    id="visaType"
                    value={selectedApplicationMethod}
                    onChange={handleChangeApplicationMethod}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="" disabled>
                      -- Choose Application Method --
                    </option>
                    {applicationMethods?.map((type, index) => (
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

              {/* <div className="col-span-full">
                <label htmlFor="seasonality" className="text-base">
                  Seasonality
                </label>
                <input
                  id="seasonality"
                  name="seasonality"
                  type="text"
                  placeholder="Seasonality"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                  {...register("seasonality", { required: true })}
                />
                {errors.seasonality && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div> */}

              <div className="col-span-full">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-green-500 focus:dark:ring-green-600 hover:dark:ring-green-600 dark:text-gray-50 uppercase"
                >
                  Add Visa
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default AddVisa;

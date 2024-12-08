import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import MyAddedVisaCard from "../../components/MyAddedVisaCard/MyAddedVisaCard";
import useAuth from "../../hooks/useAuth";

const MyAddedVisa = () => {
  // const myAddedVisas = useLoaderData();
  const { user } = useAuth();
  const [myAddedVisas, setMyAddedVisas] = useState([]);
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [selectedApplicationMethod, setSelectedApplicationMethod] =
    useState("");
  const [flag, setFlag] = useState(true);

  // State to store selected documents
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [modalVisa, setModalVisa] = useState([]) || {};
  const [updateFlag, setUpdateFlag] = useState(false);

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
    const getMyAddedVisas = async () => {
      setFlag(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-added-visas?authorEmail=${
          user?.email
        }`
      );

      setMyAddedVisas(data);
      setFlag(false);
    };

    getMyAddedVisas();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateFlag]);

  // useEffect(() => {
  // setTimeout(() => {
  // document.getElementById("loadingSpinner").style.display = "none";
  // document.getElementById("handleLoading").style.display = "block";
  // }, 2000);

  // }, []);

  useEffect(() => {
    // Update modal visa data
    if (modalVisa._id) {
      setSelectedVisaType(modalVisa?.selectedVisaType);
      setSelectedDocuments(modalVisa?.selectedDocuments);
      setSelectedApplicationMethod(modalVisa?.selectedApplicationMethod);
    }
  }, [modalVisa]);

  const handleUpdate = (id) => async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/visa-details/${id}`
      );
      setModalVisa(data);
      document.getElementById("my_modal_1").showModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your added visa has been deleted.",
              icon: "success",
            });

            const { data } = await axios.delete(
              `${import.meta.env.VITE_API_URL}/visa/${id}`
            );
            // toast.success("Visa deleted successfully!");
            setMyAddedVisas(myAddedVisas.filter((v) => v._id !== id));
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your added visa is safe :)",
              icon: "error",
            });
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  // Handle change event
  const handleChange = (event) => {
    setSelectedVisaType(event.target.value);
  };

  // Handle change event
  const handleChangeApplicationMethod = (event) => {
    setSelectedApplicationMethod(event.target.value);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const countryName =
      form.countryName.value.charAt(0).toUpperCase() +
      form.countryName.value.slice(1);
    const description = form.description.value;
    const countryImage = form.countryImage.value;
    const visaProcessing = form.visaProcessing.value;
    const ageRestriction = form.ageRestriction.value;
    const fee = form.fee.value;
    const validity = form.validity.value;

    const updatedVisaData = {
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
    };

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/edit-visa/${modalVisa?._id}`,
        updatedVisaData
      );

      toast.success("Visa data updated successfully!");
      setUpdateFlag(true);

      document.getElementById("my_modal_1").close();
    } catch (error) {}
  };

  return (
    <div className="px-10">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | My Added Visas</title>
      </Helmet>

      {/* Handle Loading */}
      <div id="" className="">
        {/* Heading */}
        <div className="mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
            My{" "}
            <span className="text-green-600">
              <Typewriter
                words={["All Added"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>{" "}
            Visas
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

        {!flag && (
          <>
            {myAddedVisas?.length === 0 && (
              <div className="flex flex-col justify-center items-center mt-10">
                <img className="w-40 h-40" src="/error.png" alt="" />
                <h1 className="text-3xl font-bold uppercase text-red-500">
                  No Data founds
                </h1>
              </div>
            )}
          </>
        )}

        {!flag && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5 mt-14">
            {myAddedVisas?.map((myVisa) => (
              <MyAddedVisaCard
                key={myVisa?._id}
                visa={myVisa}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              ></MyAddedVisaCard>
            ))}
          </div>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-2xl">
            <form
              onSubmit={handleUpdateSubmit}
              className="grid grid-cols-6 gap-4 col-span-full"
            >
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
                  defaultValue={modalVisa?.countryName}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                />
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
                  defaultValue={modalVisa?.countryImage}
                  placeholder="Country Image URL"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                />
              </div>

              {/* Visa Type */}
              <div className="col-span-full sm:col-span-2">
                <div className="visa-dropdown">
                  <label htmlFor="visaType" className="block mb-2 text-base ">
                    Select Visa Type
                  </label>
                  <select
                    id="visaType"
                    defaultValue={modalVisa?.selectedVisaType}
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
                  defaultValue={modalVisa?.visaProcessing}
                  placeholder="Visa Processing Days"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                />
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
                  defaultValue={modalVisa?.ageRestriction}
                  placeholder="Age Restriction"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                />
              </div>

              {/* Required Documents */}
              <div className="col-span-full">
                <div className="col-span-full sm:col-span-2">
                  <div className="">
                    <h2 className="mb-4">Select Required Documents</h2>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                      {documentOptions?.map((document, index) => (
                        <div key={index} className="mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={document}
                              defaultChecked={modalVisa?.selectedDocuments?.includes(
                                document
                              )}
                              onChange={handleCheckboxChange}
                              className="form-checkbox text-blue-500"
                            />
                            <span>{document}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    {selectedDocuments?.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-md font-semibold">
                          Selected Documents:
                        </h3>
                        <ul className="list-disc pl-5">
                          {selectedDocuments?.map((doc, index) => (
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
                  defaultValue={modalVisa?.description}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                ></textarea>
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
                  defaultValue={modalVisa?.fee}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                />
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
                  defaultValue={modalVisa?.validity}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 border-0 bg-gray-200 pl-2 py-2 mt-1"
                />
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
                    value={modalVisa?.selectedApplicationMethod}
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
                </div>
              </div>

              <div className="col-span-full modal-action">
                <button
                  // onClick={}
                  type="submit"
                  className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-green-500 focus:dark:ring-green-600 hover:dark:ring-green-600 dark:text-gray-50"
                >
                  Update
                </button>
              </div>
            </form>
            {/* </div> */}
          </fieldset>
        </div>
      </dialog>
      {/* End of Update Modal */}
    </div>
  );
};

export default MyAddedVisa;

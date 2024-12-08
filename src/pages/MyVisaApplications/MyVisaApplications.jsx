import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import MyVisaApplicationCard from "../../components/MyVisaApplicationCard/MyVisaApplicationCard";
import useAuth from "../../hooks/useAuth";

const MyVisaApplications = () => {
  const { user } = useAuth();
  const [myVisaApplications, setMyVisaApplications] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getAllVisaApplicationsData = async () => {
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/my-visa-applications?applicantEmail=${
      //     user?.email
      //   }&search=${searchText}`
      // );
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-visa-applications?applicantEmail=${
          user?.email
        }`
      );
      setMyVisaApplications(data);
    };

    window.scrollTo({ top: 0, behavior: "smooth" });

    getAllVisaApplicationsData();
  }, []);
  // searchText

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("handleLoading").style.display = "block";
    }, 2000);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Hanlde Delete Btn clicked
  const handleDelete = async (id) => {
    // const { data } = await axios.delete(
    //   `${import.meta.env.VITE_API_URL}/visa-application/${id}`
    // );
    // const updatedVisaApplications = myVisaApplications.filter(
    //   (app) => app?._id !== id
    // );
    // setMyVisaApplications(updatedVisaApplications);
    // toast.success("Visa Application deleted successfully.");

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
              text: "Your visa application has been deleted.",
              icon: "success",
            });

            const { data } = await axios.delete(
              `${import.meta.env.VITE_API_URL}/visa-application/${id}`
            );
            const updatedVisaApplications = myVisaApplications.filter(
              (app) => app?._id !== id
            );
            setMyVisaApplications(updatedVisaApplications);
            // toast.success("Visa Application deleted successfully.");
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your visa application is safe :)",
              icon: "error",
            });
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Hanlde search btn click
  const handleSearchBtn = async () => {
    // console.log("Search btn click");

    document.getElementById("visasAllDataId").style.display = "none";
    document.getElementById("loadingSpinnerForSearchData").style.display =
      "flex";

    setTimeout(() => {
      document.getElementById("loadingSpinnerForSearchData").style.display =
        "none";
      document.getElementById("visasAllDataId").style.display = "grid";
    }, 2000);

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/my-visa-applications?applicantEmail=${
        user?.email
      }&search=${searchText}`
    );
    setMyVisaApplications(data);
  };

  return (
    <div className="px-10">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | My Visa Applications</title>
      </Helmet>

      {/* Loading Spinner */}

      <div
        id="loadingSpinner"
        className="h-screen flex flex-col justify-center items-center"
      >
        <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
      </div>

      {/* Remove Hidden Class */}
      <div id="handleLoading" className="hidden">
        {/* Heading */}
        <div className="mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
            My{" "}
            <span className="text-green-600">
              <Typewriter
                words={["All Applied"]}
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

        {/* Search Functionality */}
        <div
          id="searchFilter"
          className="flex flex-row mt-10 mb-10  gap-10 items-center justify-center border-0"
        >
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
        </div>

        {myVisaApplications?.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-10">
            <img className="w-40 h-40" src="/error.png" alt="" />
            <h1 className="text-3xl font-bold uppercase text-red-500">
              No Data founds
            </h1>
          </div>
        )}

        <div
          id="loadingSpinnerForSearchData"
          className="h-28 flex-col justify-center items-center hidden"
        >
          <span className="flex flex-row justify-center items-center h-28 mx-auto loading loading-spinner loading-lg text-success"></span>
        </div>

        {/* hidden */}
        {myVisaApplications?.length !== 0 && (
          <div id="visasAllDataId" className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5 rounded-xl mt-10">
              {myVisaApplications?.map((myApplication, idx) => (
                <MyVisaApplicationCard
                  key={idx}
                  myApplication={myApplication}
                  visaId={myApplication?.visaId}
                  handleDelete={handleDelete}
                ></MyVisaApplicationCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;

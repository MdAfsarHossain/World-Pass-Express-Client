import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MyVisaApplicationCard from "../../components/MyVisaApplicationCard/MyVisaApplicationCard";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const MyVisaApplications = () => {
  const { user } = useAuth();
  const [myVisaApplications, setMyVisaApplications] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const getAllVisaApplicationsData = async () => {
      setFlag(true);

      const { data } = await axiosSecure(
        `/my-visa-applications?applicantEmail=${user?.email}`
      );
      setMyVisaApplications(data);
      setFlag(false);
    };

    // getAllVisaApplicationsData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // searchText

  // Load all my visa Applications data by using tanstack query
  const {
    data: myAllVisaApplicationsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myAllVisaApplicationsData"],
    queryFn: async () => {
      setFlag(true);
      const { data } = await axiosSecure(
        `/my-visa-applications?applicantEmail=${user?.email}&search=${searchText}`
      );
      setFlag(false);
      return data;
    },
  });

  // Delete data from the database using tanstack query
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/visa-application/${id}`);
      return data;
    },
    onSuccess: (data) => {
      refetch();
    },
  });

  // Hanlde Delete Btn clicked
  const handleDelete = async (id) => {
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
            try {
              await mutateAsync(id);
            } catch (error) {
              toast.error(error.message);
            }

            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your visa application has been deleted.",
              icon: "success",
            });

            // const { data } = await axios.delete(
            //   `${import.meta.env.VITE_API_URL}/visa-application/${id}`
            // );
            // const updatedVisaApplications = myVisaApplications.filter(
            //   (app) => app?._id !== id
            // );
            // setMyVisaApplications(updatedVisaApplications);
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
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-2">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | My Visa Applications</title>
      </Helmet>

      {/* Remove Hidden Class */}
      <div id="handleLoading" className="">
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

        {/* Loading Spinner */}
        {/* {flag && (
          <div
            id="loadingSpinner"
            className="h-28 py-52  flex flex-col justify-center items-center"
          >
            <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
          </div>
        )} */}

        {!flag && (
          <>
            {myAllVisaApplicationsData?.length === 0 && (
              <div className="flex flex-col justify-center items-center mt-10">
                <img className="w-40 h-40" src="/error.png" alt="" />
                <h1 className="text-3xl font-bold uppercase text-red-500">
                  No Data founds
                </h1>
              </div>
            )}
          </>
        )}


        {/* <div
          id="loadingSpinnerForSearchData"
          className="h-28 flex-col justify-center items-center hidden"
        >
          <span className="flex flex-row justify-center items-center h-28 mx-auto loading loading-spinner loading-lg text-success"></span>
        </div> */}

        {/* hidden */}
        {/* {!flag && ( */}

        {myAllVisaApplicationsData?.length > 0 &&
          <>
            {/* Table Formate */}
            <div className="container p-2 mx-auto sm:p-4 mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="w-24" />
                  </colgroup>
                  <thead className="">
                    <tr className="text-left bg-gray-200">
                      <th className="p-3">VISA ID #</th>
                      <th className="p-3">Image</th>
                      <th className="p-3">Applied Date</th>
                      <th className="p-3 text-center">Visa Type</th>
                      <th className="p-3">Country Name</th>
                      <th className="p-3">VISA Fee</th>
                      {/* <th className="p-3 text-center">Update</th> */}
                      <th className="p-3 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myAllVisaApplicationsData?.map((myApplication, idx) => (
                      <MyVisaApplicationCard
                        key={idx}
                        myApplication={myApplication}
                        visaId={myApplication?.visaId}
                        handleDelete={handleDelete}
                      ></MyVisaApplicationCard>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cards Formate */}
            {/* <div>
              {myAllVisaApplicationsData?.length !== 0 && (
                <div id="visasAllDataId" className="">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5 rounded-xl mt-10">
                    {myAllVisaApplicationsData?.map((myApplication, idx) => (
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
            </div> */}
          </>
          // {/* )} */}
        }
      </div>
    </div>
  );
};

export default MyVisaApplications;

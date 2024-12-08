import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../../hooks/useAuth";

const RequestedVisas = () => {
  const [requestedVisas, setRequestedVisas] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getAllRequestedVisasData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/requested-visas?authorEmail=${
          user?.email
        }`
      );

      setRequestedVisas(data);
    };

    setTimeout(() => {
      document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("handleLoading").style.display = "block";
    }, 2000);

    window.scrollTo({ top: 0, behavior: "smooth" });

    getAllRequestedVisasData();
  }, []);

  //   console.log(requestedVisas);

  return (
    <div className="">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | Requested Visas</title>
      </Helmet>

      {/* Loading Spinner */}
      <div
        id="loadingSpinner"
        className="h-screen flex flex-col justify-center items-center"
      >
        <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
      </div>

      {/*  */}
      <div id="handleLoading" className="hidden">
        {/* Handle Loading */}
        <div>
          {/* Heading */}
          <div className="mt-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
              All{" "}
              <span className="text-green-600">
                <Typewriter
                  words={["Requested"]}
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
        </div>

        <div className="mt-10">
          {/* <h1>Data: {requestedVisas.length}</h1> */}
          {/* 
          {
            requestedVisas?.map((visa) => )
          } */}

          {/* Table */}
          <div className="container p-2 mx-auto sm:p-4 ">
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
                    <th className="p-3">Applied Date</th>
                    <th className="p-3">Visa Type</th>
                    <th className="p-3">Country Name</th>
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Applicant Email</th>
                    <th className="p-3 text-right">VISA Fee</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requestedVisas?.map((visa) => (
                    <tr key={visa?._id}>
                      <td className="p-3">#{visa?.visaId}</td>
                      <td className="p-3">{visa?.appliedDate}</td>
                      <td className="p-3">{visa?.selectedVisaType}</td>
                      <td className="p-3">{visa?.countryName}</td>
                      <td className="p-3">{visa?.applicantName}</td>
                      <td className="p-3">{visa?.applicantEmail}</td>
                      <td className="p-3 text-right">${visa.fee}</td>
                      <td className="p-3 text-center">
                        {/* {visa.status === "pending" ? (
                          <span className="text-yellow-500">Pending</span>
                        ) : (
                        )} */}
                        <span className="">Paid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* End Of Table */}
        </div>
      </div>
    </div>
  );
};

export default RequestedVisas;

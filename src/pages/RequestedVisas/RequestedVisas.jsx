import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const RequestedVisas = () => {
  const [requestedVisas, setRequestedVisas] = useState([]);
  const { user } = useAuth();
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const getAllRequestedVisasData = async () => {
      setFlag(true);
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/requested-visas?authorEmail=${
      //     user?.email
      //   }`,
      //   { withCredentials: true }
      // );
      const { data } = await axiosSecure(
        `/requested-visas?authorEmail=${user?.email}`
      );

      setRequestedVisas(data);
      setFlag(false);
    };

    // setTimeout(() => {
    // document.getElementById("loadingSpinner").style.display = "none";
    // document.getElementById("handleLoading").style.display = "block";
    // }, 2000);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // getAllRequestedVisasData();
  }, []);

  // Load all requested visas data by using tanstack query
  const { data: requestedData = [], isLoading, refetch } = useQuery({
    queryKey: ["requestedData"],
    queryFn: async () => {
      setFlag(true);
      const { data } = await axiosSecure(
        `/requested-visas?authorEmail=${user?.email}`
      );
      setFlag(false);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  //   console.log(requestedVisas);

  return (
    <div className="">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | Requested Visas</title>
      </Helmet>

      {/*  */}
      <div id="handleLoading" className="">
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
          {/* <h1>Data: {requestedVisas?.length}</h1> */}
          {/* 
          {
            requestedVisas?.map((visa) => )
          } */}

          {/* Loading Spinner */}
          {/* {flag && (
            <div
              id="loadingSpinner"
              className="h-28 py-52 flex flex-col justify-center items-center"
            >
              <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
            </div>
          )} */}

          {!flag && (
            <>
              {requestedData?.length === 0 && (
                <div className="flex flex-col justify-center items-center mt-10">
                  <img className="w-40 h-40" src="/error.png" alt="" />
                  <h1 className="text-3xl font-bold uppercase text-red-500">
                    No Data founds
                  </h1>
                </div>
              )}
            </>
          )}

          {/* Table */}
          {/* {!flag && ( */}
          {requestedData?.length > 0 &&
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
                    {requestedData?.map((visa) => (
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
          }
          {/* )} */}
          {/* End Of Table */}
        </div>
      </div>
    </div>
  );
};

export default RequestedVisas;

const LoadingSpinner = () => {
  return (
    <div
      id="loadingSpinner"
      className="h-28 py-52  flex flex-col justify-center items-center"
    >
      <span className="-mt-28 flex flex-row justify-center items-center h-56 mx-auto loading loading-spinner loading-lg text-success"></span>
    </div>
  );
};

export default LoadingSpinner;

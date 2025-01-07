import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../components/api/ults";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {
    createUser,
    registerWithGoogle,
    updateUserProfile,
    setUser,
    user,
    loading,
    setLoading,
    userLoginEmail,
    setUserLoginEmail,
  } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   setUserLoginEmail("");
  // }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    const userName = data.username;
    const email = data.email;
    const password = data.password;
    const image = data.photoFile[0];
    // const photoUrl = data.photoFile[0].name;

    const formData = new FormData();
    formData.append("image", image);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    // console.log(userName, email, password);
    // console.log(image);

    try {
      setLoading(true);

      // 1. Upload imag and get image url
      const image_url = await imageUpload(image);

      // 2. User Registration
      const result = await createUser(email, password);

      // 3. Save username and photo in firebase
      await updateUserProfile(userName, image_url);
      toast.success("User Registered successfully!!");
      setUser({ ...user, displayName: userName, photoURL: photoUrl });
      navigate("/");
    } catch (error) {
      toast.error("Error Registering: " + error.message);
    }

    // return;

    // createUser(email, password)
    //   .then((result) => {
    //     updateUserProfile(userName, photoUrl)
    //       .then((result) => {
    //         toast.success("User Registered successfully!!");
    //         setUser({ ...user, displayName: userName, photoURL: photoUrl });
    //         navigate("/");
    //       })
    //       .catch((error) => {
    //         toast.error("Error Registering: " + error.message);
    //       });
    //   })
    //   .catch((error) => {
    //     toast.error("Error Registering: " + error.message);
    //   });
  };

  const handleGoogleRegister = () => {
    // console.log("Register:");
    setLoading(true);
    registerWithGoogle()
      .then((result) => {
        toast.success("Registered Successfully!!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error Registering: " + error.message);
      });
  };

  return (
    <div className="px-5 lg:px-0">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | Register</title>
      </Helmet>

      <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center uppercase">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* User Name */}
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 focus:border-violet-400"
              {...register("username", { required: true })}
            />
          </div>
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}

          {/* Email */}
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 focus:border-violet-400"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}

          {/* Photo URL */}
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block text-gray-700">
              Select Image:
            </label>
            <input
              type="file"
              name="photoFile"
              id="photoUrl"
              placeholder="Photo URL"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 focus:border-violet-400"
              {...register("photoFile", { required: true })}
            />
          </div>
          {errors.photoFile && (
            <span className="text-red-500">This field is required</span>
          )}

          {/* Password */}
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100  focus:border-violet-400"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-base">
                This field is required
              </span>
            )}

            {error && <p className="text-red-500">{error}</p>}
            {/* <div className="flex justify-end text-xs text-gray-700">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div> */}
          </div>
          <button
            disabled={loading}
            className="block w-full px-4 py-3 rounded-lg text-center bg-green-500 text-white font-bold text-xl border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
          <p>Register with Google</p>
        </button>

        <p className="text-xs text-center sm:px-6 text-gray-700">
          Already have an account?
          <Link to="/login" className="ml-2 underline ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

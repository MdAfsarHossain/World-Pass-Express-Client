import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AddVisa from "../pages/AddVisa/AddVisa";
import AllVisas from "../pages/AllVisas/AllVisas";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyAddedVisa from "../pages/MyAddedVisa/MyAddedVisa";
import MyVisaApplications from "../pages/MyVisaApplications/MyVisaApplications";
import Register from "../pages/Register/Register";
import RequestedVisas from "../pages/RequestedVisas/RequestedVisas";
import Reviews from "../pages/Reviews/Reviews";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import VisaDetails from "../pages/VisaDetails/VisaDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-visas",
        element: <AllVisas />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/all-visas`),
      },
      {
        path: '/services',
        element: <ServicesPage />,
      },
      {
        path: '/reviews',
        element: <Reviews />,
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-visa",
        element: (
          <PrivateRoute>
            <MyAddedVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-visa-applications",
        element: (
          <PrivateRoute>
            <MyVisaApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/visa-details/:id",
        element: (
          // <PrivateRoute>
          <VisaDetails />
          // </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/visa-details/${params.id}`),
      },
      {
        path: "/requested-visas",
        element: (
          <PrivateRoute>
            <RequestedVisas />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // {
  //   future: {
  //     v7_fetcherPersist: true,
  //     v7_normalizeFormMethod: true,
  //     v7_partialHydration: true,
  //     v7_relativeSplatPath: true,
  //     v7_skipActionErrorRevalidation: true,
  //     v7_startTransition: true,
  //   },
  // },
  // );
]);

export default router;

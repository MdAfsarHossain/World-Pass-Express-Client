import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import router from "./routes/Router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

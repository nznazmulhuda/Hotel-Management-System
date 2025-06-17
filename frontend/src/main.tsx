import "./index.css";
import { StrictMode } from "react";
import routes from "./router/routes";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import QueryProvider from "./providers/query.provider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* query provider */}
    <QueryProvider>
      {/* router */}
      <RouterProvider router={routes} />

      {/* react hot toast */}
      <Toaster />
    </QueryProvider>
  </StrictMode>
);

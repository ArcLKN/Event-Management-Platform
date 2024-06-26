import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./pages/EventManagementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // React StrictMode renders components twice on dev server (??)
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);
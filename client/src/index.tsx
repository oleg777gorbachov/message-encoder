import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./styles/index.css";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { translate } from "./translate/translate";

i18next.use(initReactI18next).init(translate);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

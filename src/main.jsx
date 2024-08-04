import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FormProvider } from "./context/AppContext";
import { DataProvider } from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </DataProvider>
  </React.StrictMode>
);

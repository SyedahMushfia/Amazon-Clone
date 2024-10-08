import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StateProvider } from "./context/StateContext.tsx";
import { FilterProvider } from "./context/FilterContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </StateProvider>
  </React.StrictMode>
);

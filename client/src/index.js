import React from "react";
import App from "./App";
import "css/index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./redux";
import { ContextProvider } from "contexts/ContextProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </BrowserRouter>
);

reportWebVitals();

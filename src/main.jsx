import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { Provider } from "react-redux";
// import Store from "./app/store.js";
import store from "./app/store.js";
import AuthProvider from "../src/Context/AuthProvider.jsx"
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>

      </Provider>
    </AuthProvider>

  </StrictMode>
);

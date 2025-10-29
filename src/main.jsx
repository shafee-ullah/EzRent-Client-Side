import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { Provider } from "react-redux";
// import Store from "./app/store.js";
import store from "./app/Store.js";
import AuthProvider from "../src/Context/AuthProvider.jsx";
import ChatProvider from "./Components/Chat/ChatProvider.jsx";
import NotificationProvider from "./Components/Notifications/NotificationProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider>
          <ChatProvider>
            <NotificationProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <RouterProvider router={router} />
            </NotificationProvider>
          </ChatProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>
);

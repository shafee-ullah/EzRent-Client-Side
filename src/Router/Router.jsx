import { createBrowserRouter } from "react-router";
import AddProperty from "../Pages/Dashboard/AddProperty/AddProperty";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import FeaturepropertiesDitels from "../Pages/Home/FeaturedProperties/FeaturepropertiesDitels";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import GuestDashboard from "../Pages/Dashboard/GuestDashboard";
import HostDashboard from "../Pages/Dashboard/HostDashboard";
import BrowseProperties from "../Pages/BrowseProperties/BrowseProperties";
import Register from "../Pages/AuthPage/AuthPage";
import { LogIn } from "lucide-react";
import AuthPage from "../Pages/AuthPage/AuthPage";
import Error from "../Error/Error";
import AboutEzRent from "../Pages/About/AboutEzRent";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import BecomeHostPage from "../Pages/BecomeHost/BecomeHostPage";
//  import AddProperty from "../Pages/Dashboard/AddProperty/AddProperty.jsx";
import ExperienceFeed from "../Pages/AddExperience/ExperienceFeed";
import AddExperience from "../Pages/AddExperience/AddExperience";
import PrivaterRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: AboutEzRent,
      },
      {
        path: "become-host",
        element: <PrivaterRoute><BecomeHostPage></BecomeHostPage></PrivaterRoute>
      },

      {
        path: "FeaturepropertiesDitels/:id",
        element: <PrivaterRoute><FeaturepropertiesDitels></FeaturepropertiesDitels> </PrivaterRoute>
      },
      {
        path: "BrowseProperties",
        Component: BrowseProperties,
      },
      {
        path: "payment",
        Component: PaymentPage,
      },

      {
        path: "guest-experiences",
        Component: ExperienceFeed
      },

      {
        path: "guest-experiences/add",
        Component: AddExperience
      },
      // {
      //   path: "ezchat",
      //   Component: EzRentChatbot,
      // },

      {
        path: "dashboard",
        element: <PrivaterRoute><DashboardLayout></DashboardLayout></PrivaterRoute>,
        children: [
          { index: true, Component: GuestDashboard },
          { path: "host/AddProperty", Component: AddProperty },
          { path: "guest", Component: GuestDashboard },
          { path: "host", Component: HostDashboard },
          { path: "admin", Component: AdminDashboard },
        ],
      },
    ],
  },
  {
    path: "join",
    Component: AuthPage,
  },
]);

export default router;

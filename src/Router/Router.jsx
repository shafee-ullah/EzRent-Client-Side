
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import FeaturepropertiesDitels from "../Pages/Home/FeaturedProperties/FeaturepropertiesDitels";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import GuestDashboard from "../Pages/Dashboard/GuestDashboard";
import HostDashboard from "../Pages/Dashboard/HostDashboard";
import Register from "../Pages/Register/Register";
import { LogIn } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,

      },
      {
        path: "join",
        Component: Register,
      },
   
      {
        path: "FeaturepropertiesDitels/:id",
        Component: FeaturepropertiesDitels,
      },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          { index: true, Component: GuestDashboard },
          { path: "guest", Component: GuestDashboard },
          { path: "host", Component: HostDashboard },
        ],
      },
    ],
  },
]);

export default router;

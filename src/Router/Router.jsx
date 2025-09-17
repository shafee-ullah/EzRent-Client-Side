
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import FeaturepropertiesDitels from "../Pages/Home/FeaturedProperties/FeaturepropertiesDitels";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import GuestDashboard from "../Pages/Dashboard/GuestDashboard";
import HostDashboard from "../Pages/Dashboard/HostDashboard";
import BrowseProperties from "../Pages/BrowseProperties/BrowseProperties";

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
        path: "FeaturepropertiesDitels/:id",
        Component: FeaturepropertiesDitels,
      },
      {
        path:"BrowseProperties",
        Component:BrowseProperties
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

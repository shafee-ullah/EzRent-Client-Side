import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import GuestDashboard from "../Pages/Dashboard/GuestDashboard";
import HostDashboard from "../Pages/Dashboard/HostDashboard";

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

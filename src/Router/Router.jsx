import { createBrowserRouter } from "react-router";
import RootLayouts from '../Layouts/RootLayouts'
import Home from "../Pages/Home/Home/Home"
import FeaturepropertiesDitels from "../Pages/Home/FeaturedProperties/FeaturepropertiesDitels";


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
              path: "/FeaturepropertiesDitels/:id",
              Component:FeaturepropertiesDitels
            }
        ]
    },
]);


export default router; 
import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { Loader } from 'lucide-react';

const PrivateRoutes = ({ children }) => {
    const locations = useLocation();
    const { user, loading } = use(AuthContext);



    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate state={locations.pathname} to={'/join'}></Navigate>
    }

    return children;
};

export default PrivateRoutes;
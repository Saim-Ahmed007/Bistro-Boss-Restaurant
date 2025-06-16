import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation()
    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate state={{from: location}} replace to="/login"></Navigate>
};

export default AdminRoute;
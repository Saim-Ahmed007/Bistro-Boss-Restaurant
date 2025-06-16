import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user){
        return children
    }
    return <Navigate state={{from: location}} replace to="/login"></Navigate>
    
};

export default PrivateRoutes;
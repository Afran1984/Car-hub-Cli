import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    // user login go to home page
    const location = useLocation();
    // console.log(location.pathname);

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace></Navigate>
};

export default PrivateRoute;
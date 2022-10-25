import { useLocation, Navigate, Outlet } from 'react-router-dom';
import config from '~/config';
import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const accessToken = localStorage.getItem('accessToken');
    const currentRole = localStorage.getItem('role');
    const location = useLocation();
    console.log(currentRole);
    return allowedRoles?.includes(currentRole) ? (
        <Outlet />
    ) : accessToken ? (
        <Navigate to={config.routes.unauthorized} state={{ from: location }} replace />
    ) : (
        <Navigate to={config.routes.signin} state={{ from: location }} replace />
    );
    // const { auth } = useAuth();
    // const location = useLocation();

    // console.log(auth?.role);
    // return allowedRoles.includes(auth?.role) ? (
    //     <Outlet />
    // ) : auth?.phone ? (
    //     <Navigate to={config.routes.unauthorized} state={{ from: location }} replace />
    // ) : (
    //     <Navigate to={config.routes.signin} state={{ from: location }} replace />
    // );
};

export default RequireAuth;

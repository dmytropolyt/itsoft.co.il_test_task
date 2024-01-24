import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../AppContext';

export { PrivateRoutes };

function PrivateRoutes() {
    const isAuth = useApp().isAuth;
    
    return (
        isAuth !== undefined ? (isAuth ? <Outlet /> : <Navigate to='/login' />) : null
    )
}
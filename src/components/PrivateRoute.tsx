import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../stores/globalStore.ts';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useStore();
    const location = useLocation();

    if (!user) {
        // if the user is not logged in, redirect to the login page
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    // if the user is logged in, render the children components (protected content)
    return <>{children}</>;
};

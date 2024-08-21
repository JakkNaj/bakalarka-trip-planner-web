import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/loginPage.tsx';
import { HomePage } from './pages/homePage.tsx';
import { TripPage } from './pages/tripPage.tsx';
import { EditActivityPage } from './pages/editActivityPage.tsx';
import { PrivateRoute } from './components/PrivateRoute.tsx';
import { LayoutComponent } from './components/LayoutComponent.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutComponent />,
        children: [
            {
                path: '/',
                element: <LoginPage />,
            },
            {
                path: '/home',
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/trip/:id',
                element: (
                    <PrivateRoute>
                        <TripPage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/trip/:tripId/activity/:activityId',
                element: (
                    <PrivateRoute>
                        <EditActivityPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
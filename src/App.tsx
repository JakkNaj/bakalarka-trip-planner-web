import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/loginPage.tsx';
import { HomePage } from './pages/homePage.tsx';
import { TripPage } from './pages/tripPage/tripPage.tsx';
import { EditActivityPage } from './pages/editActivityPage.tsx';
import { PrivateRoute } from './components/PrivateRoute.tsx';
import { LayoutComponent } from './components/LayoutComponent.tsx';
import { fetchTrip, fetchTrips } from './utils/trip_api.ts';
import { fetchActivity } from './utils/activity_api.ts';
import { useEffect, useState } from 'react';
import { useStore } from './stores/globalStore.ts';

const router = createBrowserRouter([
        {
            path: '/',
            element: <LayoutComponent />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                    loader: fetchTrips,
                    errorElement: <p>Failed to load trips</p>,
                },
                {
                    path: '/trip/:id',
                    loader: async ({params}) => {
                        if (!params.id) {
                            return null;
                        }
                        return await fetchTrip(parseInt(params.id));
                    },
                    errorElement: <p>Failed to load trip</p>,
                    element: (
                        <PrivateRoute>
                            <TripPage />
                        </PrivateRoute>
                    ),
                },
                {
                    //not used route
                    path: '/trip/:tripId/activity/:activityId',
                    loader: async ({params}) => {
                        if (!params.activityId) {
                            return null;
                        }
                        return await fetchActivity(parseInt(params.activityId));
                    },
                    errorElement: <p>Failed to load activity</p>,
                    element: (
                        <PrivateRoute>
                            <EditActivityPage />
                        </PrivateRoute>
                    ),
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
    ],
);

const App = () => {
    const [isAppReady, setIsAppReady] = useState(false);
    const { initializeUser } = useStore();

    useEffect(() => {
        const initApp = async () => {
            const success = await initializeUser();
            if(!success) {
                console.log('Failed to initialize user');
            }
            setIsAppReady(true);
        }
        initApp();
    }, [initializeUser]);

    if (!isAppReady) {
        return;
    }

    return <RouterProvider router={router} />;
};

export default App;
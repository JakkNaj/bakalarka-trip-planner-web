import {LoginPage} from "./pages/loginPage.tsx";
import {HomePage} from "./pages/homePage.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TripPage} from "./pages/tripPage.tsx";
import {EditActivityPage} from "./pages/editActivityPage.tsx";
import {PrivateRoute} from "./components/PrivateRoute.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/trip/:id"
                    element={
                        <PrivateRoute>
                            <TripPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/trip/:tripId/activity/:activityId"
                    element={
                        <PrivateRoute>
                            <EditActivityPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App

import {LoginPage} from "./pages/loginPage.tsx";
import {HomePage} from "./pages/homePage.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TripPage} from "./pages/tripPage.tsx";
import {EditActivityPage} from "./pages/editActivityPage.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/trip/:id" element={<TripPage />} />
                <Route path="/trip/:tripId/activity/:activityId" element={<EditActivityPage />} />
            </Routes>
        </Router>
    )
}

export default App

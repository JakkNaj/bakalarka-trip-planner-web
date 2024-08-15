import {LoginPage} from "../pages/loginPage.tsx";
import {SuccessPage} from "../pages/successPage.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/success" element={<SuccessPage />} />
            </Routes>
        </Router>
    )
}

export default App

import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/globalStore.ts";
import { TripsDisplay } from "../components/TripsDisplay.tsx";
import {NewTripForm} from "../components/NewTripForm.tsx";

export const HomePage = () => {
    const navigate = useNavigate();
    const { logoutAndReset } = useStore();
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            {showForm && <NewTripForm onClose={() => setShowForm(false)} />}
            <TripsDisplay setShowForm={setShowForm}/>
            <button style={{marginTop: "20px", backgroundColor: "lightslategrey"}} onClick={() => logoutAndReset(navigate)}>Logout</button>
        </>
    );
}
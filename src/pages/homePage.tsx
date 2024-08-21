import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/globalStore.ts";
import CircularProgress from '@mui/material/CircularProgress';
import { NewTripForm } from "../components/NewTripForm.tsx";

export const HomePage = () => {
    const navigate = useNavigate();
    const {
        user,
        logoutAndReset,
        trips,
        fetchTrips,
    } = useStore();

    // Separate state for background fetching indicator
    const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!trips.length) {
            fetchInitialTrips();
        } else {
            setIsBackgroundLoading(true);
            fetchTrips()
                .catch((e) => {
                    console.error('Error fetching trips in background:', e.message);
                    setError('Failed to update trips.');
                })
                .finally(() => setIsBackgroundLoading(false));
        }
    }, [fetchTrips, trips.length]);

    const fetchInitialTrips = async () => {
        try {
            setIsBackgroundLoading(true);
            await fetchTrips();
        } catch (e) {
            console.error('Error fetching trips:', e.message);
            setError('Failed to load trips. Please try again later.');
        } finally {
            setIsBackgroundLoading(false);
        }
    };

    const ShowTrips = () => {
        if (trips.length === 0 && !isBackgroundLoading) {
            return <p>No trips found. Start by adding a new one!</p>;
        }

        return (
            <>
                <h2>Your Trips</h2>
                {isBackgroundLoading && <CircularProgress />}
                <button style={{marginTop: "20px", marginBottom: "20px", backgroundColor: "lightcoral"}} onClick={() => setShowForm(true)}>Add new Trip</button>
                {error && <p>{error}</p>}
                {trips.map((trip) => (
                    <div key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.description}</p>
                        <p>{trip.date_start} - {trip.date_end}</p>
                        <button onClick={() => {navigate(`/trip/${trip.id}`)}}>Show Plan</button>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <h1>
                Hello world, success!!
            </h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            {showForm && <NewTripForm onClose={() => setShowForm(false)} />}
            <ShowTrips />
            <button style={{marginTop: "20px", backgroundColor: "lightslategrey"}} onClick={() => logoutAndReset(navigate)}>Logout</button>
        </>
    );
}

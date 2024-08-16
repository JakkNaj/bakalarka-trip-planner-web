import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useStore} from "../store/globalStore.ts";

export const HomePage = () => {
    const navigate = useNavigate();
    const {
        user,
        logout,
        trips,
        fetchTrips,
        tripsNetworkError,
    } = useStore();

    useEffect(() => {
        fetchTrips();
    }, []);



    const ShowTrips = () => {
        if (trips.length === 0) {
            return <h1>Loading...</h1>
        }

        return (
            <>
                <h2>Your Trips</h2>
                <ul>
                    {trips.map((trip) => (
                        <li key={trip.id}>
                            <h3>{trip.name}</h3>
                            <p>{trip.description}</p>
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    return (
        <>
            <h1>
                Hello world, success!!
            </h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            {tripsNetworkError && <p>{tripsNetworkError}</p>}
            <ShowTrips/>
            <button onClick={() => logout(navigate)}>Logout</button>
        </>
    )
}
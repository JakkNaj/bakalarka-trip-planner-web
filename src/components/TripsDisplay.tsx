import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/globalStore.ts";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";
import { fonts } from "../assets/fonts.ts";
import { OrderByTypes } from "../types/orderByTypes.ts";

export const TripsDisplay = ({setShowForm}) => {
    const navigate = useNavigate();
    const { trips, fetchTrips, orderTripsBy } = useStore();

    const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const filteredTrips = trips.filter((trip) => {
        if (orderTripsBy === OrderByTypes.UPCOMING) {
            return new Date(trip.date_start) >= new Date();
        } else if (orderTripsBy === OrderByTypes.PAST) {
            return new Date(trip.date_end) < new Date();
        }
        return true;
    });

    return (
        <>
            {orderTripsBy && orderTripsBy === OrderByTypes.UPCOMING ? <Styled.H1>Your Upcoming Trips</Styled.H1> : <Styled.H1>Your Past Trips</Styled.H1>}
            {isBackgroundLoading && <CircularProgress />}
            <button style={{marginTop: "20px", marginBottom: "20px", backgroundColor: "lightcoral"}} onClick={() => setShowForm(true)}>Add new Trip</button>
            {error && <p>{error}</p>}
            {filteredTrips.map((trip) => (
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

const Styled = {
    H1: styled.h1({
        fontFamily: fonts.heading,
    })
}
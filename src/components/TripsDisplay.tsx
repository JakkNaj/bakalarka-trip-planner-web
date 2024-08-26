import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/globalStore.ts";
import CircularProgress from '@mui/material/CircularProgress';
import { OrderByTypes } from "../types/orderByTypes.ts";
import styled from "styled-components";
import {fonts} from "../assets/fonts.ts";
import {TripCard} from "./TripCard.tsx";

export const TripsDisplay = () => {
    const navigate = useNavigate();
    const { user ,trips, fetchTrips, orderTripsBy } = useStore();

    const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!trips.length) {
            fetchInitialTrips();
        } else {
            setIsBackgroundLoading(true);
            fetchTrips(user?.id)
                .catch((e) => {
                    console.error('Error fetching trips in background:', e.message);
                    setError('Failed to update trips.');
                })
                .finally(() => {
                    setIsBackgroundLoading(false)
                });
        }
    }, [fetchTrips, trips.length]);

    const fetchInitialTrips = async () => {
        try {
            setIsBackgroundLoading(true);
            await fetchTrips(user?.id);
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

    const displayTrips = () => {
        if (filteredTrips?.length === 0) {
            return <Styled.Text>Plan new trips to see them here!</Styled.Text>;
        }
        return filteredTrips.map((trip) => (
            <TripCard
                key={trip.id}
                trip={trip}
                onShowDetails={() => {navigate(`/trip/${trip.id}`)}}
            />
        ));
    }

    return (
        <Styled.TripsContainer>
            {isBackgroundLoading && <CircularProgress />}
            {error && <p>{error}</p>}
            {displayTrips()}
        </Styled.TripsContainer>
    );
}

const Styled = {
    Text: styled.p({
        fontFamily: fonts.normal,
    }),
    TripsContainer: styled.div({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    }),
}


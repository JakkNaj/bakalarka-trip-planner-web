import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/globalStore.ts";
import { OrderByTypes } from "../types/orderByTypes.ts";
import styled from "styled-components";
import {fonts} from "../assets/fonts.ts";
import {TripCard} from "./TripCard.tsx";

interface TripsDisplayProps {
    setIsBackgroundLoading: (loading: boolean) => void;
}

export const TripsDisplay = ({setIsBackgroundLoading}: TripsDisplayProps) => {
    const navigate = useNavigate();
    const { user, trips, fetchTrips, orderTripsBy } = useStore();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialTrips = async () => {
            try {
                setIsBackgroundLoading(true);
                if (user?.id === undefined) {
                    return null;
                }
                await fetchTrips(user.id);
            } catch (e) {
                const error = e as Error;
                console.error('Error fetching trips:', error.message);
                setError('Failed to load trips. Please try again later.');
            } finally {
                setIsBackgroundLoading(false);
            }
        };

        if (!trips.length) {
            fetchInitialTrips();
        } else {
            setIsBackgroundLoading(true);
            if (user === null) {
                return;
            }
            fetchTrips(user.id)
                .then(() => {
                    setIsBackgroundLoading(false);
                })
                .catch((e) => {
                    console.error('Error fetching trips in background:', e.message);
                    setError('Failed to update trips.');
                    setIsBackgroundLoading(false);
                });
        }
    }, [fetchTrips, trips.length, setIsBackgroundLoading, user]);

   

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


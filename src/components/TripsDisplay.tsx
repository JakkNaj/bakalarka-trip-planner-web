import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/globalStore.ts";
import { OrderByTypes } from "../types/orderByTypes.ts";
import styled from "styled-components";
import {fonts} from "../assets/fonts.ts";
import {TripCard} from "./TripCard.tsx";
import { useMemo } from "react";

export const TripsDisplay = () => {
    const navigate = useNavigate();
    const { orderTripsBy, trips } = useStore();

    const filteredTrips = useMemo(() => {
        return trips.filter((trip) => {
            if (orderTripsBy === OrderByTypes.UPCOMING) {
                return new Date(trip.date_start) >= new Date();
            } else if (orderTripsBy === OrderByTypes.PAST) {
                return new Date(trip.date_end) < new Date();
            }
            return true;
        });
    }, [trips, orderTripsBy]);

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


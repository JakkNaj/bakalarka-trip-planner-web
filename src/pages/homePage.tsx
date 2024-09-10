import { useEffect, useState } from "react";
import { useStore } from "../stores/globalStore.ts";
import { TripsDisplay } from "../components/TripsDisplay.tsx";
import { TripForm } from "../components/TripForm.tsx";
import { OrderByTypes } from "../types/orderByTypes.ts";
import styled from "styled-components";
import { fonts } from "../assets/fonts.ts";
import { colors } from "../assets/colors.ts";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLoaderData } from "react-router-dom";
import { TripType } from "../types/trip/TripType.ts";
import { MainButton } from "../components/MainButton.tsx";
import { TripInsertType } from "../types/trip/TripInsertType.ts";
import { insertTrip } from "../utils/trip_api.ts";

export const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const { orderTripsBy, setTrips, addTrip } = useStore();
    const loadedTrips = useLoaderData() as TripType[];
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        //set trips (from loader) in the store
        setTrips(loadedTrips);
    }, [loadedTrips, setTrips]);

    const handleSubmit = async (newTrip: TripInsertType) => {
        try {
            const insertedTrip = await insertTrip(newTrip);
            console.log('Trip created:', insertedTrip);
            addTrip(insertedTrip);
        } catch (e : unknown) {
            const error = e as Error;
            console.error('Error creating trip:', error.message);
            setFormError('Failed to create trip. Please try again later.');
        }
    };

    return (
        <Styled.PageContainer>
            <Styled.HeadingContainer>
                {orderTripsBy && orderTripsBy === OrderByTypes.UPCOMING ?
                    <Styled.H1>Your Upcoming Trips</Styled.H1> :
                    <Styled.H1>Your Past Trips</Styled.H1>
                }
                <MainButton text="Add new Trip" right_after="4%" width_after="48%" onClick={() => setShowForm(true)} >
                    <Styled.KeyboardBackspaceIcon />
                </MainButton>
            </Styled.HeadingContainer>
            <Styled.ContentContainer>
                {showForm &&
                     <TripForm 
                        onClose={() => setShowForm(false)}
                        onSubmit={handleSubmit}
                        formError={formError}
                        submitBtnText="Create Trip"
                    />}
                <TripsDisplay />
            </Styled.ContentContainer>
        </Styled.PageContainer>
    );
}

const Styled = {
    PageContainer: styled.div({
       padding: "0 4rem",
    }),
    H1: styled.h1({
        fontFamily: fonts.heading,
        color: colors.mainBlue,
        margin: 0,
    }),
    HeadingContainer: styled.div({
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "4rem",
        margin: "2rem 0 1.4rem 0",
    }),
    ContentContainer: styled.div({
        display: "flex",
        gap: "1rem",
        marginTop: "1rem",
    }),
    AddTripButton: styled.button({
        border: "none",
        fontSize: "1rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        position: "relative",
        color: colors.headingText,
        textTransform: "lowercase",
        fontFamily: fonts.normal,
        transition: "background-color 0.4s, color 0.4s",
        padding: "0.2rem 0.4rem",
        borderRadius: "0.25rem",
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: "4%",
            width: "48%",
            borderBottom: `0.125rem solid ${colors.mainBlue}`,
        },
        "&:hover": {
            backgroundColor: colors.mainBlue,
            color: colors.white,
            "& .white-backspace": {
                color: colors.white,
            },
        },
    }),
    KeyboardBackspaceIcon: styled(KeyboardBackspaceIcon)({
        color: colors.mainBlue,
        marginRight: "0.6rem",
    }),
}
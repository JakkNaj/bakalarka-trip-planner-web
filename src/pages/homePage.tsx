import { useState } from "react";
import { useStore } from "../stores/globalStore.ts";
import { TripsDisplay } from "../components/TripsDisplay.tsx";
import { NewTripForm } from "../components/NewTripForm.tsx";
import { OrderByTypes } from "../types/orderByTypes.ts";
import styled from "styled-components";
import { fonts } from "../assets/fonts.ts";
import { colors } from "../assets/colors.ts";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Button, CircularProgress} from "@mui/material";

export const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const { orderTripsBy } = useStore();
    const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);

    return (
        <Styled.PageContainer>
            <Styled.HeadingContainer>
                {orderTripsBy && orderTripsBy === OrderByTypes.UPCOMING ?
                    <Styled.H1>Your Upcoming Trips</Styled.H1> :
                    <Styled.H1>Your Past Trips</Styled.H1>
                }
                <Styled.AddTripButton onClick={() => setShowForm(true)}>
                    <Styled.KeyboardBackspaceIcon className="white-backspace" />
                    Add new Trip
                </Styled.AddTripButton>
                {isBackgroundLoading && <CircularProgress style={{ color: colors.mainBlue }} size={32} />}
            </Styled.HeadingContainer>
            <Styled.ContentContainer>
                {showForm && <NewTripForm onClose={() => setShowForm(false)} />}
                <TripsDisplay setIsBackgroundLoading={setIsBackgroundLoading}/>
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
    AddTripButton: styled(Button)({
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
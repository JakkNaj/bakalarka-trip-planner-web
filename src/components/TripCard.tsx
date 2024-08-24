import styled from 'styled-components';
import { Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { colors } from '../assets/colors.ts';
import { fonts } from '../assets/fonts.ts';
import { TripType } from '../types/trip/TripType.ts';
import { ImageUploadButton } from "./ImageUploadButton.tsx";
import {useStore} from "../stores/globalStore.ts";
import {TripImage} from "./TripImage.tsx";
import {useState} from "react";

type TripCardProps = {
    trip: TripType;
    onShowDetails: (id: number) => void;
    onEditTrip: (id: number) => void;
};

export const TripCard = ({ trip, onShowDetails, onEditTrip } : TripCardProps) => {
    const { user, getTripImage, setTripImage } = useStore();

    if (!user) {
        return null;
    }

    const handleImageUpload = (imageUrl) => {
        setTripImage(trip.id, imageUrl);
    }

    return (
        <Styled.Card>
            <div>
                <Styled.Header>
                    <Styled.Title>{trip.title}</Styled.Title>
                </Styled.Header>
                <Styled.Location>{trip.location}</Styled.Location>
                <Styled.Dates>{trip.date_start} - {trip.date_end}</Styled.Dates>
                <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                    <Styled.EditButton>
                        <Styled.EditIcon
                            onClick={() => onEditTrip(trip.id)}
                            className="white-hover"
                        />
                        <p style={{margin: 0}}>Edit</p>
                    </Styled.EditButton>
                    <Styled.Button onClick={() => onShowDetails(trip.id)}>
                        Show Trip Details
                        <Styled.ArrowRightIcon className="white-hover"/>
                    </Styled.Button>
                    <ImageUploadButton onUploadSuccess={handleImageUpload} tripId={trip.id}>
                        Upload Image
                    </ImageUploadButton>
                </div>
            </div>
            <TripImage imageUrl={getTripImage(trip.id)} tripId={trip.id} />
        </Styled.Card>
    );
};

const Styled = {
    Card: styled.div({
        border: `0.0625rem solid ${colors.normalText}`,
        borderRadius: '0.5rem',
        padding: '1rem 0 1rem 1rem',
        marginBottom: '1rem',
        transition: 'transform 0.3s ease-in-out',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        maxHeight: "10rem",
    }),
    Header: styled.div({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: "2rem",
    }),
    Title: styled.h2({
        fontFamily: fonts.heading,
        color: colors.mainBlue,
        margin: 0,
    }),
    EditIcon: styled(EditNoteIcon)({
        cursor: 'pointer',
        color: colors.mainBlue,
        borderRadius: '10%',
    }),
    Dates: styled.p({
        fontFamily: fonts.normal,
        color: colors.normalText,
    }),
    Location: styled.p({
        fontFamily: fonts.normal,
        color: colors.normalText,
    }),
    Button: styled(Button)({
        color: colors.headingText,
        textTransform: "lowercase",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "4%",
            width: "40%",
            borderBottom: `0.125rem solid ${colors.mainBlue}`,
        },
        '&:hover': {
            backgroundColor: colors.mainBlue,
            color: colors.white,
            "& .white-hover": {
                color: colors.white,
            },
        },
    }),
    ArrowRightIcon: styled(KeyboardArrowRightIcon)({
        marginLeft: "0.5rem",
    }),
    EditButton: styled(Button)({
        color: colors.headingText,
        textTransform: "lowercase",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.4rem",
        '&:hover': {
            backgroundColor: colors.mainBlue,
            color: colors.white,
            "& .white-hover": {
                color: colors.white,
            },
        },
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: "10%",
            width: "40%",
            borderBottom: `0.125rem solid ${colors.mainBlue}`,
        },
    }),

};
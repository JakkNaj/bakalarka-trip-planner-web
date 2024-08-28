import { useStore } from "../stores/globalStore.ts";
import { TripImage } from "./TripImage.tsx";
import { TripType } from '../types/trip/TripType.ts';
import {colors} from "../assets/colors.ts";
import {fonts} from "../assets/fonts.ts";
import styled from "styled-components";
import {Button} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type TripCardProps = {
    trip: TripType;
    onShowDetails: (id: number) => void;
};

export const TripCard = ({ trip, onShowDetails } : TripCardProps) => {
    const { user  } = useStore();

    if (!user) {
        return null;
    }

    return (
        <Styled.Card onClick={(e) => {
            e.stopPropagation();
            onShowDetails(trip.id);
        }}>
            <div>
                <Styled.Header>
                    <Styled.Title>{trip.title}</Styled.Title>
                </Styled.Header>
                <Styled.Location>{trip.location}</Styled.Location>
                <Styled.Dates>{trip.date_start} - {trip.date_end}</Styled.Dates>
                <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                    <Styled.Button onClick={(e) => { e.stopPropagation(); onShowDetails(trip.id); }}>
                        Show Trip Details
                        <Styled.ArrowRightIcon className="white-hover"/>
                    </Styled.Button>
                </div>
            </div>
            <TripImage imageUrl={trip.imageUrl} tripId={trip.id}/>
        </Styled.Card>
    );
};

const Styled = {
    Card: styled.div({
        border: `0.0625rem solid ${colors.darkGrey}`,
        borderRadius: '0.4rem',
        padding: '1rem 0 1rem 1rem',
        marginBottom: '1rem',
        transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        maxHeight: "10rem",
        width: "100%",
        '&:hover': {
            boxShadow: `-0.1rem 0 0 0 ${colors.mainBlue}`,
        },
        cursor: "pointer",
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
        padding: "0.2rem 0.4rem",
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

};
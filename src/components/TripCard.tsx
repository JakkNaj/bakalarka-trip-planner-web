import { useStore } from "../stores/globalStore.ts";
import { TripImage } from "./TripImage.tsx";
import { TripType } from '../types/trip/TripType.ts';
import {colors} from "../assets/colors.ts";
import {fonts} from "../assets/fonts.ts";
import styled from "styled-components";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { MainButton } from "./MainButton.tsx";

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
                <Styled.Dates>{trip.date_start.toLocaleString()} - {trip.date_end.toLocaleString()}</Styled.Dates>
                <MainButton text="show trip details" onClick={(e) => { e.stopPropagation(); onShowDetails(trip.id); }} right_after="57%" width_after="40%" iconLeft={false}>
                    <Styled.ArrowRightIcon/>
                </MainButton>
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

    ArrowRightIcon: styled(KeyboardArrowRightIcon)({
        marginLeft: "0.5rem",
    }),

};
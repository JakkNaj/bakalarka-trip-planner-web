import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../assets/colors.ts';
import { fonts } from '../../assets/fonts.ts';
import { format } from 'date-fns';
import { TripImage } from '../../components/TripImage.tsx';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {TripType} from "../../types/trip/TripType.ts";

interface TripPageHeaderProps {
    trip: TripType;
    onEditTrip: (id: number) => void;
}

export const TripPageHeader = ({ trip, onEditTrip }: TripPageHeaderProps) => {
    const navigate = useNavigate();

    const formatDate = (date: Date) => {
        return format(date, 'MMMM do yyyy');
    };

    return (
        <Styled.HeadingContainer>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", alignItems: "flex-start"}}>
                <Styled.BackButton onClick={() => navigate('/')}>
                    <Styled.KeyboardBackspaceIcon className="white-backspace"/>
                    Back to trips
                </Styled.BackButton>
                <Styled.H2>Trip: {trip.title}</Styled.H2>
                <Styled.Description>{trip.location}</Styled.Description>
                <Styled.Dates>
                    <h4 style={{margin: 0}}>from: </h4 >
                    <Styled.Description style={{margin: 0}}>{formatDate(new Date(trip.date_start))}</Styled.Description>
                </Styled.Dates>
                <Styled.Dates>
                    <h4 style={{margin: 0}}>until: </h4>
                    <Styled.Description style={{margin: 0}}>{formatDate(new Date(trip.date_end))}</Styled.Description>
                </Styled.Dates>
                {trip?.description && trip.description.length != 0 &&
                    (
                        <>
                            <h4 style={{marginTop: 0, marginBottom: "0.4rem", fontFamily: fonts.normal}}>Description</h4>
                            <Styled.Description>
                                {trip.description}
                            </Styled.Description>
                        </>
                    )
                }
                <Styled.EditButton onClick={(e) => { e.stopPropagation(); onEditTrip(trip.id); }}>
                    <Styled.EditIcon className="white-hover" />
                    <p style={{margin: 0}}>Edit</p>
                </Styled.EditButton>
            </div>

            <TripImage
                tripId={trip.id}
                imageUrl={trip.imageUrl}
                showUploadButton={true}
            />
        </Styled.HeadingContainer>
    );
};

const Styled = {
    HeadingContainer: styled.div({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "4rem",
        flexWrap: "wrap",
        margin: "2rem 0 1rem 0",
        paddingBottom: "2rem",
    }),
    H2: styled.h2({
        fontFamily: fonts.heading,
        color: colors.mainBlue,
        marginBottom: 0,
    }),
    Dates: styled.div({
        fontFamily: fonts.title,
        color: colors.normalText,
        margin: "0.8rem 0",
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        flexWrap: "nowrap",
    }),
    Description: styled.p({
        fontFamily: fonts.normal,
        color: colors.normalText,
        borderRadius: '0.4rem',
        margin: 0,
        width: "100%"
    }),
    BackButton: styled(Button)({
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
            left: "25%",
            width: "30%",
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
    EditButton: styled(Button)({
        color: colors.headingText,
        fontSize: "1rem",
        textTransform: "lowercase",
        marginTop: "0.4rem",
        padding: "0.2rem 0.4rem",
        display: "flex",
        alignItems: "center",
        width: "fit-content",
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
    EditIcon: styled(EditNoteIcon)({
        cursor: 'pointer',
        color: colors.mainBlue,
        borderRadius: '10%',
    }),
};
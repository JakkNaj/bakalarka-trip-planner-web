import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../assets/colors.ts';
import { fonts } from '../../assets/fonts.ts';
import { format } from 'date-fns';
import { TripImage } from '../../components/TripImage.tsx';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {TripType} from "../../types/trip/TripType.ts";
import { MainButton } from '../../components/MainButton.tsx';
import { useState } from 'react';
import { TripForm } from '../../components/TripForm.tsx';
import { useStore } from '../../stores/globalStore.ts';
import { TripInsertType } from '../../types/trip/TripInsertType.ts';
interface TripPageHeaderProps {
    trip: TripType;
    handleFormSubmit: (updatedTrip: TripInsertType) => void;
}

export const TripPageHeader = ({ trip, handleFormSubmit }: TripPageHeaderProps) => {
    const navigate = useNavigate();
    const { user } = useStore();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return null;
    }

    const formatDate = (date: Date) => {
        return format(date, 'MMMM do yyyy');
    };

    const handleEditTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsEditing(true);
    }

    const onFormSubmit = (newTrip: TripInsertType) => {
        handleFormSubmit(newTrip);
        setIsEditing(false);
    }

    return (
        <Styled.HeadingContainer>
            {isEditing ? (
                <TripForm
                    onClose={() => setIsEditing(false)}
                    onSubmit={onFormSubmit}
                    formData={{...trip, user_id: user.id}}
                    submitBtnText='Update Trip'
                />
            ) : (
                <Styled.ContentContainer>
                    <MainButton text="Back to trips" right_after="42%" width_after="30%" onClick={() => navigate('/')}>
                        <Styled.KeyboardBackspaceIcon className="white-backspace"/>
                    </MainButton>
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
                                <h4 style={{marginTop: 0, marginBottom: "0.4rem", fontFamily: fonts.normal, }}>Description</h4>
                                <Styled.Description>
                                    {trip.description}
                                </Styled.Description>
                            </>
                        )
                    }
                    <MainButton text="Edit" right_after="10%" width_after="40%" onClick={handleEditTrip}>
                        <Styled.EditIcon className="white-hover" />
                    </MainButton>
                </Styled.ContentContainer>
            )}
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
        width: "100%",
        '@media (max-width: 768px)': {
            margin: "1rem 0 0.5rem 0",
            justifyContent: "flex-start",
            width: "100%",
        },
    }),
    ContentContainer: styled.div({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", 
        height: "100%",gap: "0.8rem", 
        alignItems: "flex-start", 
        maxWidth: "60%",
        '@media (max-width: 768px)': {
            maxWidth: "100%",
        },
    }),
    H2: styled.h2({
        fontFamily: fonts.heading,
        color: colors.mainBlue,
        margin: 0,
        '@media (max-width: 768px)': {
            fontSize: "1.5rem",
        },
    }),
    Dates: styled.div({
        fontFamily: fonts.title,
        color: colors.normalText,
        margin: 0,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        flexWrap: "nowrap",
        '@media (max-width: 768px)': {
            gap: "0.2rem",
        },
    }),
    Description: styled.p({
        fontFamily: fonts.normal,
        color: colors.normalText,
        borderRadius: '0.4rem',
        margin: 0,
        width: "100%",
    }),
    KeyboardBackspaceIcon: styled(KeyboardBackspaceIcon)({
        color: colors.mainBlue,
        marginRight: "0.6rem",
        '@media (max-width: 768px)': {
            marginRight: "0.3rem",
        },
    }),
    EditIcon: styled(EditNoteIcon)({
        cursor: 'pointer',
        color: colors.mainBlue,
        borderRadius: '10%',
        '@media (max-width: 768px)': {
            fontSize: "1.2rem",
        },
    }),
};
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

interface TripPageHeaderProps {
    trip: TripType;
    onEditTrip: (id: number) => void;
}

export const TripPageHeader = ({ trip, onEditTrip }: TripPageHeaderProps) => {
    const navigate = useNavigate();

    const formatDate = (date: Date) => {
        return format(date, 'MMMM do yyyy');
    };

    const handleEditTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onEditTrip(trip.id);
    }

    return (
        <Styled.HeadingContainer>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", alignItems: "flex-start"}}>
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
                            <h4 style={{marginTop: 0, marginBottom: "0.4rem", fontFamily: fonts.normal}}>Description</h4>
                            <Styled.Description>
                                {trip.description}
                            </Styled.Description>
                        </>
                    )
                }
                <MainButton text="Edit" right_after="10%" width_after="40%" onClick={handleEditTrip}>
                    <Styled.EditIcon className="white-hover" />
                </MainButton>
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
    KeyboardBackspaceIcon: styled(KeyboardBackspaceIcon)({
        color: colors.mainBlue,
        marginRight: "0.6rem",
    }),
    EditIcon: styled(EditNoteIcon)({
        cursor: 'pointer',
        color: colors.mainBlue,
        borderRadius: '10%',
    }),
};
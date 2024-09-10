import { useState } from 'react';
import { useStore } from "../stores/globalStore.ts";
import styled from "styled-components";
import { FormControl, TextField, Button, Typography } from '@mui/material';
import {fonts} from "../assets/fonts.ts";
import {colors} from "../assets/colors.ts";
import { MainButton } from './MainButton.tsx';
import AddIcon from '@mui/icons-material/Add';
import { TripInsertType, TripInsertTypeSchema } from '../types/trip/TripInsertType.ts';
import { format } from 'date-fns';

type TripFormProps = {
    onClose: () => void,
    onSubmit: (newTrip: TripInsertType) => void,
    formError?: string | null,
    formData?: TripInsertType,
};

export const TripForm = ({ onClose, onSubmit, formError, formData }: TripFormProps) => {
    const { user } = useStore();
    const [title, setTitle] = useState<string>(formData?.title || "");
    const [description, setDescription] = useState<string>(formData?.description || "");
    const [dateStart, setDateStart] = useState<string>(formData ? format(new Date(formData.date_start), 'yyyy-MM-dd') : new Date().toISOString().slice(0, 10));
    const [dateEnd, setDateEnd] = useState<string>(formData ? format(new Date(formData.date_end), 'yyyy-MM-dd') : new Date().toISOString().slice(0, 10));
    const [location, setLocation] = useState<string>(formData?.location || "");

    if (!user) {
        return <Typography>Please log in to create a new trip.</Typography>;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTrip = {
            title,
            description,
            date_start: new Date(dateStart),
            date_end: new Date(dateEnd),
            user_id: user.id,
            location: location,
        };
        if (TripInsertTypeSchema.safeParse(newTrip)){
            onSubmit(newTrip);
            onClose();
        }
    }

    return (
        <Styled.Form onSubmit={handleSubmit}>
            {formError && <Typography color="error">{formError}</Typography>}
            <div>
                <FormControl fullWidth margin="none">
                    <Styled.TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Styled.TextField
                        label="Start Date"
                        type="date"
                        value={dateStart}
                        onChange={(e) => setDateStart(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Styled.TextField
                        label="End Date"
                        type="date"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Styled.TextField
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Styled.TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        minRows={4}
                        maxRows={20}
                        required
                    />
                </FormControl>
                <div style={{display: "flex", gap: "1rem", marginTop: "0.4rem"}}>
                    <MainButton text='Create trip' right_after='26%' width_after='50%' type="submit">
                        <Styled.PlusIcon />
                    </MainButton>
                    <MainButton text='close' right_after='5%' width_after='90%' onClick={onClose}/>
                </div>
            </div>
        </Styled.Form>
    );
};

const Styled = {
    Form: styled.form({
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1rem",
        width: "40%",
    }),
    TextField: styled(TextField)({
        '& .MuiInputBase-root': {
            fontFamily: fonts.normal,
            borderRadius: '0.4rem',
        },
        '& .MuiInputLabel-root': {
            fontFamily: fonts.normal,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '0.4rem',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.mainBlue,
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: colors.mainBlue,
        },
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
    PlusIcon: styled(AddIcon)({
        color: colors.mainBlue,
        marginRight: "0.4rem",
    }),
};
import { useState } from 'react';
import { insertTrip } from "../utils/trip_api.ts";
import { useStore } from "../stores/globalStore.ts";
import styled from "styled-components";
import { FormControl, TextField, Button, Typography } from '@mui/material';
import {fonts} from "../assets/fonts.ts";
import {colors} from "../assets/colors.ts";

export const NewTripForm = ({ onClose }) => {
    const { user, addTrip } = useStore();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dateStart, setDateStart] = useState<string>(new Date().toISOString().slice(0, 10));
    const [dateEnd, setDateEnd] = useState<string>(new Date().toISOString().slice(0, 10));
    const [error, setError] = useState<string | null>(null);

    if (!user) {
        return <Typography>Please log in to create a new trip.</Typography>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTrip = {
                title,
                description,
                date_start: new Date(dateStart),
                date_end: new Date(dateEnd),
                user_id: user.id,
            };

            const insertedTrip = await insertTrip(newTrip);
            console.log('Trip created:', insertedTrip);
            addTrip(insertedTrip);
        } catch (e) {
            console.error('Error creating trip:', e.message);
            setError('Failed to create trip. Please try again later.');
        }

        onClose();
    };

    return (
        <Styled.Form onSubmit={handleSubmit}>
            {error && <Typography color="error">{error}</Typography>}
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
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                <Button type="submit" variant="contained" color="primary">Create Trip</Button>
                <Button type="button" onClick={onClose} variant="outlined" color="secondary">Close</Button>
            </div>
        </Styled.Form>
    );
};

const Styled = {
    Form: styled.form({
        marginLeft: "2rem",
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
};
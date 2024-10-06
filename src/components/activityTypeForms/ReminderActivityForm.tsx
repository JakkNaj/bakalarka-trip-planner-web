import { useState, useEffect } from 'react';
import { FormReminderType } from '../../types/activities/reminder/ReminderActivity';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { fonts } from "../../assets/fonts";
import { colors } from "../../assets/colors";

type ReminderActivityFormProps = {
    setDetails: (details: FormReminderType) => void;
    editActivity?: FormReminderType;
};

export const ReminderActivityForm = ({ setDetails, editActivity }: ReminderActivityFormProps) => {
    const [reminderTime, setReminderTime] = useState(editActivity?.reminder_time.toISOString().slice(0, 16) || '');
    const [note, setNote] = useState(editActivity?.note || '');

    useEffect(() => {
        setDetails({
            reminder_time: new Date(reminderTime),
            note,
        });
    }, [reminderTime, note, setDetails]);

    return (
        <>
            <StyledTextField
                label="Reminder Time"
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                fullWidth
            />
        </>
    );
};

const StyledTextField = styled(TextField)({
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
});
import { useState, useEffect } from 'react';
import { FormGeneralType } from '../../types/activities/general/GeneralActivity';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { fonts } from "../../assets/fonts";
import { colors } from "../../assets/colors";

type GeneralActivityFormProps = {
    setDetails: (details: FormGeneralType) => void;
};

export const GeneralActivityForm = ({ setDetails }: GeneralActivityFormProps) => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        setDetails({
            description,
            location,
        });
    }, [description, location, setDetails]);

    return (
        <>
            <StyledTextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
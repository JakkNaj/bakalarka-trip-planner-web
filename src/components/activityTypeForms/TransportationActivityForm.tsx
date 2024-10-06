import React, { useState } from 'react';
import { FormTransportType } from '../../types/activities/transport/TransportActivity';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { fonts } from "../../assets/fonts";
import { colors } from "../../assets/colors";

type TransportationActivityFormProps = {
    setDetails: (details: FormTransportType) => void;
    editActivity?: FormTransportType;
};

export const TransportationActivityForm = ({ setDetails, editActivity }: TransportationActivityFormProps) => {
    const [transportType, setTransportType] = useState(editActivity?.transport_type || '');
    const [departureLocation, setDepartureLocation] = useState(editActivity?.departure_location || '');
    const [arrivalLocation, setArrivalLocation] = useState(editActivity?.arrival_location || '');
    const [departureTime, setDepartureTime] = useState(editActivity?.departure_time.toISOString().slice(0, 16) || '');
    const [arrivalTime, setArrivalTime] = useState(editActivity?.arrival_time.toISOString().slice(0, 16) || '');
    const [provider, setProvider] = useState(editActivity?.provider || '');

    const onEditField = (fieldSetter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        fieldSetter(e.target.value);
        setDetails({
            transport_type: transportType,
            departure_location: departureLocation,
            arrival_location: arrivalLocation,
            departure_time: new Date(departureTime),
            arrival_time: new Date(arrivalTime),
            provider,
        });
    };

    return (
        <>
            <StyledTextField
                label="Transport Type"
                value={transportType}
                onChange={onEditField(setTransportType)}
                required
                fullWidth
            />
            <StyledTextField
                label="Departure Location"
                value={departureLocation}
                onChange={onEditField(setDepartureLocation)}
                required
                fullWidth
            />
            <StyledTextField
                label="Arrival Location"
                value={arrivalLocation}
                onChange={onEditField(setArrivalLocation)}
                required
                fullWidth
            />
            <StyledTextField
                label="Departure Time"
                type="datetime-local"
                value={departureTime}
                onChange={onEditField(setDepartureTime)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Arrival Time"
                type="datetime-local"
                value={arrivalTime}
                onChange={onEditField(setArrivalTime)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Provider"
                value={provider}
                onChange={onEditField(setProvider)}
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
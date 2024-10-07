import { useState, useEffect } from 'react';
import { FormFlightType } from '../../types/activities/flight/FlightActivity';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { fonts } from "../../assets/fonts";
import { colors } from "../../assets/colors";

type FlightActivityProps = {
    setDetails: (details: FormFlightType) => void;
    editActivity?: FormFlightType;
};

export const FlightActivityForm = ({ setDetails, editActivity }: FlightActivityProps) => {
    const [flightNumber, setFlightNumber] = useState(editActivity?.flight_number || '');
    const [departureAirport, setDepartureAirport] = useState(editActivity?.departure_airport || '');
    const [arrivalAirport, setArrivalAirport] = useState(editActivity?.arrival_airport || '');
    const [departureTime, setDepartureTime] = useState(editActivity?.departure_time.toISOString().slice(0, 16) || '');
    const [arrivalTime, setArrivalTime] = useState(editActivity?.arrival_time.toISOString().slice(0, 16) || '');
    const [airline, setAirline] = useState(editActivity?.airline || '');

    useEffect(() => {
        const updateDetails = () => {
            setDetails({
                flight_number: flightNumber,
                departure_airport: departureAirport,
                arrival_airport: arrivalAirport,
                departure_time: new Date(departureTime),
                arrival_time: new Date(arrivalTime),
                airline,
            });
        };
        updateDetails();
    }, [flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, airline, setDetails]);

    return (
        <>
            <StyledTextField
                label="Flight Number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Departure Airport"
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Arrival Airport"
                value={arrivalAirport}
                onChange={(e) => setArrivalAirport(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Departure Time"
                type="datetime-local"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Arrival Time"
                type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Airline"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
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
import { useState, useEffect } from 'react';
import { FormFlightType } from '../../types/activities/flight/FlightActivity';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { fonts } from "../../assets/fonts";
import { colors } from "../../assets/colors";

type FlightActivityProps = {
    setDetails: (details: FormFlightType) => void;
};

export const FlightActivityForm = ({ setDetails }: FlightActivityProps) => {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [airline, setAirline] = useState('');

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
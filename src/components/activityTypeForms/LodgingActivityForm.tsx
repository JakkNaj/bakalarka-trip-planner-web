import { useState, useEffect } from 'react';
import { FormLodgingType } from '../../types/activities/lodging/LodgingActivity';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { fonts } from "../../assets/fonts";
import { colors } from "../../assets/colors";

type LodgingActivityFormProps = {
    setDetails: (details: FormLodgingType) => void;
    editActivity?: FormLodgingType;
};

export const LodgingActivityForm = ({ setDetails, editActivity }: LodgingActivityFormProps) => {
    const [lodgingName, setLodgingName] = useState(editActivity?.lodging_name || '');
    const [checkInTime, setCheckInTime] = useState(editActivity?.check_in_time.toISOString().slice(0, 16) || '');
    const [checkOutTime, setCheckOutTime] = useState(editActivity?.check_out_time.toISOString().slice(0, 16) || '');
    const [address, setAddress] = useState(editActivity?.address || '');
    const [contactNumber, setContactNumber] = useState(editActivity?.contact_number || '');
    const [reservationNumber, setReservationNumber] = useState(editActivity?.reservation_number || '');


    useEffect(() => {
        setDetails({
            lodging_name: lodgingName,
            check_in_time: new Date(checkInTime),
            check_out_time: new Date(checkOutTime),
            address,
            contact_number: contactNumber,
            reservation_number: reservationNumber,
        });
    }, [lodgingName, checkInTime, checkOutTime, address, contactNumber, reservationNumber, setDetails]);

    return (
        <>
            <StyledTextField
                label="Lodging Name"
                value={lodgingName}
                onChange={(e) => setLodgingName(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Check-In Time"
                type="datetime-local"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Check-Out Time"
                type="datetime-local"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
            <StyledTextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                fullWidth
            />
            <StyledTextField
                label="Reservation Number"
                value={reservationNumber}
                onChange={(e) => setReservationNumber(e.target.value)}
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
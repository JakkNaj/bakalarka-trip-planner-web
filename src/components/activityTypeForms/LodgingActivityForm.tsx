import { useState } from 'react';

export const LodgingActivityForm = ({ setDetails }) => {
    const [lodgingName, setLodgingName] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [reservationNumber, setReservationNumber] = useState('');

    const onEditField = (fieldSetter) => (e) => {
        fieldSetter(e.target.value);
        setDetails({
            lodging_name: lodgingName,
            check_in_time: checkInTime,
            check_out_time: checkOutTime,
            address,
            contact_number: contactNumber,
            reservation_number: reservationNumber,
        });
    };

    return (
        <>
            <h2>Lodging Activity</h2>
            <label>
                Lodging Name:
                <input type="text" value={lodgingName} onChange={onEditField(setLodgingName)} />
            </label>
            <label>
                Check-In Time:
                <input type="datetime-local" value={checkInTime} onChange={onEditField(setCheckInTime)} />
            </label>
            <label>
                Check-Out Time:
                <input type="datetime-local" value={checkOutTime} onChange={onEditField(setCheckOutTime)} />
            </label>
            <label>
                Address:
                <input type="text" value={address} onChange={onEditField(setAddress)} />
            </label>
            <label>
                Contact Number:
                <input type="text" value={contactNumber} onChange={onEditField(setContactNumber)} />
            </label>
            <label>
                Reservation Number:
                <input type="text" value={reservationNumber} onChange={onEditField(setReservationNumber)} />
            </label>
        </>
    );
};
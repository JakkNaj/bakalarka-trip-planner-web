import { useState } from 'react';

export const LodgingActivityForm = ({ onClose, onSubmit }) => {
    const [lodgingName, setLodgingName] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [reservationNumber, setReservationNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            type: 'lodging',
            details: {
                lodging_name: lodgingName,
                check_in_time: checkInTime ? new Date(checkInTime) : undefined,
                check_out_time: checkOutTime ? new Date(checkOutTime) : undefined,
                address,
                contact_number: contactNumber,
                reservation_number: reservationNumber,
            },
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Lodging Activity</h2>
            <label>
                Lodging Name:
                <input type="text" value={lodgingName} onChange={(e) => setLodgingName(e.target.value)} required />
            </label>
            <label>
                Check-in Time:
                <input type="datetime-local" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} />
            </label>
            <label>
                Check-out Time:
                <input type="datetime-local" value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} />
            </label>
            <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Contact Number:
                <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </label>
            <label>
                Reservation Number:
                <input type="text" value={reservationNumber} onChange={(e) => setReservationNumber(e.target.value)} />
            </label>
            <button type="submit">Add Activity</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};
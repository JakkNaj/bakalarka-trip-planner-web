import { useState } from 'react';

export const TransportationActivityForm = ({ onClose, onSubmit }) => {
    const [transportType, setTransportType] = useState('');
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [provider, setProvider] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            type: 'transportation',
            details: {
                transport_type: transportType,
                departure_location: departureLocation,
                arrival_location: arrivalLocation,
                departure_time: new Date(departureTime),
                arrival_time: new Date(arrivalTime),
                provider,
            },
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Transportation Activity</h2>
            <label>
                Transport Type:
                <input type="text" value={transportType} onChange={(e) => setTransportType(e.target.value)} required />
            </label>
            <label>
                Departure Location:
                <input type="text" value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)} required />
            </label>
            <label>
                Arrival Location:
                <input type="text" value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)} required />
            </label>
            <label>
                Departure Time:
                <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
            </label>
            <label>
                Arrival Time:
                <input type="datetime-local" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
            </label>
            <label>
                Provider:
                <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} />
            </label>
            <button type="submit">Add Activity</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};
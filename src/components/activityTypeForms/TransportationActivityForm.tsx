import { useState } from 'react';

export const TransportationActivityForm = ({ setDetails }) => {
    const [transportType, setTransportType] = useState('');
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [provider, setProvider] = useState('');

    const onEditField = (fieldSetter) => (e) => {
        fieldSetter(e.target.value);
        setDetails({
            transport_type: transportType,
            departure_location: departureLocation,
            arrival_location: arrivalLocation,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            provider,
        });
    };

    return (
        <>
            <h2>Transportation Activity</h2>
            <label>
                Transport Type:
                <input type="text" value={transportType} onChange={onEditField(setTransportType)} />
            </label>
            <label>
                Departure Location:
                <input type="text" value={departureLocation} onChange={onEditField(setDepartureLocation)} />
            </label>
            <label>
                Arrival Location:
                <input type="text" value={arrivalLocation} onChange={onEditField(setArrivalLocation)} />
            </label>
            <label>
                Departure Time:
                <input type="datetime-local" value={departureTime} onChange={onEditField(setDepartureTime)} />
            </label>
            <label>
                Arrival Time:
                <input type="datetime-local" value={arrivalTime} onChange={onEditField(setArrivalTime)} />
            </label>
            <label>
                Provider:
                <input type="text" value={provider} onChange={onEditField(setProvider)} />
            </label>
        </>
    );
};
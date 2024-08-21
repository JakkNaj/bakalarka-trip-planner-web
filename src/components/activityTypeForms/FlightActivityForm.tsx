import { useState } from 'react';

export const FlightActivityForm = ({ onClose, onSubmit }) => {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [airline, setAirline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            type: 'flight',
            details: {
                flight_number: flightNumber,
                departure_airport: departureAirport,
                arrival_airport: arrivalAirport,
                departure_time: new Date(departureTime),
                arrival_time: new Date(arrivalTime),
                airline,
            },
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Flight Activity</h2>
            <label>
                Flight Number:
                <input type="text" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} required />
            </label>
            <label>
                Departure Airport:
                <input type="text" value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} required />
            </label>
            <label>
                Arrival Airport:
                <input type="text" value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} required />
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
                Airline:
                <input type="text" value={airline} onChange={(e) => setAirline(e.target.value)} />
            </label>
            <button type="submit">Add Activity</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};
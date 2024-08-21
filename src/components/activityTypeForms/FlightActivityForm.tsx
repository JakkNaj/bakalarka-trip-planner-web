import { useState } from 'react';

export const FlightActivityForm = ({ setDetails }) => {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [airline, setAirline] = useState('');

    const onEditField = (fieldSetter) => (e) => {
        fieldSetter(e.target.value);
        setDetails({
            flight_number: flightNumber,
            departure_airport: departureAirport,
            arrival_airport: arrivalAirport,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            airline,
        });
    };

    return (
        <>
            <h2>Flight Activity</h2>
            <label>
                Flight Number:
                <input type="text" value={flightNumber} onChange={onEditField(setFlightNumber)} />
            </label>
            <label>
                Departure Airport:
                <input type="text" value={departureAirport} onChange={onEditField(setDepartureAirport)} />
            </label>
            <label>
                Arrival Airport:
                <input type="text" value={arrivalAirport} onChange={onEditField(setArrivalAirport)} />
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
                Airline:
                <input type="text" value={airline} onChange={onEditField(setAirline)} />
            </label>
        </>
    );
};
import { useState } from 'react';
import { FlightType } from '../../types/activities/ActivitiesTypes';

type FlightActivityProps = {
    setDetails: (details: FlightType) => void;
};

export const FlightActivityForm = ({ setDetails }: FlightActivityProps) => {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [airline, setAirline] = useState('');

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

    return (
        <>
            <h2>Flight Activity</h2>
            <label>
                Flight Number:
                <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => {
                        setFlightNumber(e.target.value);
                        updateDetails();
                    }}
                />
            </label>
            <label>
                Departure Airport:
                <input
                    type="text"
                    value={departureAirport}
                    onChange={(e) => {
                        setDepartureAirport(e.target.value);
                        updateDetails();
                    }}
                />
            </label>
            <label>
                Arrival Airport:
                <input
                    type="text"
                    value={arrivalAirport}
                    onChange={(e) => {
                        setArrivalAirport(e.target.value);
                        updateDetails();
                    }}
                />
            </label>
            <label>
                Departure Time:
                <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => {
                        setDepartureTime(e.target.value);
                        updateDetails();
                    }}
                />
            </label>
            <label>
                Arrival Time:
                <input
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) => {
                        setArrivalTime(e.target.value);
                        updateDetails();
                    }}
                />
            </label>
            <label>
                Airline:
                <input
                    type="text"
                    value={airline}
                    onChange={(e) => {
                        setAirline(e.target.value);
                        updateDetails();
                    }}
                />
            </label>
        </>
    );
};
import { useState } from 'react';
import {insertTrip} from "../utils/trip_api.ts";
import {useStore} from "../stores/globalStore.ts";

export const NewTripForm = ({ onClose }) => {
    const { user, addTrip } = useStore( );
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dateStart, setDateStart] = useState<string>(new Date().toISOString().slice(0, 10));
    const [dateEnd, setDateEnd] = useState<string>(new Date().toISOString().slice(0, 10));
    const [error, setError] = useState<string | null>(null);

    if (!user) {
        return <p>Please log in to create a new trip.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const newTrip = {
                title,
                description,
                date_start: new Date(dateStart),
                date_end: new Date(dateEnd),
                user_id: user.id,
            };

            const insertedTrip = await insertTrip(newTrip);
            console.log('Trip created:', insertedTrip);
            addTrip(insertedTrip);

        } catch (e) {
            console.error('Error creating trip:', e.message);
            setError('Failed to create trip. Please try again later.');
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Trip</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Start Date:
                <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} required />
            </label>
            <label>
                End Date:
                <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} required />
            </label>
            <button type="submit">Create Trip</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

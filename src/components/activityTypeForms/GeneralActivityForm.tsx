import { useState } from 'react';

export const GeneralActivityForm = ({ setDetails }) => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const onEditLocation = (e) => {
        setLocation(e.target.value);
        setDetails({
            description,
            location,
        });
    }

    const onEditDescription = (e) => {
        setDescription(e.target.value);
        setDetails({
            description,
            location,
        });
    }

    return (
        <>
            <h2>General Activity</h2>
            <label>
                Description:
                <input type="text" value={description} onChange={onEditDescription} />
            </label>
            <label>
                Location:
                <input type="text" value={location} onChange={onEditLocation} />
            </label>
        </>
    );
};
import React, { useState } from 'react';
import { GeneralType } from '../../types/activities/ActivitiesTypes';

type GeneralActivityFormProps = {
    setDetails: (details: GeneralType) => void;
};

export const GeneralActivityForm = ({ setDetails } : GeneralActivityFormProps) => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const onEditLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
        setDetails({
            description,
            location: e.target.value,
        });
    }

    const onEditDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
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
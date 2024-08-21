import { useState } from 'react';
import {ActivityTypes} from '../types/activities/BaseActivityTypes.ts';
import {GeneralActivityForm} from "./activityTypeForms/GeneralActivityForm.tsx";

export const NewActivityForm = ({onClose, onSubmit, tripId}) => {
    const [baseActivityDetails, setBaseActivityDetails] = useState({
        trip_id: tripId,
        name: "" as string,
        timestamp_start: new Date().toISOString().slice(0, 10),
        timestamp_end: new Date().toISOString().slice(0, 10),
        activity_details: {},
        type: '' as ActivityTypes,
    });

    const handleActivityTypeChange = (e) => {
        setBaseActivityDetails({
            ...baseActivityDetails,
            type: e.target.value,
        })
    };

    const handleDetailChange = (e) => {
        setBaseActivityDetails({
            ...baseActivityDetails,
            [e.target.name]: e.target.value,
        });
    };

    const setTypeDetails = (details) => {
        setBaseActivityDetails({
            ...baseActivityDetails,
            activity_details: details,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(baseActivityDetails);
    };

    const renderActivityTypeForm = () => {
        switch (baseActivityDetails.type) {
            case ActivityTypes.FLIGHT:
                return(
                    <>
                        <h1>Flight form</h1>
                    </>
                );
            case ActivityTypes.TRANSPORTATION:
                return(
                    <>
                        <h1>Transportation form</h1>
                    </>
                );
            case ActivityTypes.LODGING:
                return(
                    <>
                        <h1>Lodging form</h1>
                    </>
                );
            case ActivityTypes.REMINDER:
                return(
                    <>
                        <h1>Reminder form</h1>
                    </>
                );
            default:
                return (
                    <GeneralActivityForm  setDetails={setTypeDetails}/>
                )
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={baseActivityDetails.name} onChange={handleDetailChange} required/>
            </label>
            <label>
                Start Time:
                <input type="date" name="timestamp_start" value={baseActivityDetails.timestamp_start}
                       onChange={handleDetailChange} required/>
            </label>
            <label>
                End Time:
                <input type="date" name="timestamp_end" value={baseActivityDetails.timestamp_end}
                       onChange={handleDetailChange} required/>
            </label>
            <label>
                Activity Type:
                <select value={baseActivityDetails.type} onChange={handleActivityTypeChange} required>
                    <option value="" disabled>Select an activity</option>
                    {Object.values(ActivityTypes).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </label>
            {baseActivityDetails.type && renderActivityTypeForm()}
            <button type="submit">Add Activity</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};
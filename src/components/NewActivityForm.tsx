import {useState} from 'react';
import {ActivityTypes} from '../types/activities/BaseActivityTypes.ts';
import {GeneralActivityForm} from "./activityTypeForms/GeneralActivityForm.tsx";
import {FlightActivityForm} from "./activityTypeForms/FlightActivityForm.tsx";
import {ReminderActivityForm} from "./activityTypeForms/ReminderActivityForm.tsx";
import {LodgingActivityForm} from "./activityTypeForms/LodgingActivityForm.tsx";
import {TransportationActivityForm} from "./activityTypeForms/TransportationActivityForm.tsx";

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
                return <FlightActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.TRANSPORTATION:
                return <TransportationActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.LODGING:
                return <LodgingActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.REMINDER:
                return <ReminderActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.GENERAL:
                return <GeneralActivityForm setDetails={setTypeDetails} />;
            default:
                console.error('Invalid activity type');
                return null;
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
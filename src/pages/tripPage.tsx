import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../components/Activity.tsx';
import { useStore } from '../stores/globalStore.ts';
import { NewActivityForm } from '../components/NewActivityForm.tsx';
import { insertActivity } from "../utils/activity_api.ts";
import {ActivityType} from "../types/activities/ActivitiesTypes.ts";

export const TripPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const trip = useStore().getTripById(Number(id));
    const { insertActivityInsideTrip } = useStore();
    const [showNewActivityForm, setShowNewActivityForm] = useState(false);

    if (!trip) {
        return <div>No trip with this ID present...</div>;
    }

    const navigateToEditActivity = (activityId) => {
        navigate(`/trip/${id}/activity/${activityId}`);
    };

    const handleAddActivity = async (newActivity) => {
        // todo add loading state
        //insert into db
        const insertedActivity= await insertActivity(newActivity);
        //update store
        insertActivityInsideTrip(insertedActivity as ActivityType, trip.id);
    };

    const ShowActivities = () => {
        if (!trip.trip_activities || trip.trip_activities.length === 0) {
            return <p>No activities planned yet.</p>;
        }
        return trip.trip_activities.map((activity) => (
            <Activity key={activity.activity_id} activity={activity} navigateToEditActivity={navigateToEditActivity} />
        ));
    };

    return (
        <div>
            <h1>Trip Page</h1>
            <button
                style={{ backgroundColor: 'lightgoldenrodyellow', marginBottom: '20px' }}
                onClick={() => setShowNewActivityForm(true)}
            >
                Plan New Activity
            </button>
            {showNewActivityForm && (
                <NewActivityForm
                    tripId={trip.id}
                    onClose={() => setShowNewActivityForm(false)}
                    onSubmit={handleAddActivity}
                />
            )}
            <ShowActivities />
        </div>
    );
};
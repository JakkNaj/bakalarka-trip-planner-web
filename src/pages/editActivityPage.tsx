import {useLoaderData} from "react-router-dom";
import { ActivityType } from "../types/activities/ActivitiesTypes";
import { useEffect } from "react";
import { useStore } from "../stores/globalStore";

export const EditActivityPage = () => {
    const activity = useLoaderData() as ActivityType;
    const { insertActivityInsideTrip } = useStore();

    useEffect(() => {
        // insert activity (from loader) in store
        insertActivityInsideTrip(activity, activity.trip_id);
    }, [activity, insertActivityInsideTrip]);

    return (
        <div>
            <h1>Edit Activity Page</h1>
            <h3>name: {activity.name}</h3>
        </div>
    )
}
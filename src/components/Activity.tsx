import {ActivityType} from "../types/activities/ActivitiesTypes.ts";

type ActivityProps = {
    activity: ActivityType;
    navigateToEditActivity: (number) => void;
};

export const Activity = ( props : ActivityProps ) => {
    const activity = props.activity;
    return (
        <div>
            <h2>Activity</h2>
            <p>name: {activity.name}</p>
            <p>timestamp_start: {activity.timestamp_start}</p>
            <p>timestamp_end: {activity.timestamp_end}</p>
            <button onClick={() => props.navigateToEditActivity(activity.activity_id)}>edit</button>
        </div>
    )
}
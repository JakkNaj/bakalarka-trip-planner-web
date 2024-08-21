import {ActivityType} from "../types/activities/ActivitiesTypes.ts";

type ActivityProps = {
    activity: ActivityType;
    navigateToEditActivity: (number) => void;
};

export const Activity = ( props : ActivityProps ) => {
    const activity = props.activity;
    return (
        <div style={{padding: "20px", marginBottom: "20px"}}>
            <h3>name: {activity.name}</h3>
            <h4>type: {activity.type}</h4>
            <p>timestamp_start: {activity.timestamp_start}</p>
            <p>timestamp_end: {activity.timestamp_end}</p>
            <button onClick={() => props.navigateToEditActivity(activity.activity_id)}>edit</button>
        </div>
    )
}
import {Activity} from "../types/activities/ActivitiesTypes.ts";

type ActivityProps = {
    activity: Activity;
    navigateToEdit: (number) => void;
}

export const ActivityComponent = ( props : ActivityProps) => {
    const {activity} = props.activity;

    return (
        <div>
            <h1>Activity</h1>
            <h3>id: {activity.id}</h3>
            <h3>title: {activity.title}</h3>
            <h3>description: {activity.description}</h3>
            <h3>date_start: {activity.date_start}</h3>
            <h3>date_end: {activity.date_end}</h3>
            <button onClick={() => props.navigateToEdit(activity.id)}>edit</button>
        </div>
    )
}
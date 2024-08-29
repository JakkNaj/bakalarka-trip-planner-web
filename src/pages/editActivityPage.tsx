import {useParams} from "react-router-dom";

export const EditActivityPage = () => {
    const { activityId }= useParams();

    return (
        <div>
            <h1>Edit Activity Page</h1>
            <h3>activityId: {activityId}</h3>
        </div>
    )
}
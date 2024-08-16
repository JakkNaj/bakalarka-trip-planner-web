import {useNavigate, useParams} from "react-router-dom";
import {ActivityComponent} from "../components/Activity.tsx";

export const TripPage = ( ) => {

    // TODO GET TRIP WITH GIVEN ID FROM LOCAL ZUSTAND STORE

    const { id } : number = useParams();
    const navigate = useNavigate();

    const navigateToEditActivity = (activityId: number) => {
        navigate(`/trip/${id}/activity/${activityId}`);
    }

    return (
        <div>
            <h1>Trip Page</h1>
            <h3>id: {id}</h3>
            {trip.trip_activities.map((activity) => (
                <ActivityComponent key={activity.id} activity={activity} navigate={navigateToEditActivity} />
            ))}
        </div>
    )
}
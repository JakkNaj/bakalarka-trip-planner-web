import {useNavigate, useParams} from "react-router-dom";
import {Activity} from "../components/Activity.tsx";
import {TripType} from "../types/trip/TripType.ts";
import {useStore} from "../store/globalStore.ts";

export const TripPage = ( ) => {
    const { id } : number = useParams();
    const navigate = useNavigate();
    const trips = useStore((state) => state.trips);
    const trip: TripType | undefined = trips.find((trip) => trip.id === Number(id));

    console.log(trips);
    console.log(trip);
    console.log(trip?.trip_activities);

    if (!trip) {
        return <div>error displaying trip...</div>
    }

    const navigateToEditActivity = (activityId: number) => {
        navigate(`/trip/${id}/activity/${activityId}`);
    }

    const ShowActivities = () => {
        return trip.trip_activities.map((activity) => (
            <Activity key={activity.activity_id} activity={activity} navigateToEditActivity={navigateToEditActivity} />
        ));
    }

    return (
        <div>
            <h1>Trip Page</h1>
            <h3>id: {id}</h3>
            <code>{JSON.stringify(trip.trip_activities)}</code>
            <ShowActivities />
        </div>
    )
}
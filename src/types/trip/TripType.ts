import {ActivityType} from "../activities/ActivitiesTypes.ts";

export type TripType = {
    id: number;
    created_at: Date;
    title: string;
    description?: string;
    date_start: Date;
    date_end: Date;
    trip_activities: ActivityType[];
};

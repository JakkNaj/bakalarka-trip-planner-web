import { TripType } from "./TripType.ts";

export type TripInsertType = Omit<TripType, 'id' | 'created_at' | 'trip_activities'> & {
    user_id: string; // user_id is required for inserting a new trip
};

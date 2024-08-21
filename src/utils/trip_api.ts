import supabase from "../config/supabaseClient.ts";
import { TripType } from "../types/trip/TripType.ts";
import {TripInsertType} from "../types/trip/TripInsertType.ts";

export const fetchTrips = async (): Promise<TripType[] | null> => {
    try {
        const { data, error } = await supabase
            .from('trips')
            .select(`
                id,
                title,
                description,
                date_start,
                date_end,
                trip_activities ( * )
            `);

        if (error) {
            console.error('Error fetching trips:', error.message);
            throw error;
        }
        return data as TripType[];
    } catch (error) {
        console.error('Unexpected error during trip fetching:', error);
        return null;
    }
};

export const insertTrip = async (trip: TripInsertType) => {
    const { data, error } = await supabase
        .from('trips')
        .insert([trip])
        .select('*')
        .single();

    if (error || !data) {
        throw new Error(error?.message);
    }
    return data;
};
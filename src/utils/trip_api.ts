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
                location,
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

export const fetchTripImageUrl = async (tripId: number, userId: string | undefined): Promise<string | null> => {
    if (!userId) {
        return null;
    }
    try {
        const filePath = `${userId}/${tripId}/trip-image.jpg`;

        const { data: files, error: listError } = await supabase
            .storage
            .from('trip_images')
            .list(`${userId}/${tripId}`, {
                search: 'trip-image.jpg'
            });

        console.log("Files", files);
        if (listError) {
            console.error("Error listing files", listError.message);
            return null;
        }

        if (!files || files.length === 0) {
            return null;
        }

        const { data, error } = await supabase
            .storage
            .from('trip_images')
            .createSignedUrl(filePath, 3600);

        if (error) {
            console.error("Error fetching public URL", error.message);
            return null;
        }

        return data?.signedUrl || null;

    } catch (error) {
        console.error("Unexpected error fetching image URL", error);
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
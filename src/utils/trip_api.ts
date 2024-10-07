import supabase from "../config/supabaseClient.ts";
import { TripType, TripTypeSchema } from "../types/trip/TripType.ts";
import { TripEditType, TripInsertType } from "../types/trip/TripInsertType.ts";
import { fromZodError } from "zod-validation-error";
import { getState } from "../stores/globalStore.ts";

export const fetchTrips = async (): Promise<TripType[]> => {
    try {
        const { data, error } = await supabase
            .from('trips')
            .select(`
                id,
                created_at,
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

        const parsedData = TripTypeSchema.array().safeParse(data);
        if (!parsedData.success) {
            console.log('Error parsing data:', fromZodError(parsedData.error));
            throw new Error('Error parsing data');
        } 
        
        const trips = parsedData.data;
        const userId = getState().user?.id;
        const updatedTrips = await Promise.all(trips.map(async(trip) => {
            
            if (!userId) {
                return trip;
            }
            const imageUrl = await fetchTripImageUrl(trip.id, userId);
            return {
                ...trip,
                imageUrl
            };
        }))

        return updatedTrips;

    } catch (error) {
        console.error('Unexpected error during trip fetching:', error);
        throw error;
    }
};

export const fetchTrip = async (id: number): Promise<TripType | null> => {
    try {
        const {data, error} = await supabase
        .from('trips')
        .select(`
            id,
            created_at,
            title,
            description,
            date_start,
            date_end,
            location,
            trip_activities ( * )
        `)
        .eq('id', id)
        .single();
    
        if (error) {
            console.error('Error fetching trip:', error.message);
            throw error;
        }

        const parsedData = TripTypeSchema.safeParse(data);
        if (!parsedData.success) {
            console.error('Error parsing trip data:', fromZodError(parsedData.error));
            throw new Error('Error parsing trip data');
        }

        const trip = parsedData.data;
        const userId = getState().user?.id;
        const tripImage = await fetchTripImageUrl(trip.id, userId);
        if (tripImage) {
            return {
                ...trip,
                imageUrl: tripImage
            };
        }
        return trip;
    } catch (error) {
        console.error('Unexpected error during trip fetching:', error);
        throw error;
    }
    
};

const fetchTripImageUrl = async (tripId: number, userId: string | undefined): Promise<string | undefined> => {
    if (!userId) {
        return undefined;
    }
    try {
        const filePath = `${userId}/${tripId}/trip-image.jpg`;

        const { data: files, error: listError } = await supabase
            .storage
            .from('trip_images')
            .list(`${userId}/${tripId}`, {
                search: 'trip-image.jpg'
            });

        if (listError) {
            console.error("Error listing files", listError.message);
            return undefined;
        }

        if (!files || files.length === 0) {
            return undefined;
        }

        const { data, error } = await supabase
            .storage
            .from('trip_images')
            .createSignedUrl(filePath, 3600);

        if (error) {
            console.error("Error fetching public URL", error.message);
            throw error;
        }

        return data?.signedUrl || undefined;

    } catch (error) {
        console.error("Unexpected error fetching image URL", error);
        throw error;
    }
};

export const uploadTripImage = async (tripId: number, userId: string | undefined, file: File) => {
    const filePath = `${userId}/${tripId}/trip-image.jpg`;

    // list existing images in the trip folder
    const { data: existingImages, error: listError } = await supabase
        .storage
        .from('trip_images')
        .list(`${userId}/${tripId}`);

    if (listError) {
        throw new Error(`Error listing images: ${listError.message}`);
    }

    // delete existing images
    if (existingImages) {
        for (const image of existingImages) {
            const { error: deleteError } = await supabase
                .storage
                .from('trip_images')
                .remove([`${userId}/${tripId}/${image.name}`]);

            if (deleteError) {
                console.error(`Error deleting image: ${deleteError.message}`);
                throw new Error(`Error deleting image: ${deleteError.message}`);
            }
        }
    }

    // upload new image
    const { error: uploadError } = await supabase
        .storage
        .from('trip_images')
        .upload(filePath, file);

    if (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const url = await fetchTripImageUrl(tripId, userId);
    if (url) {
        return url;
    }
    
    return null;
}

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

export const updateTrip = async (trip: TripEditType) => {
    const { data, error } = await supabase
        .from('trips')
        .update(trip)
        .eq('id', trip.id)
        .select('*')
        .single();

    if (error || !data) {
        throw new Error(error?.message);
    }
    return data;
};

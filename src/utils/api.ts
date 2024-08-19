import supabase from '../config/supabaseClient.ts';
import { UserMetadataResponseType } from '../types/user/UserMetadaResponse.ts';
import {TripType} from "../types/trip/TripType.ts";

export const fetchUserData = async (): Promise<UserMetadataResponseType | null> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
    return data?.user?.user_metadata as UserMetadataResponseType;
};

export const signInWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if (error) {
        console.error('Error signing in with Google:', error.message);
        throw error;
    }
};

export const signOutUser = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
        throw error;
    }
};

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
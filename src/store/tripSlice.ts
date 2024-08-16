import { TripType } from "../types/trip/TripType.ts";
import supabase from "../config/supabaseClient.ts";
import {PostgrestError} from "@supabase/supabase-js";

export const createTripSlice = (set) => ({
    trips: [],
    tripsNetworkError: null as PostgrestError | null,
    setTrips: (trips: TripType[]) => set({ trips }),
    setTripFetchError: (error: PostgrestError | null) => set({ tripFetchError: error }),
    fetchTrips: async () => {
        const { data, error } = await supabase
            .from('trips')
            .select(`
                id,
                title,
                description,
                date_start,
                date_end
            `);
        if (error) {
            console.error('Error fetching trips:', error);
            set({ tripFetchError: error });
            return;
        }
        set({ trips: data, tripFetchError: null });
    },
    addTrip: (trip: TripType) => set((state) => ({ trips: [...state.trips, trip] })),
    updateTrip: (updatedTrip: TripType) => set((state) => ({
        trips: state.trips.map((trip) => trip.id === updatedTrip.id ? updatedTrip : trip)
    })),
    deleteTrip: (tripId: number) => set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== tripId)
    }))
});
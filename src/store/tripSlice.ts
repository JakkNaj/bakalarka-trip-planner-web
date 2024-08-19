import { TripType } from "../types/trip/TripType.ts";
import {fetchTrips} from "../utils/api.ts";

export const createTripSlice = (set, get) => ({
    trips: [] as TripType[],
    setTrips: (trips: TripType[]) => set({ trips }),

    fetchTrips: async () => {
        const trips = await fetchTrips();
        if (trips) {
            set({ trips });
        }
    },

    addTrip: (trip: TripType) => set((state) => ({ trips: [...state.trips, trip] })),

    updateTrip: (updatedTrip: TripType) => set((state) => ({
        trips: state.trips.map((trip) => trip.id === updatedTrip.id ? updatedTrip : trip)
    })),

    deleteTrip: (tripId: number) => set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== tripId)
    })),

    getTripById: (tripId: number) => {
        return get().trips.find((trip) => trip.id === tripId);
    },

    reset: () => {
        set({ trips: [] });
    },
});

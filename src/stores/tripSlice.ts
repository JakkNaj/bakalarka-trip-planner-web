import { TripType } from "../types/trip/TripType.ts";
import {fetchTrips} from "../utils/trip_api.ts";
import {ActivityType} from "../types/activities/ActivitiesTypes.ts";

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

    insertActivityInsideTrip: (activity: ActivityType, tripId: number) => {
        set((state) => {
            const trip = state.trips.find((trip) => trip.id === tripId);
            if (trip) {
                trip.trip_activities = [...trip.trip_activities, activity];
            }
            return { trips: [...state.trips] };
        });
    },
});

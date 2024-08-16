import {ActivityType} from "./BaseActivityTypes.ts";

export type Activity =
    | FlightActivity
    | TransportationActivity
    | LodgingActivity
    | ReminderActivity
    | GeneralActivity;


type BaseActivityType = {
    id: number;
    trip_id: number;
    name: string;
    timestamp_start: Date;
    timestamp_end: Date;
    type: ActivityType;
};

type FlightActivity = BaseActivityType & {
    type: ActivityType.FLIGHT;
    details: {
        flight_number: string;
        departure_airport: string;
        arrival_airport: string;
        departure_time: Date;
        arrival_time: Date;
        airline?: string;
    };
};

type TransportationActivity = BaseActivityType & {
    type: ActivityType.TRANSPORTATION;
    details: {
        transport_type: string;
        departure_location: string;
        arrival_location: string;
        departure_time: Date;
        arrival_time: Date;
        provider?: string;
    };
};

type LodgingActivity = BaseActivityType & {
    type: ActivityType.LODGING;
    details: {
        lodging_name: string;
        check_in_time?: Date;
        check_out_time?: Date;
        address?: string;
        contact_number?: string;
        reservation_number?: string;
    };
};

type ReminderActivity = BaseActivityType & {
    type: ActivityType.REMINDER;
    details: {
        reminder_time: Date;
        note: string;
    };
};

type GeneralActivity = BaseActivityType & {
    type: ActivityType.GENERAL;
    details: {
        description?: string;
        location?: string;
    };
};

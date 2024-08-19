import {ActivityTypes} from "./BaseActivityTypes.ts";

export type ActivityType =
    | FlightActivity
    | TransportationActivity
    | LodgingActivity
    | ReminderActivity
    | GeneralActivity;


type BaseActivityType = {
    activity_id: number;
    trip_id: number;
    name: string;
    timestamp_start: Date;
    timestamp_end: Date;
    type: ActivityTypes;
};

type FlightActivity = BaseActivityType & {
    type: ActivityTypes.FLIGHT;
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
    type: ActivityTypes.TRANSPORTATION;
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
    type: ActivityTypes.LODGING;
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
    type: ActivityTypes.REMINDER;
    details: {
        reminder_time: Date;
        note: string;
    };
};

type GeneralActivity = BaseActivityType & {
    type: ActivityTypes.GENERAL;
    details: {
        description?: string;
        location?: string;
    };
};

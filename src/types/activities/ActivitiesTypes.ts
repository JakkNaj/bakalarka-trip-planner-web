import {ActivityTypes} from "./BaseActivityTypes.ts";

export type ActivityType =
    | FlightActivity
    | TransportationActivity
    | LodgingActivity
    | ReminderActivity
    | GeneralActivity;

export type ActivityDetailsType =
    | FlightType
    | TransportType
    | LodgingType
    | ReminderType
    | GeneralType;

export type InsertBaseActivityType = Omit<BaseActivityType, "activity_id">;
export type InsertActivityType = Omit<ActivityType, "activity_id">;

export type BaseActivityType = {
    activity_id: number;
    trip_id: number;
    name: string;
    timestamp_start: Date;
    timestamp_end: Date;
    type: ActivityTypes;
};

export type FlightActivity = BaseActivityType & {
    type: ActivityTypes.FLIGHT;
    details: FlightType;
};

export type FlightType = {
        flight_number: string;
        departure_airport: string;
        arrival_airport: string;
        departure_time: Date;
        arrival_time: Date;
        airline?: string;
};

export type TransportationActivity = BaseActivityType & {
    type: ActivityTypes.TRANSPORTATION;
    details: TransportType;
};

export type TransportType = {
    transport_type: string;
    departure_location: string;
    arrival_location: string;
    departure_time: Date;
    arrival_time: Date;
    provider?: string;
};

export type LodgingActivity = BaseActivityType & {
    type: ActivityTypes.LODGING;
    details: LodgingType;
};

export type LodgingType = {
    lodging_name: string;
    check_in_time?: Date;
    check_out_time?: Date;
    address?: string;
    contact_number?: string;
    reservation_number?: string;
};

export type ReminderActivity = BaseActivityType & {
    type: ActivityTypes.REMINDER;
    details: ReminderType;
};

export type ReminderType = {
    reminder_time: Date;
    note: string;
};

export type GeneralActivity = BaseActivityType & {
    type: ActivityTypes.GENERAL;
    details: GeneralType;
};

export type GeneralType = {
    description?: string;
    location?: string;
};

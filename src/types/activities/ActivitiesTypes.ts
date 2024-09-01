import { z } from 'zod';
import { FlightActivity, FlightActivitySchema, FlightType, InsertFlightType } from './flight/FlightActivity';
import { InsertTransportType, TransportationActivity, TransportationActivitySchema, TransportType } from './transport/TransportActivity';
import { InsertLodgingType, LodgingActivity, LodgingActivitySchema, LodgingType } from './lodging/LodgingActivity';
import { InsertReminderType, ReminderActivity, ReminderActivitySchema, ReminderType } from './reminder/ReminderActivity';
import { GeneralActivity, GeneralActivitySchema, GeneralType, InsertGeneralType } from './general/GeneralActivity';

export const ActivityTypeSchema = z.discriminatedUnion("type",[
    FlightActivitySchema,
    TransportationActivitySchema,
    LodgingActivitySchema,
    ReminderActivitySchema,
    GeneralActivitySchema,
]);

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


// --------------- Insert Types ---------------
export const InsertActivityTypeSchema = z.union([
    FlightActivitySchema.omit({ activity_id: true }),
    TransportationActivitySchema.omit({ activity_id: true }),
    LodgingActivitySchema.omit({ activity_id: true }),
    ReminderActivitySchema.omit({ activity_id: true }),
    GeneralActivitySchema.omit({ activity_id: true }),
]);

export type InsertActivityType = Omit<ActivityType, 'activity_id'>;

export type InsertActivityDetailsType =
    | InsertFlightType
    | InsertTransportType
    | InsertLodgingType
    | InsertReminderType
    | InsertGeneralType;
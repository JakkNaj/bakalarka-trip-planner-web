import { z } from 'zod';
import { FlightActivity, FlightActivitySchema, FlightType, FormFlightTypeSchema, InsertFlightType } from './flight/FlightActivity';
import { FormTransportTypeSchema, InsertTransportType, TransportationActivity, TransportationActivitySchema, TransportType } from './transport/TransportActivity';
import { FormLodgingTypeSchema, InsertLodgingType, LodgingActivity, LodgingActivitySchema, LodgingType } from './lodging/LodgingActivity';
import { FormReminderTypeSchema, InsertReminderType, ReminderActivity, ReminderActivitySchema, ReminderType } from './reminder/ReminderActivity';
import { FormGeneralTypeSchema, GeneralActivity, GeneralActivitySchema, GeneralType, InsertGeneralType } from './general/GeneralActivity';

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
export type InsertActivityDetailsType =
    | InsertFlightType
    | InsertTransportType
    | InsertLodgingType
    | InsertReminderType
    | InsertGeneralType;

// --------------- Form validation Types ---------------
export const FormActivityDetailsTypeSchema = z.union([
    FormGeneralTypeSchema,
    FormFlightTypeSchema,
    FormTransportTypeSchema,
    FormLodgingTypeSchema,
    FormReminderTypeSchema,
]);

export type FormActivityDetailsType = z.infer<typeof FormActivityDetailsTypeSchema>;
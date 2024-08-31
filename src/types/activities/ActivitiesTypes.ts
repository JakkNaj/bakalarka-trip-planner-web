import { z } from 'zod';
import { ActivityTypes } from './BaseActivityTypes';

const FlightTypeSchema = z.object({
    flight_number: z.string(),
    departure_airport: z.string(),
    arrival_airport: z.string(),
    departure_time: z.string().transform((str) => new Date(str)),
    arrival_time: z.string().transform((str) => new Date(str)),
    airline: z.string().optional(),
});

const TransportTypeSchema = z.object({
    transport_type: z.string(),
    departure_location: z.string(),
    arrival_location: z.string(),
    departure_time: z.string().transform((str) => new Date(str)),
    arrival_time: z.string().transform((str) => new Date(str)),
    provider: z.string().optional(),
});

const LodgingTypeSchema = z.object({
    lodging_name: z.string(),
    check_in_time: z.string().transform((str) => new Date(str)),
    check_out_time: z.string().transform((str) => new Date(str)),
    address: z.string().optional(),
    contact_number: z.string().optional(),
    reservation_number: z.string().optional(),
});

const ReminderTypeSchema = z.object({
    reminder_time:z.string().transform((str) => new Date(str)),
    note: z.string(),
});

const GeneralTypeSchema = z.object({
    description: z.string().optional(),
    location: z.string().nullable(),
});

const BaseActivityTypeSchema = z.object({
    activity_id: z.number(),
    trip_id: z.number(),
    name: z.string(),
    timestamp_start: z.string().transform((str) => new Date(str)),
    timestamp_end: z.string().transform((str) => new Date(str)),
    type: z.nativeEnum(ActivityTypes),
});

const FlightActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.FLIGHT),
    details: FlightTypeSchema,
});

const TransportationActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.TRANSPORTATION),
    details: TransportTypeSchema,
});

const LodgingActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.LODGING),
    details: LodgingTypeSchema,
});

const ReminderActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.REMINDER),
    details: ReminderTypeSchema,
});

const GeneralActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.GENERAL),
    details: GeneralTypeSchema,
});

export const ActivityTypeSchema = z.discriminatedUnion("type",[
    FlightActivitySchema,
    TransportationActivitySchema,
    LodgingActivitySchema,
    ReminderActivitySchema,
    GeneralActivitySchema,
]);

export const InsertBaseActivityTypeSchema = BaseActivityTypeSchema.omit({
    activity_id: true,
});

export const InsertActivityTypeSchema = z.union([
    FlightActivitySchema.omit({ activity_id: true }),
    TransportationActivitySchema.omit({ activity_id: true }),
    LodgingActivitySchema.omit({ activity_id: true }),
    ReminderActivitySchema.omit({ activity_id: true }),
    GeneralActivitySchema.omit({ activity_id: true }),
]);

// ------------------ INFERRED TYPES FROM SCHEMAS ------------------

export type FlightType = z.infer<typeof FlightTypeSchema>;
export type TransportType = z.infer<typeof TransportTypeSchema>;
export type LodgingType = z.infer<typeof LodgingTypeSchema>;
export type ReminderType = z.infer<typeof ReminderTypeSchema>;
export type GeneralType = z.infer<typeof GeneralTypeSchema>;

export type BaseActivityType = z.infer<typeof BaseActivityTypeSchema>;
export type FlightActivity = z.infer<typeof FlightActivitySchema>;
export type TransportationActivity = z.infer<typeof TransportationActivitySchema>;
export type LodgingActivity = z.infer<typeof LodgingActivitySchema>;
export type ReminderActivity = z.infer<typeof ReminderActivitySchema>;
export type GeneralActivity = z.infer<typeof GeneralActivitySchema>;

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

export type InsertBaseActivityType = Omit<BaseActivityType, 'activity_id'>;
export type InsertActivityType = Omit<ActivityType, 'activity_id'>;
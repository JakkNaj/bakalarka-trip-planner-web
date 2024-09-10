import { z } from 'zod';
import { ActivityTypes, BaseActivityTypeSchema } from '../BaseActivityTypes';

const FlightTypeSchema = z.object({
    id: z.number(),
    activity_id: z.number(),
    flight_number: z.string(),
    departure_airport: z.string(),
    arrival_airport: z.string(),
    departure_time: z.string().transform((str) => new Date(str)),
    arrival_time: z.string().transform((str) => new Date(str)),
    airline: z.string().optional(),
});

export type FlightType = z.infer<typeof FlightTypeSchema>;


export const FlightActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.FLIGHT),
    details: FlightTypeSchema,
});

export type FlightActivity = z.infer<typeof FlightActivitySchema>;

// --------------- Insert Types ---------------
export type InsertFlightType = Omit<FlightType, 'id'>;

// --------------- Form Types ---------------
export const FormFlightTypeSchema = FlightTypeSchema.omit({ id: true, activity_id: true });
export type FormFlightType = Omit<FlightType, 'id' | 'activity_id'>;
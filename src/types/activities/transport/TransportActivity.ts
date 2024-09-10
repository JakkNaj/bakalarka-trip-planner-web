import { z } from 'zod';
import { ActivityTypes, BaseActivityTypeSchema } from '../BaseActivityTypes';

const TransportTypeSchema = z.object({
    id: z.number(),
    activity_id: z.number(),
    transport_type: z.string(),
    departure_location: z.string(),
    arrival_location: z.string(),
    departure_time: z.string().transform((str) => new Date(str)),
    arrival_time: z.string().transform((str) => new Date(str)),
    provider: z.string().optional(),
});

export type TransportType = z.infer<typeof TransportTypeSchema>;


export const TransportationActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.TRANSPORTATION),
    details: TransportTypeSchema,
});

export type TransportationActivity = z.infer<typeof TransportationActivitySchema>;

// --------------- Insert Types ---------------
export type InsertTransportType = Omit<TransportType, 'id'>;

// --------------- Form Types ---------------
export const FormTransportTypeSchema = TransportTypeSchema.omit({ id: true, activity_id: true });
export type FormTransportType = Omit<TransportType, 'id' | 'activity_id'>;
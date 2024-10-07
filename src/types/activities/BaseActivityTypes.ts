import { z } from 'zod';

export enum ActivityTypes {
    FLIGHT = 'flight',
    TRANSPORTATION = 'transportation',
    LODGING = 'lodging',
    REMINDER = 'reminder',
    GENERAL = 'general',
}

const ActivityTypesEnum = z.nativeEnum(ActivityTypes);
export type ActivityTypesEnum = z.infer<typeof ActivityTypesEnum>;

export const BaseActivityTypeSchema = z.object({
    activity_id: z.number(),
    trip_id: z.number(),
    name: z.string(),
    timestamp_start: z.string().transform((str) => new Date(str)),
    timestamp_end: z.string().transform((str) => new Date(str)),
    type: z.nativeEnum(ActivityTypes),
});

export type BaseActivityType = z.infer<typeof BaseActivityTypeSchema>;

// --------------- Insert Types ---------------
export const InsertBaseActivityTypeSchema = BaseActivityTypeSchema.omit({
    activity_id: true,
});
export type InsertBaseActivityType = Omit<BaseActivityType, 'activity_id'>;


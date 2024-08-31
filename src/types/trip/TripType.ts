import { z } from 'zod';
import { ActivityTypeSchema } from '../activities/ActivitiesTypes';

export const TripTypeSchema = z.object({
    id: z.number(),
    created_at: z.string().transform((str) => new Date(str)),
    title: z.string(),
    description: z.string().optional(),
    date_start: z.string().transform((str) => new Date(str)),
    date_end: z.string().transform((str) => new Date(str)),
    location: z.string().nullable(),
    imageUrl: z.string().optional(),
    trip_activities: z.array(ActivityTypeSchema).optional(),
});

export const TripsSchema = z.array(TripTypeSchema);

export type TripType = z.infer<typeof TripTypeSchema>;
import { z } from 'zod';
import { TripTypeSchema } from './TripType';

export const TripInsertTypeSchema = TripTypeSchema.omit({
    id: true,
    created_at: true,
    trip_activities: true,
}).extend({
    user_id: z.string(),
});

export type TripInsertType = z.infer<typeof TripInsertTypeSchema>;
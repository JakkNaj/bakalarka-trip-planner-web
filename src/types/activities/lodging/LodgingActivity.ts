import { z } from 'zod';
import { ActivityTypes, BaseActivityTypeSchema } from '../BaseActivityTypes';

const LodgingTypeSchema = z.object({
    id: z.number(),
    activity_id: z.number(),
    lodging_name: z.string(),
    check_in_time: z.string().transform((str) => new Date(str)),
    check_out_time: z.string().transform((str) => new Date(str)),
    address: z.string().optional(),
    contact_number: z.string().optional(),
    reservation_number: z.string().optional(),
});

export type LodgingType = z.infer<typeof LodgingTypeSchema>;


export const LodgingActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.LODGING),
    details: LodgingTypeSchema,
});

export type LodgingActivity = z.infer<typeof LodgingActivitySchema>;

// --------------- Insert Types ---------------
export type InsertLodgingType = Omit<LodgingType, 'id'>;

// --------------- Form Types ---------------
export const FormLodgingTypeSchema = LodgingTypeSchema.omit({ id: true, activity_id: true });
export type FormLodgingType = Omit<LodgingType, 'id' | 'activity_id'>;
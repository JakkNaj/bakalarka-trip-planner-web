import { z } from 'zod';
import { ActivityTypes, BaseActivityTypeSchema } from '../BaseActivityTypes';

const GeneralTypeSchema = z.object({
    id: z.number(),
    activity_id: z.number(),
    description: z.string().optional(),
    location: z.string().nullable(),
});

export type GeneralType = z.infer<typeof GeneralTypeSchema>;


export const GeneralActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.GENERAL),
    details: GeneralTypeSchema,
});

export type GeneralActivity = z.infer<typeof GeneralActivitySchema>;

// --------------- Insert Types ---------------
export type InsertGeneralType = Omit<GeneralType, 'id'>;

// --------------- Form Types ---------------
export const FormGeneralTypeSchema = GeneralTypeSchema.omit({ id: true, activity_id: true });
export type FormGeneralType = Omit<GeneralType, 'id' | 'activity_id'>;

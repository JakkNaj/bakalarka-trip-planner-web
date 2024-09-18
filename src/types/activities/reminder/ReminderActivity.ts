import { z } from 'zod';
import { ActivityTypes, BaseActivityTypeSchema } from '../BaseActivityTypes';

export const ReminderTypeSchema = z.object({
    id: z.number(),
    activity_id: z.number(),
    reminder_time:z.string().transform((str) => new Date(str)),
    note: z.string(),
});

export type ReminderType = z.infer<typeof ReminderTypeSchema>;


export const ReminderActivitySchema = BaseActivityTypeSchema.extend({
    type: z.literal(ActivityTypes.REMINDER),
    details: ReminderTypeSchema,
});

export type ReminderActivity = z.infer<typeof ReminderActivitySchema>;

// --------------- Insert Types ---------------
export type InsertReminderType = Omit<ReminderType, 'id'>;

// --------------- Form Types ---------------
export const FormReminderTypeSchema = ReminderTypeSchema.omit({ id: true, activity_id: true });
export type FormReminderType = Omit<ReminderType, 'id' | 'activity_id'>;
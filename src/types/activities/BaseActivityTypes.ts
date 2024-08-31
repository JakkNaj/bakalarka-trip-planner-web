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


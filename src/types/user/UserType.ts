import { z } from 'zod';

export const UserTypeSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    full_name: z.string(),
    avatar_url: z.string().url(),
});

export type UserType = z.infer<typeof UserTypeSchema>;
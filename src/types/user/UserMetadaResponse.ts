import { z } from 'zod';

export const UserMetadataSchema = z.object({
    full_name: z.string(),
    email: z.string().email(),
    avatar_url: z.string().url(),
});

export const UserResponseSchema = z.object({
    user_id: z.string(),
    user_metadata: UserMetadataSchema,
});

export type UserMetadataType = z.infer<typeof UserMetadataSchema>;
export type UserResponseType = z.infer<typeof UserResponseSchema>;


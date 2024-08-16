export type UserMetadataResponseType = {
    email: string;
    full_name: string;
    avatar_url: string;
    [key: string]: any; // This is a catch-all for any other metadata fields
};
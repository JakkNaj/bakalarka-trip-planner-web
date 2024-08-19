import { fetchUserData, signInWithGoogle, signOutUser } from '../utils/api.ts';
import { UserMetadataType } from '../types/user/UserMetadataType.ts';
import {UserMetadataResponseType} from "../types/user/UserMetadaResponse.ts";

export const createUserSlice = (set) => ({
    user: null as UserMetadataType | null,
    setUser: (user: UserMetadataType) => set({ user }),

    fetchUserData: async () => {
        const userMetadata = await fetchUserData();
        if (userMetadata) {
            set({ user: filterUserMetadata(userMetadata) });
        }
    },

    login: async () => {
        await signInWithGoogle();
    },

    logout: async (navigate) => {
        await signOutUser();
        set({ user: null });
        navigate('/');
    },
});

const filterUserMetadata = (metadata: UserMetadataResponseType): UserMetadataType => {
    return {
        email: metadata.email,
        full_name: metadata.full_name,
        avatar_url: metadata.avatar_url,
    };
};

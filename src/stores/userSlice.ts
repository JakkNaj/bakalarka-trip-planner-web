import { fetchUserData, signInWithGoogle, signOutUser } from '../utils/user_api.ts';
import { UserType } from '../types/user/UserType.ts';
import { UserResponseType } from "../types/user/UserMetadaResponse.ts";
import { StateCreator } from 'zustand';

 export interface userSlice {
    user: UserType | null;
    fetchUserData: () => Promise<boolean>;
    login: () => Promise<void>;
    logout: (navigate: (path: string) => void) => Promise<void>;
}

export const createUserSlice : StateCreator<userSlice, [], [], userSlice> = (set) => ({
    user: null as UserType | null,

    fetchUserData: async () => {
        const userMetadata = await fetchUserData();
        if (userMetadata) {
            set({ user: filterUserMetadata(userMetadata) });
            return true;
        }
        return false; 
    },

    login: async () => {
        await signInWithGoogle();
    },

    logout: async (navigate) => {
        await signOutUser();
        set({ user: null });
        navigate('/login');
    },
});

const filterUserMetadata = (metadata: UserResponseType): UserType => {
    return {
        id: metadata.user_id,
        email: metadata.user_metadata.email,
        full_name: metadata.user_metadata.full_name,
        avatar_url: metadata.user_metadata.avatar_url,
    };
};


import { fetchUserData, signInWithGoogle, signOutUser, tryToAuthUser } from '../utils/user_api.ts';
import { UserType } from '../types/user/UserType.ts';
import { UserResponseType } from "../types/user/UserMetadaResponse.ts";
import { StateCreator } from 'zustand';

 export interface userSlice {
    user: UserType | null;
    setUser: (user: UserType) => void;
    fetchUserData: () => Promise<boolean>;
    login: () => Promise<void>;
    logout: (navigate: (path: string) => void) => Promise<void>;
}

export const createUserSlice: StateCreator<userSlice, [], [], userSlice> = (set) => {
    const initializeUser = async () => {
        try {
            const userMetadata = await tryToAuthUser();
            if (userMetadata) {
                set({ user: filterUserMetadata(userMetadata) });
            }
        } catch (error) {
            console.error('Failed to authenticate user', error);
        }
    };

    // immediate call to try to authenticate the user on app load
    initializeUser();

    return {
        user: null as UserType | null,

        setUser: (user: UserType) => set({ user }),

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
    };
};

const filterUserMetadata = (metadata: UserResponseType): UserType => {
    return {
        id: metadata.user_id,
        email: metadata.user_metadata.email,
        full_name: metadata.user_metadata.full_name,
        avatar_url: metadata.user_metadata.avatar_url,
    };
};


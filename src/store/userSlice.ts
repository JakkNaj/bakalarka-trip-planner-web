import { UserMetadataType } from "../types/user/UserMetadataType.ts";
import { UserMetadataResponseType } from "../types/user/UserMetadaResponse.ts";
import supabase from "../config/supabaseClient.ts";
import { PostgrestError } from "@supabase/supabase-js";

export const createUserSlice = (set) => ({
    user: null as UserMetadataType | null,
    setUser: (user: UserMetadataType) => set({ user }),
    userNetworkError: null as PostgrestError | null,
    setUserNetworkError: (error: PostgrestError | null) => set({ userNetworkError: error }),
    fetchUserData: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
            set({ userNetworkError: error });
            return;
        }
        if (data?.user?.user_metadata) {
            set({ user: filterUserMetadata(data.user.user_metadata as UserMetadataResponseType), userFetchError: null });
        }
    },
    login: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error('Error signing in with Google:', error.message);
            set({ userNetworkError: error });
            return;
        }
    },
    logout: async (navigate) => {
        set({ user: null });
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
            set({ userNetworkError: error });
            return;
        }
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
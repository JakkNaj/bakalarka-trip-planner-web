import supabase from '../config/supabaseClient.ts';
import {UserMetadataType, UserResponseType} from '../types/user/UserMetadaResponse.ts';

export const tryToAuthUser = async () => {
    const { data: {session}, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
        throw sessionError;
    };

    if (session) {
        const user = await fetchUserData();
        if (!user) {
            throw new Response('Unauthorized', { status: 401 });
        }
        return user;
    }
}

export const fetchUserData = async (): Promise<UserResponseType | null> => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }

    return {
        user_metadata: data?.user?.user_metadata as UserMetadataType,
        user_id: data?.user?.id as string
    };
};

export const signInWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if (error) {
        console.error('Error signing in with Google:', error.message);
        throw error;
    }
};

export const signOutUser = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
        throw error;
    }
};

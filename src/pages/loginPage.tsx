import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient.ts";
import { useStore } from "../stores/globalStore.ts";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login, fetchUserData } = useStore();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                (async () => {
                    try {
                        console.log('User signed in!');
                        await fetchUserData();
                        navigate('/');
                    } catch (e) {
                        setError('Failed to fetch user data after sign-in.');
                        const error = e as Error;
                        console.error('Error fetching user data:', error.message);
                    }
                })();
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate, fetchUserData]);

    const handleLogin = async () => {
        try {
            await login();
        } catch (e) {
            setError('Failed to sign in with Google.');
            const error = e as Error;
            console.error('Error during login:', error.message);
        }
    };

    return (
        <>
            <h1>Hello world, login!!</h1>
            <button onClick={handleLogin}>Sign in with Google</button>
            {error && <pre>{error}</pre>}
        </>
    );
};
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient.ts";
import { useStore } from "../stores/globalStore.ts";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login, fetchUserData} = useStore();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                if (session) {
                    console.log('User session found!');
                    await fetchUserData();
                    navigate('/home');
                }
            } catch (e) {
                setError('Failed to check session. Please try again.');
                console.error('Error checking session:', e.message);
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                (async () => {
                    try {
                        console.log('User signed in!');
                        await fetchUserData();
                        navigate('/home');
                    } catch (e) {
                        setError('Failed to fetch user data after sign-in.');
                        console.error('Error fetching user data:', e.message);
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
            console.error('Error during login:', e.message);
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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../config/supabaseClient.ts";
import { useStore } from "../store/globalStore.ts";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login, fetchUserData, userNetworkError} = useStore();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                (async () => {
                    console.log('User signed in!');
                    await fetchUserData();
                    navigate('/home');
                })();
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    return (
        <>
            <h1>Hello world, login!!</h1>
            <button onClick={() => login()}>Sign in with Google</button>
            {userNetworkError && <pre>{JSON.stringify(userNetworkError, null, 2)}</pre>}
        </>
    );
};
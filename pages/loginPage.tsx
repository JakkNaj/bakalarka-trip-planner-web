import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../src/config/supabaseClient.ts";

export const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                console.log('User signed in');
                navigate('/success');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, [navigate]);

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Error signing in with Google:', error.message);
    };

    return (
        <>
            <h1>Hello world, login!!</h1>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </>
    );
};
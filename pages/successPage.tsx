import {useEffect, useState} from "react";
import supabase from "../src/config/supabaseClient";
import {UserResponse} from "@supabase/supabase-js";
import {useNavigate} from "react-router-dom";

export const SuccessPage = () => {
    const navigate = useNavigate();
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [data, setData] = useState<never | null>(null);
    const [userResponse, setUserResponse] = useState<UserResponse>(null);

    useEffect(() => {
        const getUserData = async () => {
            await supabase.auth.getUser().then((data) => {
                if (data.data?.user){
                    console.log(data.data)
                    setUserResponse(data);
                }
            });
        }
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('trips')
                .select(`
                    id,
                    title,
                    description,
                    date_start,
                    date_end,
                    activity_details ( name, type, details )
                `)
            if (error) {
                setFetchError('Could not fetch data');
                setData(null);
                console.log(error);
            }
            if (data) {
                console.warn(data);
                setFetchError(null);
                setData(data);
            }
        }
        getUserData();
        fetchData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    }

    return (
        <>
            <h1>
                Hello world, success!!
            </h1>
            <pre>{JSON.stringify(userResponse, null, 2)}</pre>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {fetchError && <p>{fetchError}</p>}
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}
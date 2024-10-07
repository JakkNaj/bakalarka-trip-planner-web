import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_API_URL as string;
const supabaseKey = import.meta.env.VITE_REACT_APP_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 
import supabase from "../config/supabaseClient.ts";
import {ActivityType} from "../types/activities/ActivitiesTypes.ts";
import {ActivityTypes} from "../types/activities/BaseActivityTypes.ts";

export const insertActivity = async (activity: ActivityType) => {
    const { activity_details: typeDetails, ...baseDetails } = activity;
    const { data, error } = await supabase
        .from('activities')
        .insert([baseDetails])
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    const { id: acitivity_id, ...rest } = data as ActivityType;
    const activityData = {...rest, activity_id: acitivity_id};

    switch(activity.type) {
        case ActivityTypes.GENERAL:
            await insertGeneralActivity({...typeDetails, activity_id: acitivity_id});
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    return {...activityData, activity_details: typeDetails};
}

const insertGeneralActivity = async (details: never) => {
    const { error } = await supabase
        .from('general_activities')
        .insert([details])

    if (error) {
        throw new Error(error.message);
    }
}
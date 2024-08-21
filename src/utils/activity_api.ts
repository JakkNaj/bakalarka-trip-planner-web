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
            await insertDetailsActivity({...typeDetails, activity_id: acitivity_id}, 'general_activities');
            break;
        case ActivityTypes.FLIGHT:
            await insertDetailsActivity({...typeDetails, activity_id: acitivity_id}, 'flights');
            break;
        case ActivityTypes.TRANSPORTATION:
            await insertDetailsActivity({...typeDetails, activity_id: acitivity_id}, 'transportation');
            break;
        case ActivityTypes.LODGING:
            await insertDetailsActivity({...typeDetails, activity_id: acitivity_id}, 'lodgings');
            break;
        case ActivityTypes.REMINDER:
            await insertDetailsActivity({...typeDetails, activity_id: acitivity_id}, 'reminders');
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    return {...activityData, activity_details: typeDetails};
}

const insertDetailsActivity = async (details: never, tableName: string) => {
    const { error } = await supabase
        .from(tableName)
        .insert([details])

    if (error) {
        throw new Error(error.message);
    }
}

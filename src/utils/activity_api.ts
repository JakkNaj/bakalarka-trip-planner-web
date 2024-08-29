import supabase from "../config/supabaseClient.ts";
import {ActivityType, FlightActivity, GeneralActivity, InsertActivityType, LodgingActivity, ReminderActivity, TransportationActivity} from "../types/activities/ActivitiesTypes.ts";
import {ActivityTypes} from "../types/activities/BaseActivityTypes.ts";

export const insertActivity = async (activity: InsertActivityType) => {
    const { details: typeDetails, ...baseDetails } = activity;
    const { data, error } = await supabase
        .from('activities')
        .insert([baseDetails])
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    const { activity_id, ...rest } = data as ActivityType;
    const activityData = {...rest, activity_id: activity_id};

    switch(activity.type) {
        case ActivityTypes.GENERAL:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as GeneralActivity, 'general_activities');
            break;
        case ActivityTypes.FLIGHT:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as FlightActivity, 'flights');
            break;
        case ActivityTypes.TRANSPORTATION:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as TransportationActivity, 'transportation');
            break;
        case ActivityTypes.LODGING:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as LodgingActivity, 'lodgings');
            break;
        case ActivityTypes.REMINDER:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as ReminderActivity, 'reminders');
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    return {...activityData, activity_details: typeDetails};
}

const insertDetailsActivity = async (details: ActivityType, tableName: string) => {
    const { error } = await supabase
        .from(tableName)
        .insert([details])

    if (error) {
        throw new Error(error.message);
    }
}


export const fetchActivity = async (activityId: number) => {
    const { data: baseData, error: baseError } = await supabase
        .from('activities')
        .select('*')
        .eq('id', activityId)
        .single();

    if (baseError) {
        throw new Error(baseError.message);
    }

    const baseDetails = baseData as ActivityType;
    let typeDetails;

    switch(baseDetails.type) {
        case ActivityTypes.GENERAL:
            typeDetails = await fetchDetailsActivity(activityId, 'general_activities');
            break;
        case ActivityTypes.FLIGHT:
            typeDetails = await fetchDetailsActivity(activityId, 'flights');
            break;
        case ActivityTypes.TRANSPORTATION:
            typeDetails = await fetchDetailsActivity(activityId, 'transportation');
            break;
        case ActivityTypes.LODGING:
            typeDetails = await fetchDetailsActivity(activityId, 'lodgings');
            break;
        case ActivityTypes.REMINDER:
            typeDetails = await fetchDetailsActivity(activityId, 'reminders');
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    return {...baseDetails, details: typeDetails};
}

const fetchDetailsActivity = async (activityId: number, tableName: string) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('activity_id', activityId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
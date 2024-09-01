import supabase from "../config/supabaseClient.ts";
import {ActivityDetailsType, ActivityType, InsertActivityType} from "../types/activities/ActivitiesTypes.ts";
import {ActivityTypes} from "../types/activities/BaseActivityTypes.ts";
import { FlightType } from "../types/activities/flight/FlightActivity.ts";
import { GeneralType } from "../types/activities/general/GeneralActivity.ts";
import { LodgingType } from "../types/activities/lodging/LodgingActivity.ts";
import { ReminderType } from "../types/activities/reminder/ReminderActivity.ts";
import { TransportType } from "../types/activities/transport/TransportActivity.ts";

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
    console.log("data: ", data);
    const activityData = {...rest, activity_id: activity_id};

    switch(activity.type) {
        case ActivityTypes.GENERAL:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as GeneralType, 'general_activities');
            break;
        case ActivityTypes.FLIGHT:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as FlightType, 'flights');
            break;
        case ActivityTypes.TRANSPORTATION:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as TransportType, 'transportation');
            break;
        case ActivityTypes.LODGING:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as LodgingType, 'lodgings');
            break;
        case ActivityTypes.REMINDER:
            await insertDetailsActivity({...typeDetails, activity_id: activity_id} as ReminderType, 'reminders');
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    return {...activityData, activity_details: typeDetails};
}

const insertDetailsActivity = async (details: ActivityDetailsType, tableName: string) => {
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
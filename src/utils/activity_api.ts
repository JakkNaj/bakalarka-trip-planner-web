import supabase from "../config/supabaseClient.ts";
import { ActivityType, FormActivityDetailsType, InsertActivityDetailsType } from "../types/activities/ActivitiesTypes.ts";
import { ActivityTypes } from "../types/activities/BaseActivityTypes.ts";
import { InsertFlightType } from "../types/activities/flight/FlightActivity.ts";
import { InsertGeneralType } from "../types/activities/general/GeneralActivity.ts";
import { InsertLodgingType } from "../types/activities/lodging/LodgingActivity.ts";
import { InsertReminderType } from "../types/activities/reminder/ReminderActivity.ts";
import { InsertTransportType } from "../types/activities/transport/TransportActivity.ts";
import { InsertBaseActivityType } from '../types/activities/BaseActivityTypes';

export const insertActivity = async (baseDetails: InsertBaseActivityType, typeDetails: FormActivityDetailsType) => {
    const { data, error } = await supabase
        .from('activities')
        .insert([baseDetails])
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    const { id: activity_id, ...rest } = data;
    const activityData = {...rest, activity_id: activity_id};
    let returnedTypeDetails;

    switch(baseDetails.type) {
        case ActivityTypes.GENERAL:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertGeneralType, 'general_activities');
            break;
        case ActivityTypes.FLIGHT:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertFlightType, 'flights');
            break;
        case ActivityTypes.TRANSPORTATION:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertTransportType, 'transportation');
            break;
        case ActivityTypes.LODGING:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertLodgingType, 'lodgings');
            break;
        case ActivityTypes.REMINDER:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertReminderType, 'reminders');
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    return {...activityData, details: returnedTypeDetails};
}

const insertDetailsActivity = async (details: InsertActivityDetailsType, tableName: string) => {
    const { data, error } = await supabase
        .from(tableName)
        .insert([details])
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
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
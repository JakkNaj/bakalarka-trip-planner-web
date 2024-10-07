import supabase from "../config/supabaseClient.ts";
import { ActivityType, ActivityTypeSchema, FormActivityDetailsType, InsertActivityDetailsType } from "../types/activities/ActivitiesTypes.ts";
import { ActivityTypes } from "../types/activities/BaseActivityTypes.ts";
import { FlightTypeSchema, InsertFlightType } from "../types/activities/flight/FlightActivity.ts";
import { GeneralTypeSchema, InsertGeneralType } from "../types/activities/general/GeneralActivity.ts";
import { InsertLodgingType, LodgingTypeSchema } from "../types/activities/lodging/LodgingActivity.ts";
import { InsertReminderType, ReminderTypeSchema } from "../types/activities/reminder/ReminderActivity.ts";
import { InsertTransportType, TransportTypeSchema } from "../types/activities/transport/TransportActivity.ts";
import { InsertBaseActivityType, BaseActivityTypeSchema } from '../types/activities/BaseActivityTypes';

export const insertActivity = async (baseDetails: InsertBaseActivityType, typeDetails: FormActivityDetailsType) => {
    const { data, error } = await supabase
        .from('activities')
        .insert([baseDetails])
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    console.log("data after base insert", data);

    const renamedData = { ...data, activity_id: data.id };
    delete renamedData.id;

    const parsedData = BaseActivityTypeSchema.safeParse(renamedData);
    if (!parsedData.success){
        console.error("error parsing base activity details", parsedData.error);
        throw new Error('Error parsing base activity details');
    }
    console.log("parsedData after insert", parsedData);

    const { activity_id, ...rest } = parsedData.data;
    const activityData = {...rest, activity_id: activity_id};
    let returnedTypeDetails;
    let parsedDetails;

    switch(baseDetails.type) {
        case ActivityTypes.GENERAL:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertGeneralType, 'general_activities');
            parsedDetails = GeneralTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.FLIGHT:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertFlightType, 'flights');
            parsedDetails = FlightTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.TRANSPORTATION:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertTransportType, 'transportation');
            parsedDetails = TransportTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.LODGING:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertLodgingType, 'lodgings');
            parsedDetails = LodgingTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.REMINDER:
            returnedTypeDetails = await insertDetailsActivity({...typeDetails, activity_id: activity_id} as InsertReminderType, 'reminders');
            parsedDetails = ReminderTypeSchema.safeParse(returnedTypeDetails);
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    if (!parsedDetails.success) {
        console.error("error parsing activity details", parsedDetails.error);
        throw new Error('Error parsing activity details');
    }

    return {...activityData, details: parsedDetails?.data};
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


export const updateActivity = async (activity: ActivityType) => {

    const { details, activity_id : act_id,  ...base } = activity;
    const typeDetails = details;
    const baseDetails = {
        id: act_id,
        ...base,
    }
    console.log("baseDetails", baseDetails);

    const { data, error } = await supabase
        .from('activities')
        .update(baseDetails)
        .eq('id', baseDetails.id)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    console.log("data after base update", data);

    const renamedData = { ...data, activity_id: data.id };
    delete renamedData.id;

    const parsedData = BaseActivityTypeSchema.safeParse(renamedData);
    if (!parsedData.success){
        console.error("error parsing base activity details", parsedData.error);
        throw new Error('Error parsing base activity details');
    }
    console.log("parsedData after update", parsedData);

    const { activity_id, ...rest } = parsedData.data;
    const activityData = {...rest, activity_id: activity_id};
    let returnedTypeDetails;
    let parsedDetails;

    switch(baseDetails.type) {
        case ActivityTypes.GENERAL:
            returnedTypeDetails = await updateDetailsActivity({...typeDetails, activity_id: activity_id} as InsertGeneralType, 'general_activities');
            parsedDetails = GeneralTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.FLIGHT:
            returnedTypeDetails = await updateDetailsActivity({...typeDetails, activity_id: activity_id} as InsertFlightType, 'flights');
            parsedDetails = FlightTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.TRANSPORTATION:
            returnedTypeDetails = await updateDetailsActivity({...typeDetails, activity_id: activity_id} as InsertTransportType, 'transportation');
            parsedDetails = TransportTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.LODGING:
            returnedTypeDetails = await updateDetailsActivity({...typeDetails, activity_id: activity_id} as InsertLodgingType, 'lodgings');
            parsedDetails = LodgingTypeSchema.safeParse(returnedTypeDetails);
            break;
        case ActivityTypes.REMINDER:
            returnedTypeDetails = await updateDetailsActivity({...typeDetails, activity_id: activity_id} as InsertReminderType, 'reminders');
            parsedDetails = ReminderTypeSchema.safeParse(returnedTypeDetails);
            break;
        default:
            throw new Error('Invalid activity type.');
    }

    if (!parsedDetails.success) {
        console.error("error parsing activity details", parsedDetails.error);
        throw new Error('Error parsing activity details');
    }

    return {...activityData, details: parsedDetails?.data};
}

const updateDetailsActivity = async (details: InsertActivityDetailsType, tableName: string) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(details)
        .eq('activity_id', details.activity_id)
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

    const parsedBaseDetails = ActivityTypeSchema.safeParse(baseData);
    if (!parsedBaseDetails.success){
        console.error("error parsing base activity details", parsedBaseDetails.error);
        throw new Error('Error parsing base activity details');
    }

    const baseDetails = parsedBaseDetails.data;
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
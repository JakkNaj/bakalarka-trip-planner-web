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

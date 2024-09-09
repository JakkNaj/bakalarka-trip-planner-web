import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Activity } from '../../components/Activity.tsx';
import { useStore } from '../../stores/globalStore.ts';
import { NewActivityForm } from '../../components/NewActivityForm.tsx';
import { insertActivity } from "../../utils/activity_api.ts";
import {ActivityType, InsertActivityType} from "../../types/activities/ActivitiesTypes.ts";
import styled from "styled-components";
import {colors} from "../../assets/colors.ts";
import {Box} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {TripPageHeader} from "./TripPageHeader.tsx";
import {VerticalStepper} from "../../components/VerticalStepper.tsx";
import { TripType } from '../../types/trip/TripType.ts';
import { MainButton } from '../../components/MainButton.tsx';

export const TripPage = () => {
    const navigate = useNavigate();
    const trip = useLoaderData() as TripType;
    const { insertActivityInsideTrip, addTrip } = useStore();
    const [showNewActivityForm, setShowNewActivityForm] = useState(false);

    useEffect(() => {
        // set trip (from loader) in store
        addTrip(trip);
    }, [addTrip, trip]);

    const navigateToEditActivity = (activityId: number) => {
        navigate(`/trip/${trip.id}/activity/${activityId}`);
    };

    const handleAddActivity = async (newActivity: InsertActivityType) => {
        // todo add loading state
        //insert into db
        const insertedActivity = await insertActivity(newActivity);
        //update store
        insertActivityInsideTrip(insertedActivity as ActivityType, trip.id);
    };

    const ShowActivities = () => {
        if (!trip.trip_activities || trip.trip_activities.length === 0) {
            return <p>No activities planned yet.</p>;
        }
        return trip.trip_activities.map((activity) => (
            <Activity key={activity.activity_id} activity={activity} navigateToEditActivity={navigateToEditActivity} />
        ));
    };

    const onEditTrip = (id: number) => {
        //todo
         console.log('Edit trip with id:', id);
    }

    const onAddActivity = () => {
        //todo
        console.log('Add activity');
    }

    return (
        <Styled.PageContainer>
            <TripPageHeader
                trip={trip}
                onEditTrip={onEditTrip}
            />

            <Styled.ButtonBox>
                <MainButton text="Add Activity" right_after="42%" width_after="30%" onClick={onAddActivity} backgroundColor={colors.headerGrey} padding="0.6rem 1rem">
                    <Styled.AddPlusIcon/>
                </MainButton>
            </Styled.ButtonBox>

            <button
                style={{ backgroundColor: 'lightgoldenrodyellow', marginBottom: '20px' }}
                onClick={() => setShowNewActivityForm(true)}
            >
                Plan New Activity
            </button>
            {showNewActivityForm && (
                <NewActivityForm
                    tripId={trip.id}
                    onClose={() => setShowNewActivityForm(false)}
                    onSubmit={handleAddActivity}
                />
            )}
            {trip.trip_activities && trip.trip_activities.length > 0 ? (
                <VerticalStepper activities={trip.trip_activities} />
            ) : (
                <p>No activities planned yet.</p>
            )}
        </Styled.PageContainer>
    );
};

const Styled = {
    PageContainer: styled.div({
        padding: "0 4rem",
    }),
    ButtonBox: styled(Box)({
        position: "relative",
        width: "100%",
        height: "1rem",
        backgroundColor: colors.headerGrey,
        borderBottomRadius: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }),
    AddPlusIcon: styled(LibraryAddIcon)({
        color: colors.mainBlue,
        marginRight: "0.6rem",
    }), 
}
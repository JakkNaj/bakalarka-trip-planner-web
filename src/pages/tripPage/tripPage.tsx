import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../components/Activity.tsx';
import { useStore } from '../../stores/globalStore.ts';
import { NewActivityForm } from '../../components/NewActivityForm.tsx';
import { insertActivity } from "../../utils/activity_api.ts";
import {ActivityType, InsertActivityType} from "../../types/activities/ActivitiesTypes.ts";
import styled from "styled-components";
import {colors} from "../../assets/colors.ts";
import {fonts} from "../../assets/fonts.ts";
import {Box, Button} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {TripPageHeader} from "./TripPageHeader.tsx";
import {VerticalStepper} from "../../components/VerticalStepper.tsx";


export const TripPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const trip = useStore().getTripById(Number(id));
    const { insertActivityInsideTrip } = useStore();
    const [showNewActivityForm, setShowNewActivityForm] = useState(false);

    if (!trip) {
        return <div>No trip with this ID present...</div>;
    }

    const navigateToEditActivity = (activityId: number) => {
        navigate(`/trip/${id}/activity/${activityId}`);
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

    return (
        <Styled.PageContainer>
            <TripPageHeader
                trip={trip}
                onEditTrip={onEditTrip}
            />

            <Styled.ButtonBox>
                <Styled.Button>
                    <Styled.AddPlusIcon className="white-plus"/>
                    Add Activity
                </Styled.Button>
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
    Button: styled(Button)({
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontFamily: fonts.normal,
        textTransform: "lowercase",
        backgroundColor: colors.backgroundGrey,
        border: `0.0625rem solid ${colors.mainBlue}`,
        color: colors.normalText,
        borderRadius: "0.5rem",
        padding: "0.6rem 1rem",
        "&:hover": {
            backgroundColor: colors.mainBlue,
            color: colors.white,
            "& .white-plus": {
                color: colors.white,
            },
        },

    }),
    AddPlusIcon: styled(LibraryAddIcon)({
        color: colors.mainBlue,
        marginRight: "0.6rem",
    }),
}
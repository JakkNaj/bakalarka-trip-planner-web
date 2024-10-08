import { useCallback, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useStore } from '../../stores/globalStore.ts';
import { ActivityForm } from '../../components/ActivityForm.tsx';
import { insertActivity, updateActivity } from "../../utils/activity_api.ts";
import { ActivityType, FormActivityDetailsType } from "../../types/activities/ActivitiesTypes.ts";
import styled from "styled-components";
import { colors } from "../../assets/colors.ts";
import { Box } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TripPageHeader } from "./TripPageHeader.tsx";
import { VerticalStepper } from "../../components/verticalStepper/VerticalStepper.tsx";
import { TripType } from '../../types/trip/TripType.ts';
import { MainButton } from '../../components/MainButton.tsx';
import { TripEditTypeSchema, TripInsertType } from '../../types/trip/TripInsertType.ts';
import { updateTrip } from '../../utils/trip_api.ts';
import { InsertBaseActivityType } from '../../types/activities/BaseActivityTypes.ts';
import { fonts } from '../../assets/fonts.ts';

export const TripPage = () => {
    const loadedTrip = useLoaderData() as TripType;
    const { insertActivityInsideTrip, addTrip, getTripById, updateTrip: updateTripStore, updateActivityInsideTrip } = useStore();
    const [showNewActivityForm, setShowNewActivityForm] = useState(false);
    const [currentTrip, setCurrentTrip] = useState<TripType | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
    
    useEffect(() => {
        // set trip (from loader) in store
        addTrip(loadedTrip);
        setCurrentTrip(loadedTrip);
    }, [addTrip, loadedTrip]);

    useEffect(() => {
        const trip = getTripById(loadedTrip.id);
        if (trip) {
            setCurrentTrip(trip);
        }
    }, [getTripById, loadedTrip]);

    const handleAddActivity = useCallback( async (baseDetails: InsertBaseActivityType, typeDetails: FormActivityDetailsType) => {
        // todo add loading state
        const insertedActivity = await insertActivity(baseDetails, typeDetails);
        console.log("insertedActivity", insertedActivity);
        insertActivityInsideTrip(insertedActivity as ActivityType, loadedTrip.id);
        const currTrip = getTripById(loadedTrip.id);
        if (currTrip) {
            setCurrentTrip(currTrip);
        }
    }, [insertActivityInsideTrip, loadedTrip, getTripById]);

    const handleUpdateActivity = useCallback(async (activity: ActivityType) => {
        // todo add loading state
        const updatedActivity = await updateActivity(activity);
        console.log("updatedActivity", updatedActivity);
        updateActivityInsideTrip(updatedActivity as ActivityType, loadedTrip.id);
        const currTrip = getTripById(loadedTrip.id);
        if (currTrip) {
            setCurrentTrip(currTrip);
        }
    },  [updateActivityInsideTrip, loadedTrip, getTripById]);

    const handleNewTripSubmit = useCallback(async (updatedTrip: TripInsertType) => {
        const mergedTrip = {
            ...updatedTrip,
            id: loadedTrip.id,
        };
        if (TripEditTypeSchema.safeParse(mergedTrip)) {
            const updatedTrip = await updateTrip(mergedTrip);
            setCurrentTrip(updatedTrip);
            updateTripStore(updatedTrip);
        }
    }, [updateTripStore, loadedTrip]);

    if (currentTrip === null) {
        return <p>Loading...</p>;
    }

    const onEditActivity = (activity: ActivityType): void => {
        setSelectedActivity(activity);
        setShowNewActivityForm(true);
    };

    const onCloseForm = () => {
        setShowNewActivityForm(false);
        setSelectedActivity(null);
    };

    const onSubmit = (baseDetails: InsertBaseActivityType, typeDetails: FormActivityDetailsType): void => {
        const updatedActivity = {
            activity_id: selectedActivity?.activity_id,
            ...baseDetails,
            details: {
                activity_id: selectedActivity?.activity_id,
                id: selectedActivity?.details.id,
                ...typeDetails,
            }
        } as ActivityType;
        if (!selectedActivity) {
            // new activity
            handleAddActivity(baseDetails, typeDetails);
        } else {
            // edit activity
            handleUpdateActivity(updatedActivity);
        }
    };

    return (
        <Styled.PageContainer>
            <TripPageHeader trip={currentTrip} handleFormSubmit={handleNewTripSubmit}/>
            <Styled.ButtonBox>
                <MainButton text="Add Activity" right_after="42%" width_after="30%" onClick={() => setShowNewActivityForm(true)} backgroundColor={colors.headerGrey} padding="0.6rem 1rem">
                    <Styled.AddPlusIcon/>
                </MainButton>
            </Styled.ButtonBox>
            <h3 style={{fontFamily: fonts.heading, color: colors.mainBlue, marginTop: "2rem"}}>Activities: click to see details!</h3>
            <Styled.ActivitiesContentContainer>
                {currentTrip.trip_activities && currentTrip.trip_activities.length > 0 ? (
                    <VerticalStepper activities={currentTrip.trip_activities} onEditActivity={onEditActivity} />
                ) : (
                    <p>No activities planned yet.</p>
                )}
                {showNewActivityForm && (
                    <ActivityForm 
                        tripId={loadedTrip.id}
                        onClose={onCloseForm}
                        onSubmit={onSubmit}
                        editActivity={selectedActivity || undefined}
                    />
                )}
            </Styled.ActivitiesContentContainer>
        </Styled.PageContainer>
    );
};

const Styled = {
    PageContainer: styled.div({
        padding: "0 4rem",
        '@media (max-width: 768px)': {
            padding: "0 2rem",
        },
    }),
    ActivitiesContentContainer: styled.div({
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        alignItems: "flex-start",
        '@media (max-width: 768px)': {
            flexDirection: "column-reverse",
        },
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
        '@media (max-width: 768px)': {
            height: "0.5rem",
        },
    }),
    AddPlusIcon: styled(LibraryAddIcon)({
        color: colors.mainBlue,
        marginRight: "0.6rem",
        '@media (max-width: 768px)': {
            marginRight: "0.3rem",
        },
    }), 
}

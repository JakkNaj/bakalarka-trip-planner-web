import { useCallback, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useStore } from '../../stores/globalStore.ts';
import { ActivityForm } from '../../components/ActivityForm.tsx';
import { insertActivity } from "../../utils/activity_api.ts";
import {ActivityType, FormActivityDetailsType} from "../../types/activities/ActivitiesTypes.ts";
import styled from "styled-components";
import {colors} from "../../assets/colors.ts";
import {Box} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {TripPageHeader} from "./TripPageHeader.tsx";
import {VerticalStepper} from "../../components/verticalStepper/VerticalStepper.tsx";
import { TripType } from '../../types/trip/TripType.ts';
import { MainButton } from '../../components/MainButton.tsx';
import { TripEditTypeSchema, TripInsertType } from '../../types/trip/TripInsertType.ts';
import { updateTrip } from '../../utils/trip_api.ts';
import { InsertBaseActivityType } from '../../types/activities/BaseActivityTypes.ts';
import { fonts } from '../../assets/fonts.ts';

export const TripPage = () => {
    const loadedTrip = useLoaderData() as TripType;
    const { insertActivityInsideTrip, addTrip, getTripById, updateTrip: updateTripStore } = useStore();
    const [showNewActivityForm, setShowNewActivityForm] = useState(false);
    const [currentTrip, setCurrentTrip] = useState<TripType | null>(null);
    
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

    return (
        <Styled.PageContainer>
            <TripPageHeader trip={currentTrip} handleFormSubmit={handleNewTripSubmit}/>
            <Styled.ButtonBox>
                <MainButton text="Add Activity" right_after="42%" width_after="30%" onClick={() => setShowNewActivityForm(true)} backgroundColor={colors.headerGrey} padding="0.6rem 1rem">
                    <Styled.AddPlusIcon/>
                </MainButton>
            </Styled.ButtonBox>
            <h3 style={{fontFamily: fonts.heading, color: colors.mainBlue}}>Activities: click to see details!</h3>
            <div style={{display: "flex", gap: "1rem", justifyContent: "space-between", alignItems: "flex-start"}}>
                {currentTrip.trip_activities && currentTrip.trip_activities.length > 0 ? (
                    <VerticalStepper activities={currentTrip.trip_activities} />
                ) : (
                    <p>No activities planned yet.</p>
                )}
                {showNewActivityForm && (
                    <ActivityForm 
                        tripId={loadedTrip.id}
                        onClose={() => setShowNewActivityForm(false)}
                        onSubmit={handleAddActivity}
                    />
                )}
            </div>
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
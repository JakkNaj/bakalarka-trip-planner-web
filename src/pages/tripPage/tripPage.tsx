import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
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
import { TripEditTypeSchema, TripInsertType } from '../../types/trip/TripInsertType.ts';
import { updateTrip } from '../../utils/trip_api.ts';

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

    const handleAddActivity = async (newActivity: InsertActivityType) => {
        // todo add loading state
        //insert into db
        const insertedActivity = await insertActivity(newActivity);
        //update store
        insertActivityInsideTrip(insertedActivity as ActivityType, loadedTrip.id);
    };

    const handleNewTripSubmit = async (updatedTrip: TripInsertType) => {
        const mergedTrip = {
            ...updatedTrip,
            id: loadedTrip.id,
        };
        if (TripEditTypeSchema.safeParse(mergedTrip)) {
            const updatedTrip = await updateTrip(mergedTrip);
            setCurrentTrip(updatedTrip);
            updateTripStore(updatedTrip);
        }
    };

    const onAddActivity = () => {
        //todo
        console.log('Add activity');
    };

    if (currentTrip === null) {
        return <p>Loading...</p>;
    }

    return (
        <Styled.PageContainer>
            <TripPageHeader trip={currentTrip} handleFormSubmit={handleNewTripSubmit}/>
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
                    tripId={loadedTrip.id}
                    onClose={() => setShowNewActivityForm(false)}
                    onSubmit={handleAddActivity}
                />
            )}
            {loadedTrip.trip_activities && loadedTrip.trip_activities.length > 0 ? (
                <VerticalStepper activities={loadedTrip.trip_activities} />
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
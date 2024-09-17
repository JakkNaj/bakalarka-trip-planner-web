import { useState } from 'react';
import { ActivityTypes, InsertBaseActivityType } from '../types/activities/BaseActivityTypes.ts';
import { GeneralActivityForm } from "./activityTypeForms/GeneralActivityForm.tsx";
import { FlightActivityForm } from "./activityTypeForms/FlightActivityForm.tsx";
import { ReminderActivityForm } from "./activityTypeForms/ReminderActivityForm.tsx";
import { LodgingActivityForm } from "./activityTypeForms/LodgingActivityForm.tsx";
import { TransportationActivityForm } from "./activityTypeForms/TransportationActivityForm.tsx";
import { FormActivityDetailsType } from '../types/activities/ActivitiesTypes.ts';
import styled from 'styled-components';
import { FormControl, TextField, Select, MenuItem } from '@mui/material';
import { fonts } from "../assets/fonts.ts";
import { colors } from "../assets/colors.ts";
import { MainButton } from './MainButton.tsx';

type ActivityFormProps = {
    onClose: () => void;
    onSubmit: (baseDetails: InsertBaseActivityType, typeDetails: FormActivityDetailsType) => Promise<void>;
    tripId: number;
};

export const ActivityForm = ({ onClose, onSubmit, tripId }: ActivityFormProps) => {
    const [baseActivityDetails, setBaseActivityDetails] = useState<InsertBaseActivityType>({
        trip_id: tripId,
        name: '',
        timestamp_start: new Date(),
        timestamp_end: new Date(),
        type: "" as ActivityTypes,
    });

    const [typeActivityDetails, setTypeActivityDetails] = useState<FormActivityDetailsType>({} as FormActivityDetailsType);

    const handleActivityTypeChange = (e: SelectChangeEvent<unknown>) => {
        setBaseActivityDetails({
            ...baseActivityDetails,
            type: e.target.value as ActivityTypes,
        });
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBaseActivityDetails({
            ...baseActivityDetails,
            [e.target.name]: e.target.value,
        });
    };

    const setTypeDetails = (details: FormActivityDetailsType) => {
        setTypeActivityDetails(details);
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(baseActivityDetails, typeActivityDetails);
    };

    const renderActivityTypeForm = () => {
        switch (baseActivityDetails.type) {
            case ActivityTypes.FLIGHT:
                return <FlightActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.TRANSPORTATION:
                return <TransportationActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.LODGING:
                return <LodgingActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.REMINDER:
                return <ReminderActivityForm setDetails={setTypeDetails} />;
            case ActivityTypes.GENERAL:
                return <GeneralActivityForm setDetails={setTypeDetails} />;
            default:
                console.error('Invalid activity type');
                return null;
        }
    }

    return (
        <Styled.Form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="none" sx={{ gap: '1rem' }}>
                <Styled.TextField
                    label="Name"
                    name="name"
                    value={baseActivityDetails.name}
                    onChange={handleDetailChange}
                    required
                />
                <Styled.TextField
                    label="Start Time"
                    type="date"
                    name="timestamp_start"
                    value={baseActivityDetails.timestamp_start.toISOString().slice(0, 10)}
                    onChange={handleDetailChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <Styled.TextField
                    label="End Time"
                    type="date"
                    name="timestamp_end"
                    value={baseActivityDetails.timestamp_end.toISOString().slice(0, 10)}
                    onChange={handleDetailChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <Styled.Select
                    value={baseActivityDetails.type}
                    onChange={handleActivityTypeChange}
                    displayEmpty
                    required
                >
                    <MenuItem value="" disabled>Select an activity</MenuItem>
                    {Object.values(ActivityTypes).map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Styled.Select>
            {baseActivityDetails.type && renderActivityTypeForm()}
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.4rem" }}>
                <MainButton text="Add Activity" right_after='26%' width_after='46%' type="submit" />
                <MainButton text='Cancel' right_after='5%' width_after='90%' onClick={onClose} />
            </div>
            </FormControl>
        </Styled.Form>
    );
};

const Styled = {
    Form: styled.form({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1rem",
        width: "40%",
    }),
    TextField: styled(TextField)({
        '& .MuiInputBase-root': {
            fontFamily: fonts.normal,
            borderRadius: '0.4rem',
        },
        '& .MuiInputLabel-root': {
            fontFamily: fonts.normal,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '0.4rem',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.mainBlue,
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: colors.mainBlue,
        },
    }),
    Select: styled(Select)({
        '& .MuiInputBase-root': {
            fontFamily: fonts.normal,
            borderRadius: '0.4rem',
        },
        '& .MuiInputLabel-root': {
            fontFamily: fonts.normal,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '0.4rem',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.mainBlue,
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: colors.mainBlue,
        },
    }),
};
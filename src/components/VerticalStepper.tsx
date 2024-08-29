import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from '@mui/material';
import { ActivityType } from '../types/activities/ActivitiesTypes.ts';
import {colors} from "../assets/colors.ts";
import { Navigate, useNavigate } from 'react-router-dom';

interface VerticalStepperProps {
    activities: ActivityType[];
}

export const VerticalStepper = ({ activities }: VerticalStepperProps) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleStepClick = (index: number) => {
        setActiveStep(activeStep === index ? 0 : index);
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                {activities.map((activity, index) => (
                    <Step
                        key={activity.activity_id}
                        expanded={activeStep === index}
                        sx={{
                            '& .MuiStepLabel-root .Mui-active': {
                                color: colors.mainBlue,
                            },
                            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                fill: colors.white,
                            },
                        }}>
                        <StepLabel onClick={() => handleStepClick(index)}>
                            {activity.name}
                        </StepLabel>
                        <StepContent>
                            <Typography>{activity.type}</Typography>
                            <Typography>Date: {JSON.stringify(activity.details)}</Typography>
                            <button onClick={() => {navigate(`/trip/${activity.trip_id}/activity/${activity.activity_id}`)}}>edit activity</button>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
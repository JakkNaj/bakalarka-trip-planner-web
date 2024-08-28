import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from '@mui/material';
import { ActivityType } from '../types/activities/ActivitiesTypes.ts';
import {colors} from "../assets/colors.ts";

interface VerticalStepperProps {
    activities: ActivityType[];
}

export const VerticalStepper = ({ activities }: VerticalStepperProps) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleStepClick = (index: number) => {
        setActiveStep(activeStep === index ? null : index);
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
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
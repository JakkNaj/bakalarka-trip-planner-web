import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from '@mui/material';
import { ActivityType } from '../../types/activities/ActivitiesTypes.ts';
import {colors} from "../../assets/colors.ts";
import { useNavigate } from 'react-router-dom';
import { GeneralActivityStepContent } from './GeneralActivityStepContent.tsx';
import { ActivityTypes } from '../../types/activities/BaseActivityTypes.ts';
import { GeneralActivity } from '../../types/activities/general/GeneralActivity.ts';
import { FlightActivityStepContent } from './FlightActivityStepContent.tsx';
import { FlightActivity } from '../../types/activities/flight/FlightActivity.ts';
import { TransportActivityStepContent } from './TransportActivityStepContent.tsx';
import { TransportationActivity } from '../../types/activities/transport/TransportActivity';
import { LodgingActivityStepContent } from './LodgingActivityStepContent.tsx';
import { LodgingActivity } from '../../types/activities/lodging/LodgingActivity.ts';
import { ReminderActivity } from '../../types/activities/reminder/ReminderActivity.ts';
import { ReminderActivityStepContent } from './ReminderActivityStepContent.tsx';
import { MainButton } from '../MainButton.tsx';
import EditIcon from '@mui/icons-material/Edit';

interface VerticalStepperProps {
    activities: ActivityType[];
}

export const VerticalStepper = ({ activities }: VerticalStepperProps) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleStepClick = (index: number) => {
        setActiveStep(activeStep === index ? 0 : index);
    };

    const getStepContent = (activity: ActivityType) => {
        switch (activity.type) {
            case ActivityTypes.GENERAL:
                return <GeneralActivityStepContent activity={activity as GeneralActivity} />;
            case ActivityTypes.FLIGHT:
                return <FlightActivityStepContent activity={activity as FlightActivity} />;
            case ActivityTypes.TRANSPORTATION:
                return <TransportActivityStepContent activity={activity as TransportationActivity} />
            case ActivityTypes.LODGING:
                return <LodgingActivityStepContent activity={activity as LodgingActivity} />
            case ActivityTypes.REMINDER:
                return <ReminderActivityStepContent activity={activity as ReminderActivity} />
            default:
                return <Typography>Activity type not supported</Typography>;
        }
    }    

    return (
        <Box sx={{ maxWidth: "80%" }}>
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
                        <StepLabel 
                            onClick={() => handleStepClick(index)}
                            sx={{
                                '& .MuiStepLabel-labelContainer span': {
                                    fontSize: '1rem',
                                },
                            }}
                        >
                            {activity.name + " - " + activity.type}
                        </StepLabel>
                        <StepContent>
                            {getStepContent(activity)}
                            <MainButton 
                                text="edit" 
                                right_after="6%" 
                                width_after="54%" 
                                onClick={() => navigate(`/trip/${activity.trip_id}/activity/${activity.activity_id}`)} 
                            >
                                <EditIcon sx={{color: colors.mainBlue, marginRight: "0.2rem"}}/>
                            </MainButton>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
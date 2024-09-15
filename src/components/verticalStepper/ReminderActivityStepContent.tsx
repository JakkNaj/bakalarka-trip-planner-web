import { StyledDetailsBox, StyledLabelTypography, StyledNormalTypography, StyledStepContentContainer } from "./styledStepContents";
import { ReminderActivity } from "../../types/activities/reminder/ReminderActivity";

type ReminderActivityStepContentProps = {
    activity: ReminderActivity;
};

export const ReminderActivityStepContent = ({ activity }: ReminderActivityStepContentProps) => {
    return (
        <StyledStepContentContainer>
            <StyledDetailsBox>
                <StyledLabelTypography>Note:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.note}
                </StyledNormalTypography>
            </StyledDetailsBox>
            <StyledDetailsBox>
                <StyledLabelTypography>Reminder Time:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.reminder_time.toLocaleString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
        </StyledStepContentContainer>
    );
};
import { LodgingActivity } from "../../types/activities/lodging/LodgingActivity";
import { StyledDetailsBox, StyledLabelTypography, StyledNormalTypography, StyledStepContentContainer } from "./styledStepContents";

type LodgingActivityStepContentProps = {
    activity: LodgingActivity;
};

export const LodgingActivityStepContent = ({ activity }: LodgingActivityStepContentProps) => {
    return (
        <StyledStepContentContainer>
            <StyledDetailsBox>
                <StyledLabelTypography>Lodging Name:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.lodging_name}
                </StyledNormalTypography>
            </StyledDetailsBox>
            <StyledNormalTypography>
                {activity.timestamp_start.toLocaleDateString() + " - " + activity.timestamp_end.toLocaleDateString()}
            </StyledNormalTypography>
            <StyledDetailsBox>
                <StyledLabelTypography>Check-In:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.check_in_time.toLocaleTimeString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
            <StyledDetailsBox>
                <StyledLabelTypography>Check-Out:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.check_out_time.toLocaleTimeString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
            {activity.details?.contact_number  && (
                    <StyledDetailsBox>
                        <StyledLabelTypography>Contact:</StyledLabelTypography>
                        <StyledNormalTypography>
                            {activity.details.contact_number}
                        </StyledNormalTypography>
                    </StyledDetailsBox>
            )}
            {activity.details?.address  && (
                    <StyledDetailsBox>
                        <StyledLabelTypography>Adress:</StyledLabelTypography>
                        <StyledNormalTypography>
                            {activity.details.address}
                        </StyledNormalTypography>
                    </StyledDetailsBox>
            )}
        </StyledStepContentContainer>
    );
};
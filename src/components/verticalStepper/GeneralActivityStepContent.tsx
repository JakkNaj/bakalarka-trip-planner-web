import { StyledDetailsBox, StyledLabelTypography, StyledNormalTypography, StyledStepContentContainer } from "./styledStepContents";
import { GeneralActivity } from '../../types/activities/general/GeneralActivity';

type GeneralActivityStepContentProps = {
    activity: GeneralActivity;
};

export const GeneralActivityStepContent = ({ activity }: GeneralActivityStepContentProps) => {
    return (
        <StyledStepContentContainer>
            <StyledDetailsBox>
                <StyledLabelTypography>Start:</StyledLabelTypography>
                <StyledNormalTypography>{activity.timestamp_start.toLocaleString()}</StyledNormalTypography>
            </StyledDetailsBox>
            <StyledDetailsBox>
                <StyledLabelTypography>End:</StyledLabelTypography>
                <StyledNormalTypography>{activity.timestamp_end.toLocaleString()}</StyledNormalTypography>
            </StyledDetailsBox>
            {activity.details?.description && (
                <StyledDetailsBox>
                    <StyledLabelTypography>Description:</StyledLabelTypography>
                    <StyledNormalTypography>
                        {activity.details.description}
                    </StyledNormalTypography>
                </StyledDetailsBox>
            )}
            {activity.details?.location && (
                <StyledDetailsBox>
                    <StyledLabelTypography>Location:</StyledLabelTypography>
                    <StyledNormalTypography>
                        {activity.details.location}
                    </StyledNormalTypography>
                </StyledDetailsBox>
            )}
        </StyledStepContentContainer>
    );
};
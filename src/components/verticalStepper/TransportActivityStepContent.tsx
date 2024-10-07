import { StyledDetailsBox, StyledLabelTypography, StyledNormalTypography, StyledStepContentContainer } from "./styledStepContents";
import { TransportationActivity } from "../../types/activities/transport/TransportActivity";

type TransportActivityStepContentProps = {
    activity: TransportationActivity;
};

export const TransportActivityStepContent = ({ activity }: TransportActivityStepContentProps) => {
    return (
        <StyledStepContentContainer>
            <StyledDetailsBox>
                <StyledLabelTypography>Departure:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.departure_location}
                </StyledNormalTypography>
                <StyledNormalTypography>
                    {activity.details.departure_time.toLocaleString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
            <StyledDetailsBox>
                <StyledLabelTypography>Arrival:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.arrival_location}
                </StyledNormalTypography>
                <StyledNormalTypography>
                    {activity.details.arrival_time.toLocaleString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
            {activity.details?.provider && (
                <StyledDetailsBox>
                    <StyledLabelTypography>Provider:</StyledLabelTypography>
                    <StyledNormalTypography>
                        {activity.details.provider}
                    </StyledNormalTypography>
                </StyledDetailsBox>
            )}
        </StyledStepContentContainer>
    );
};
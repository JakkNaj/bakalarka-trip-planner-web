import { FlightActivity } from "../../types/activities/flight/FlightActivity";
import { StyledDetailsBox, StyledLabelTypography, StyledNormalTypography, StyledStepContentContainer } from "./styledStepContents";


type FlightActivityStepContentProps = {
    activity: FlightActivity;
};

export const FlightActivityStepContent = ({ activity }: FlightActivityStepContentProps) => {
    return (
        <StyledStepContentContainer>
            <StyledDetailsBox>
                <StyledLabelTypography>Departure:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.departure_airport}
                </StyledNormalTypography>
                <StyledNormalTypography>
                    {activity.details.departure_time.toLocaleTimeString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
            <StyledDetailsBox>
                <StyledLabelTypography>Arrival:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.arrival_airport}
                </StyledNormalTypography>
                <StyledNormalTypography>
                    {activity.details.arrival_time.toLocaleTimeString()}
                </StyledNormalTypography>
            </StyledDetailsBox>
            <StyledDetailsBox>
                <StyledLabelTypography>Flight Number:</StyledLabelTypography>
                <StyledNormalTypography>
                    {activity.details.flight_number}
                </StyledNormalTypography>
            </StyledDetailsBox>
            {activity.details?.airline &&
                <StyledDetailsBox>
                    <StyledLabelTypography>Airline:</StyledLabelTypography>
                    <StyledNormalTypography>
                        {activity.details.airline}
                    </StyledNormalTypography>
                </StyledDetailsBox>
            }
        </StyledStepContentContainer>
    );
};


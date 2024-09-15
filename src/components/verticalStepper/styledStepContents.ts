import styled from "styled-components";
import { fonts } from "../../assets/fonts";
import { Typography } from "@mui/material";
import { colors } from "../../assets/colors";

export const StyledStepContentContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.normal,
    width: "100%",
    gap: "0.4rem",
    paddingBottom: "0.8rem",
});

export const StyledDetailsBox = styled.div({
    display: "flex",
    flexDirection: "row",
    gap: "0.8rem",
    fontFamily: fonts.normal,
    width: "100%",
});

export const StyledNormalTypography = styled(Typography)({
    fontFamily: fonts.normal,
});

export const StyledLabelTypography = styled(Typography)({
    fontFamily: fonts.heading,
    color: colors.normalText,
});
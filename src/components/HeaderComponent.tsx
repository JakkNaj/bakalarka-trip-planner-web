import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fonts } from "../assets/fonts.ts";
import { colors } from "../assets/colors.ts";
import { Avatar as MuiAvatar, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useStore } from "../stores/globalStore.ts";
import logoIpsum from "../assets/logoIpsum.svg";
import { useState } from "react";
import { OrderByTypes } from "../types/orderByTypes.ts";

export const HeaderComponent = () => {
    const navigate = useNavigate();
    const { user, logoutAndReset, setOrderTripsBy, orderTripsBy } = useStore();
    const avatarUrl = user?.avatar_url;
    const firstName = user?.full_name?.split(' ')[0];
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logoutAndReset(navigate);
        setAnchorEl(null);
    };

    return (
            <Styled.Nav>
                <Styled.LogoLink to="/">
                    <Styled.Logo src={logoIpsum} alt="Logo" />
                </Styled.LogoLink>
                <Styled.NavlinksContainer>
                    <Styled.NavLink
                        to="/"
                        onClick={() => setOrderTripsBy(OrderByTypes.UPCOMING)}
                        className={orderTripsBy === OrderByTypes.UPCOMING ? "active" : ""}
                    >
                        upcoming trips
                    </Styled.NavLink>
                    <Styled.Separator>|</Styled.Separator>
                    <Styled.NavLink
                        to="/"
                        onClick={() => setOrderTripsBy(OrderByTypes.PAST)}
                        className={orderTripsBy === OrderByTypes.PAST ? "active" : ""}
                    >
                        previous trips
                    </Styled.NavLink>
                </Styled.NavlinksContainer>
                <Styled.Profile onClick={handleClick}>
                    <Styled.ArrowDown />
                    <MuiAvatar src={avatarUrl} alt="User Avatar" />
                    <Styled.ProfileName>{firstName}</Styled.ProfileName>
                </Styled.Profile>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Styled.Nav>
    );
};

const Styled = {
    Nav: styled.nav({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.4rem 2rem",
        width: "100%",
        maxWidth: "120rem",
        "@media (max-width: 768px)": {
            flexDirection: "column",
            padding: "1rem",
        },
    }),
    NavLink: styled(Link)({
        fontFamily: fonts.heading,
        color: colors.mainBlue,
        fontSize: "1rem",
        textDecoration: "none",
        padding: "0.4rem",
        "&.active": {
            borderBottom: `1px solid ${colors.mainBlue}`,
        },
        "&:hover": {
            color: colors.mainBlue,
        },
        "@media (max-width: 768px)": {
            fontSize: "1.2rem",
            padding: "0.8rem",
        },
    }),
    NavlinksContainer: styled.div({
        display: "flex",
        alignItems: "center",
        "@media (max-width: 768px)": {
            marginBottom: "1rem",
            order: 2,
        },
    }),
    Separator: styled.span({
        margin: "0 1.4rem",
        color: colors.mainBlue,
        "@media (max-width: 768px)": {
            margin: "0.5rem 0",
        },
    }),
    LogoLink: styled(Link)({
        display: "flex",
        alignItems: "center",
        "@media (max-width: 768px)": {
            order: 1,
            marginBottom: "0",
        },
    }),
    Logo: styled.img({
        height: "20px",
    }),
    Profile: styled.div({
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        "@media (max-width: 768px)": {
            order: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: "1rem",
        },
    }),
    ProfileName: styled.span({
        marginLeft: "0.4rem",
        fontFamily: fonts.normal,
        color: colors.mainBlue,
        "@media (max-width: 768px)": {
            marginLeft: "0.4rem",
            marginTop: "0",
        },
    }),
    ArrowDown: styled(KeyboardArrowDown)({
        padding: "0.2rem",
        color: colors.mainBlue,
    }),
};
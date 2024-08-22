import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import {fonts} from "../assets/fonts.ts";
import {colors} from "../assets/colors.ts";
import {Avatar as MuiAvatar} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {useStore} from "../stores/globalStore.ts";
import logoIpsum from "../assets/logoIpsum.svg";

export const LayoutComponent = () => {
    const { user } = useStore();
    const avatarUrl = user?.avatar_url;

    return (
        <>
            <Styled.Nav>
                <Styled.LogoLink to="/home">
                    <Styled.Logo src={logoIpsum} alt="Logo" />
                </Styled.LogoLink>
                <p>
                    <Styled.NavLink to="/" className="active">upcoming trips</Styled.NavLink>
                    <Styled.Separator>|</Styled.Separator>
                    <Styled.NavLink to="/">previous trips</Styled.NavLink>
                </p>
                <Styled.Profile>
                    <Styled.ArrowDown />
                    <MuiAvatar src={avatarUrl} alt="User Avatar" />
                </Styled.Profile>
            </Styled.Nav>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

const Styled = {
    Nav: styled.nav({
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.headerGrey,
        padding: "0.4rem 0",
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
    }),
    Separator: styled.span({
        margin: "0 1.4rem",
        color: colors.mainBlue,
    }),
    LogoLink: styled(Link)({
        display: "flex",
        alignItems: "center",
    }),
    Logo: styled.img({
        height: "20px",
        marginRight: "1rem",
    }),
    Profile: styled.div({
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    }),
    ArrowDown: styled(KeyboardArrowDown)({
        padding: "0.2rem",
        color: colors.mainBlue,
    }),
}


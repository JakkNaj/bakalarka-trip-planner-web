import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import { colors } from "../assets/colors.ts";
import { HeaderComponent } from "./HeaderComponent.tsx";
import { useEffect } from "react";
import { useStore } from "../stores/globalStore.ts";

export const LayoutComponent = () => {
    const {user} = useStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);


    return (
        <Styled.PageContainer>
            <Styled.HeaderContainer>
                <HeaderComponent />
            </Styled.HeaderContainer>
            <Styled.MainContainer>
                <Outlet />
            </Styled.MainContainer>
        </Styled.PageContainer>
    );
};

const Styled = {
    PageContainer: styled.div({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.backgroundGrey,
        minHeight: "100vh",
    }),
    HeaderContainer: styled.div({
        backgroundColor: colors.headerGrey,
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }),
    MainContainer: styled.div({
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
        maxWidth: "120rem",
    }),
};
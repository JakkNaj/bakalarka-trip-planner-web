import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import { colors } from "../assets/colors.ts";
import { CircularProgress } from "@mui/material";
import { useStore } from "../stores/globalStore.ts";
import { useEffect, useState } from "react";
import { HeaderComponent } from "./HeaderComponent.tsx";

export const LayoutComponent = () => {
    const navigate = useNavigate();
    const { fetchUserData } = useStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await fetchUserData();
            if (!isAuthenticated) {
                navigate('/login');
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [fetchUserData]);

    if (isLoading) {
        return <CircularProgress />;
    }

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
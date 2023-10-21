import styled from "@emotion/styled";
import { Box, IconButton, Button, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { chat } from "../types";
import ChattingComponent from "../components/Chats/chattingComponent";
import useStateLS from "../hooks/useStateLS";

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;


const MainPage = observer(() => {
    const store = useContext(Context);
    return (
        <Container>
            <Box
                sx={{
                    width: 0.95,
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        width: 1,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        overflowY: "hidden",
                    }}
                >
                    <ChattingComponent />
                </Box>
            </Box>
        </Container>
    );
});

export default MainPage;
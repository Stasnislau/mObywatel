import styled from "@emotion/styled";
import { Menu, Add } from "@mui/icons-material";
import { Box, IconButton, Button, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import GettingStarted from "../components/Views/gettingStarted";
import ChatsList from "../components/Chats/chatsList";
import { chat } from "../types";
import CreateChatModal from "../components/modals/createChatModal";

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

const SideBar = styled(Box)`
  width: 5%;
  &.is-open {
    width: 20%;
  }
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.5s ease-in-out;
`;

const MainPage = observer(() => {
    const store = useContext(Context);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [chats, setChats] = useState<chat[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const getChats = async () => {
        const chats = localStorage.getItem("chats");
        const parsedChats = chats ? JSON.parse(chats) as chat[] : [] as chat[];
        setChats(parsedChats);
    }

    const [currentChat, setCurrentChat] = useState<chat>();
    const getCurrentChat = async () => {
        const chats = localStorage.getItem("chats");
        const parsedChats = chats ? JSON.parse(chats) as chat[] : [] as chat[];
        const currentChat = parsedChats.find((chat: chat) => chat.name === store.state.currentChat);
        setCurrentChat(currentChat);
    }

    useEffect(() => {
        getCurrentChat();
    }, [store.state.currentChat]);

    useEffect(() => {
        getChats();
    }, [store.state.currentChat]);

    return (
        <Container>
            <SideBar className={"is-open"}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        width: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 1,
                            height: "10%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxSizing: "border-box",
                            padding: "0 5px",
                        }}
                    >
                        <Button
                            color="secondary"
                            variant="outlined"
                            sx={{
                                display: "flex",
                                margin: "0.5rem",
                                width: 1,
                            }}
                            onClick={() => {
                                setIsCreateModalOpen(true);
                            }}
                        >
                            <Add />
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: "90%",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            display: "flex",
                        }}
                    >
                        <ChatsList chats={chats} />
                    </Box>
                </Box>
            </SideBar>
            <Box
                sx={{
                    width: "95%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                {!store.state.currentChat ? <GettingStarted /> : null}
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    {store.state.currentChat ? (
                        <Box
                            width="80%"
                            height="20vh"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                marginTop: "1rem",
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Box
                                    width="80%"
                                    height="40%"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                    }}
                                >
                                    <Box sx={{ width: "100%" }}>

                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            </Box>
            {isCreateModalOpen && (
                <CreateChatModal
                    open={isCreateModalOpen}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                    }
                    }
                />
            )}
        </Container>
    );
});

export default MainPage;
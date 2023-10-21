import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Box, IconButton, Typography } from "@mui/material";
import { Context } from "../../../App";
import { chat } from "../../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useEffect } from "react";


const ChatsList = observer(() => {
    const [chats, setChats] = useState<chat[]>([] as chat[]);
    const getChats = async () => {
        const chats = localStorage.getItem("chats");
        const parsedChats = chats ? JSON.parse(chats) as chat[] : [] as chat[];
        setChats(parsedChats);
    }
    useEffect (() => {
        getChats();
    }, [chats]);
    const handleRemoveChat = (name: string) => {
        if (store.state.currentChat === name) {
            store.setCurrentChat("");
        }
        localStorage.setItem("chats", JSON.stringify([...JSON.parse(localStorage.getItem("chats") || "[]").filter((chat: chat) => chat.name !== name)]));
    }
    const store = useContext(Context);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0.5rem",
            }}
        >
            {chats &&
                chats.length > 0 &&
                chats.map((chat, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            padding: "0.5rem",
                            marginBottom: "0.5rem",
                            borderRadius: "0.3rem",
                            cursor: "pointer",
                            backgroundColor:
                                store.state.currentChat === chat.name
                                    ? "#ffffff"
                                    : "rgba(255,255,255,0.3)",
                            "&:hover": {
                                backgroundColor: store.state.currentChat === chat.name
                                    ? "#ffffff"
                                    : "rgba(255,255,255,0.5)",
                            },
                            transition: "background-color 0.2s ease-in-out",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                        onClick={() => {
                            store.setCurrentChat(chat.name);
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "var(--color-primary)",
                            }}
                        >
                            {chat.name}
                        </Typography>
                        <IconButton onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveChat(chat.name)
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
        </Box>
    );
});

export default ChatsList;
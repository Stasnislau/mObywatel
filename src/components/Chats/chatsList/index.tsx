import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { Context } from "../../../App";
import { chat } from "../../../types";

const ContextList = observer(({ chats }: {
    chats: chat[]; 
}) => {
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
                    </Box>
                ))}
        </Box>
    );
});

export default ContextList;
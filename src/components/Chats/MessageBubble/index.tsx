import { Box, Typography } from "@mui/material";
import { message } from "../../../types";


interface MessageBubbleProps {
    text: string;
    isMine: boolean;
}

const MessageBubble = ({ text, isMine }: MessageBubbleProps) => {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isMine ? "row-reverse" : "row",
                alignItems: "flex-start",
                margin: "0.5rem 0",
                width: "100%",
                wordBreak: "break-word",
            }}
            component="div"
            className="message-bubble"
        >
            <Box
                sx={{
                    backgroundColor: isMine ? "#a8daee" : "#FFFFFF",
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
                    maxWidth: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMine ? "flex-end" : "flex-start",
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {isMine ? "Ja" : "Chatbot"}
                </Typography>
                <Typography variant="body1">{text}</Typography>
            </Box>

        </Box>
    );
};

export default MessageBubble;
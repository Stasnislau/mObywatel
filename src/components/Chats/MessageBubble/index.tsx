import { Box } from "@mui/material";
import linkifyText from "../../../parsers/linkifyText";

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
        className="message"
        sx={{
          borderRadius: "1rem",
          padding: "0.5rem 1rem",
          maxWidth: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: isMine ? "flex-end" : "flex-start",
        }}
      >
        <h4>{isMine ? "Ja" : "mEkspert"}</h4>
        <p>
          {linkifyText(text)}
        </p>
      </Box>
    </Box>
  );
};

export default MessageBubble;

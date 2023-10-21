import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

interface InputBoxProps {
  onSend: () => void;
  text: string;
  setText: (text: string) => void;
}
const InputBox = observer(({ onSend, text, setText }: InputBoxProps) => {
  const handleSend = () => {
    if (text === "") {
      return;
    }
    onSend();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && text.trim() !== "") {
      handleSend();
    }
  };
  return (
    <Box
      sx={{
        width: 0.9,
      }}
    >
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Wpisz wiadomość"
        className="w-full"
        rows={2}
      />
    </Box>
  );
});

export default InputBox;

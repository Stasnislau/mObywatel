import { observer } from "mobx-react-lite";
import React from "react";
import { Send } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

interface InputBoxProps {
  onSend: () => void;
  text: string;
  setText: (text: string) => void;
  isLoading: boolean;
}
const InputBox = observer(
  ({ onSend, text, setText, isLoading }: InputBoxProps) => {
    const handleSend = () => {
      if (text === "") {
        return;
      }
      onSend();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && text.trim() !== "") {
        event.preventDefault();
        handleSend();
      }
    };
    return (
      <div className="w-full flex gap-3">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Wpisz wiadomość"
          className="w-full"
          rows={2}
        />
        <button onClick={handleSend} className="primary w-15">
          {isLoading ? (
            <CircularProgress color="secondary" size={20} />
          ) : (
            <Send />
          )}
        </button>
      </div>
    );
  }
);

export default InputBox;

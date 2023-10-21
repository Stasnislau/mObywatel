import { useContext, useEffect, useState } from "react";
import { Context } from "../../../App";
import React from "react";
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { FormControl } from "@mui/material";

interface InputBoxProps {
    onSend: () => void;
    text: string;
    setText: (text: string) => void;
}
const InputBox = observer(({ onSend, text, setText }: InputBoxProps) => {
    const store = useContext(Context);
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
        <Box sx={{
            width: 0.9,
        }}>

            <FormControl
                fullWidth
                sx={{
                    "&.MuiFormControl-root": {
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        width: 1,
                    },
                }}
            >
                <TextField
                    fullWidth
                    maxRows={2}
                    multiline
                    placeholder="Wpisz wiadomość"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSend}>
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
        </Box>
    );
});

export default InputBox;
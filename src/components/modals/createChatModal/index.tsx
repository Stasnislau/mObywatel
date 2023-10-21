import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";
import { Context } from "../../../App";

interface CreateChatModalProps {
    open: boolean;
    onClose: () => void;
}
const CreateChatModal = observer(({ open, onClose }: CreateChatModalProps) => {
    const store = useContext(Context);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const isChatNameUnique = (name: string) => {
        const chats = localStorage.getItem("chats");
        const parsedChats = chats ? JSON.parse(chats) : [];
        const isUnique = parsedChats.find((chat: { name: string; }) => chat.name === name);
        return isUnique;
    }

    const onSubmit = () => {
        setError("");
        if (name.trim() === "") {
            setError("Nazwa nie może być pusta");
            return;
        }
        if (isChatNameUnique(name)) {
            setError("Nazwa jest zajęta");
            return;
        }
        localStorage.setItem("chats", JSON.stringify([...JSON.parse(localStorage.getItem("chats") || "[]"), { name, messages: [] }]));
        store.setCurrentChat(name);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Dodaj Czat</DialogTitle>
            <DialogContent>
                <form onSubmit={
                    (event) => {
                        event.preventDefault();
                    }
                }>
                    <TextField
                        label="Nazwa czatu"
                        value={name}
                        onChange={
                            (event) => setName(event.target.value)
                        }
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
                        Dodaj
                    </Button>

                    <Typography color="error">{error}</Typography>
                </form>
            </DialogContent>
        </Dialog >
    );
});

export default CreateChatModal;
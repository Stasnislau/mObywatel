import { useState, useEffect, useContext } from 'react';
import { List, Box } from '@mui/material';
import { chat, message } from '../../../types';
import InputBox from '../inputBox';
import { Context } from '../../../App';
import { observer } from 'mobx-react-lite';
import MessageBubble from '../MessageBubble';

const ChatComponent = observer(() => {
    const store = useContext(Context);
    const [messages, setMessages] = useState<message[]>([] as message[]);
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState<chat>({} as chat);
    useEffect(() => {
        const chats = localStorage.getItem("chats");
        const parsedChats = chats ? JSON.parse(chats) as chat[] : [] as chat[];
        const currentChat = parsedChats.find((chat: chat) => chat.name === store.state.currentChat);
        if (!currentChat) return;
        setCurrentChat(currentChat);
        setMessages(currentChat.messages);
    }, [store.state.currentChat]);
    const handleSend = () => {
        setMessages([...messages, {
            text: newMessage,
            owner: 'user',
        }]);
        setNewMessage('');
        setCurrentChat({
            ...currentChat,
            messages: [...currentChat.messages, {
                text: newMessage,
                owner: 'user',
            }]
        });
        localStorage.setItem("chats", JSON.stringify([...JSON.parse(localStorage.getItem("chats") || "[]").filter((chat: chat) => chat.name !== currentChat.name), currentChat]));

    };

    return (
        <Box sx={
            {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: '1rem 0',
                width: 1,
            }
        }>
            <Box sx={
                {
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    height: 0,
                    overflowY: 'auto',
                    flexGrow: 1,

                }
            }>
                <List sx={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        minHeight: 0,
                        width: 0.75,
                    }
                }>
                    {messages.map((message, index) => (
                        <MessageBubble text={message.text} isMine={
                            message.owner === 'user'
                        } key={index} />
                    ))}
                </List>
            </Box>
            <Box sx={{
                width: 1,
                display: 'flex',
                justifyContent: 'center',

            }}>
                <InputBox onSend={handleSend} text={newMessage} setText={setNewMessage} />
            </Box>
        </Box >
    );
});

export default ChatComponent;
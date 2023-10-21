import { useState, useEffect, useContext } from 'react';
import { List, Box } from '@mui/material';
import { chat, message } from '../../../types';
import InputBox from '../inputBox';
import { Context } from '../../../App';
import { observer } from 'mobx-react-lite';
import MessageBubble from '../MessageBubble';
import React from 'react';

const ChatComponent = observer(() => {
    const store = useContext(Context);
    const [messages, setMessages] = useState<message[]>([] as message[]);
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        const chat = localStorage.getItem("chat");
        const parsedChat = chat ? JSON.parse(chat) as chat : {} as chat;
        setChat(parsedChat);
        setMessages(parsedChat.messages);
    }, [store.state.shouldUpdateChat]);
    const [chat, setChat] = useState<chat>({} as chat);
    const sendMessageToServer = async () => {
        try {
            if (!messages || messages.length === 0) {
                return;
            }
            store.setIsLoading(true);
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: messages }),
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            if (!data || !data.completion || data.completion.choices.length === 0 || !data.completion.choices[0].message) {
                console.log('Something went wrong, no message')
                return;
            }
            setMessages([...messages, {
                content: data.completion.choices[0].message.content,
                role: data.completion.choices[0].message.role,
            }]);
            localStorage.setItem('chat', JSON.stringify({
                ...chat,
                messages: [...chat.messages, {
                    content: data.completion.choices[0].message.content,
                    role: data.completion.choices[0].message.role,
                }]
            }));

        } catch (error) {
            console.log(error);
        }
        finally {
            store.setIsLoading(false);
        }
    }
    const handleSend = async () => {
        setMessages([...messages, {
            content: newMessage,
            role: 'user',
        }]);
        setNewMessage('');
        setChat({
            ...chat,
            messages: [...chat.messages, {
                content: newMessage,
                role: 'user',
            }]
        });
        localStorage.setItem('chat', JSON.stringify({
            ...chat,
            messages: [...chat.messages, {
                content: newMessage,
                role: 'user',
            }]
        }));
        store.setShouldUpdateChat(true);
        await sendMessageToServer();
    }




    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);
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
                        width: 0.9,
                    }
                }>
                    {messages && messages.length > 0 && messages.map((message, index) => (
                        <MessageBubble text={message.content} isMine={
                            message.role === 'user'
                        } key={index} />
                    ))}
                    <div ref={messagesEndRef} />
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
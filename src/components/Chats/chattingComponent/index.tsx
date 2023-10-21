import { useState, useEffect, useContext, useMemo } from 'react';
import { List, Box } from '@mui/material';
import { chat, message } from '../../../types';
import InputBox from '../inputBox';
import { Context } from '../../../App';
import { observer } from 'mobx-react-lite';
import MessageBubble from '../MessageBubble';
import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import useStateLS from '../../../hooks/useStateLS';

const ChatComponent = observer(() => {
    const store = useContext(Context);
    const [messagesAnimationRef] = useAutoAnimate<HTMLDivElement>();
    const [newMessage, setNewMessage] = useState('');
    const [chat, setChat] = useStateLS<chat>('chat', {
        messages: [],
    });


    const sendMessageToServer = async () => {
        try {
            if (!chat.messages || chat.messages.length === 0) {
                return;
            }
            store.setIsLoading(true);
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: chat.messages }),
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            if (!data || !data.completion || data.completion.choices.length === 0 || !data.completion.choices[0].message) {
                console.log('Something went wrong, no message')
                return;
            }
            setChat({
                ...chat,
                messages: [...chat.messages, {
                    content: data.completion.choices[0].message.content,
                    role: data.completion.choices[0].message.role,
                }]
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            store.setIsLoading(false);
        }
    }

    const isNewUserMessage = useMemo(() => {
        if (!chat.messages || chat.messages.length === 0) {
            return false;
        }
        return chat.messages[chat.messages.length - 1].role === 'user';
    }, [chat.messages]);

    useEffect(() => {
        if (isNewUserMessage) {
            sendMessageToServer();
        }
    }, [isNewUserMessage]);

    const handleSend = async () => {
        console.log('handleSend')
        setChat({
            ...chat,
            messages: [...chat.messages, {
                content: newMessage,
                role: 'user',
            }]
        });
        setNewMessage('');
    }

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: 'nearest',
        });
    }, [chat.messages]);

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
                <Box sx={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        minHeight: 0,
                        width: 0.9,
                    }
                }
                    ref={messagesAnimationRef}
                >
                    {chat && chat.messages && chat.messages.length > 0 && chat.messages.map((message, index) => (
                        <MessageBubble text={message.content} isMine={
                            message.role === 'user'
                        } key={index} />
                    ))}
                    <div ref={messagesEndRef} />
                </Box>
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
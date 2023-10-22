import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import useStateLS from '../../../hooks/useStateLS';
import { chat } from '../../../types';
import MessageBubble from '../MessageBubble';
import InputBox from '../inputBox';

const ChatComponent = observer(() => {
  const [messagesAnimationRef] = useAutoAnimate<HTMLDivElement>();
  const [newMessage, setNewMessage] = useState("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [sendAutoMessage, setSendAutoMessage] = useState(false);
  const [chat, setChat] = useStateLS<chat>("chat", {
    messages: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageToServer = async () => {
    try {
      if (!chat.messages || chat.messages.length === 0) {
        return;
      }
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chat.messages }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      if (
        !data ||
        !data.completion ||
        data.completion.choices.length === 0 ||
        !data.completion.choices[0].message
      ) {
        console.log("Something went wrong, no message");
        return;
      }
      setChat({
        ...chat,
        messages: [
          ...chat.messages,
          {
            content: data.completion.choices[0].message.content,
            role: data.completion.choices[0].message.role,
          },
        ],
      });
      setSuggestion(data.completion.choices[0].message.suggestion);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isNewUserMessage = useMemo(() => {
    if (!chat.messages || chat.messages.length === 0) {
      return false;
    }
    return chat.messages[chat.messages.length - 1].role === "user";
  }, [chat.messages]);

  useEffect(() => {
    if (isNewUserMessage) {
      sendMessageToServer();
    }
  }, [isNewUserMessage]);

  useEffect(() => {
    if (sendAutoMessage) {
      handleSend();
      setSendAutoMessage(false);
    }
  }, [sendAutoMessage]);

  const handleSend = async () => {
    setChat({
      ...chat,
      messages: [
        ...chat.messages,
        {
          content: newMessage,
          role: "user",
        },
      ],
    });
    setSuggestion("");
    setNewMessage("");
  };

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chat.messages]);

  return (
    <Box className="h-[90vh]">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
          overflowY: "auto",
          height: "75vh",
          position: "relative",
        }}
        ref={messagesAnimationRef}
      >
        {chat &&
          chat.messages &&
          chat.messages.length > 0 &&
          chat.messages.map((message, index) => (
            <MessageBubble
              text={message.content}
              isMine={message.role === "user"}
              key={index}
            />
          ))}
        <div className="messages-shadow" />
        <button
          className="secondary tiny mb-2"
          style={{
            display: !suggestion || suggestion.length > 120 || !suggestion.includes('?') ? "none" : "flex",
          }}
          onClick={() => {
            setNewMessage(suggestion);
            setSendAutoMessage(true);
          }}
        >
          {suggestion}
        </button>
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          height: "15vh",
        }}
      >
        <InputBox
          isLoading={isLoading}
          onSend={handleSend}
          text={newMessage}
          setText={setNewMessage}
        />
      </Box>
    </Box >
  );
});

export default ChatComponent;

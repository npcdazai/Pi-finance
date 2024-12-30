import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FiMaximize2 } from "react-icons/fi";
import avtar from "../../../public/images/logo/logo.png";
import { AppContext } from "../../context/AppContext";

const ChatBot = () => {
    const {
        showChatbot,
        setShowChatbot,
        isMaximized,
        setIsMaximized,
        messages,
        setMessages,
        userMessage,
        setUserMessage,
        handleSendMessage,
    } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessageWithDelay = () => {
        handleSendMessage();
        setIsLoading(true);

        setTimeout(() => {
            // Simulate bot response
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Let me think..." },
            ]);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <Box>
            <Box
                onClick={() => setShowChatbot(!showChatbot)}
                sx={{
                    background: 'linear-gradient(90deg, #ADC5EA, #8BBCE8, #C8CDCE)',
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 16px',
                    borderRadius: '45px',
                    width: '100px',
                    height: '70px',
                    cursor: 'pointer',
                    zIndex: 1
                }}
            >
                {showChatbot ? (
                    <>
                        <CloseIcon />
                        <Typography variant="h6" color="#101828" fontWeight={600} sx={{ marginRight: '8px' }}>
                            Close
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" color="#101828" fontWeight={600} sx={{ marginRight: '8px' }}>
                            Ask
                        </Typography>
                        <Avatar src={avtar} alt="Avatar" sx={{ height: '32px', width: '32px', borderRadius: '50%' }} />
                    </>
                )}
            </Box>

            {/* Chatbot Panel */}
            {showChatbot && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 111,
                        right: 30,
                        width: isMaximized ? "1280px" : 400,
                        height: isMaximized ? "clamp(400px, 50vh, 500px)" : "clamp(200px, 50vh, 282px)",
                        transition: "height 0.3s ease",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#d0cee5fa",
                        display: "flex",
                        zIndex: 2,
                        flexDirection: "column",
                        px: 2,
                    }}
                >
                    {/* Chat Header */}
                    <Box
                        sx={{
                            backgroundColor: "#D0CEE5",
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "#101828", fontWeight: 600 }}>
                            Ask Pi
                        </Typography>
                        <IconButton onClick={() => setIsMaximized(!isMaximized)} size="small" sx={{ color: "#101828" }}>
                            <FiMaximize2 />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <List
                        sx={{
                            flex: 1,
                            padding: "16px",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            border: "1px solid #0000001A",
                            borderRadius: "16px",
                            position: "relative",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        padding: "10px 16px",
                                        borderRadius: "12px",
                                        backgroundColor: msg.sender === "user" ? "#000000" : "#D0CEE5CC",
                                        color: msg.sender === "user" ? "#fff" : "#000",
                                        border: msg.sender === "user" ? "none" : "1px solid #0000001A",
                                    }}
                                    primary={msg.text}
                                />
                            </ListItem>
                        ))}
                        {/* Show "typing" message if bot is processing */}
                        {isLoading && (
                            <ListItem sx={{ display: "flex", justifyContent: "flex-start" }}>
                                <ListItemText
                                    sx={{
                                        padding: "10px 16px",
                                        borderRadius: "12px",
                                        backgroundColor: "#D0CEE5CC",
                                        color: "#000",
                                        border: "1px solid #0000001A",
                                    }}
                                    primary="Bot is typing..."
                                />
                            </ListItem>
                        )}
                        <div ref={messagesEndRef} />
                    </List>

                    {/* Input Field */}
                    <Box sx={{ padding: "16px", display: "flex", gap: "8px" }}>
                        <TextField
                            fullWidth
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Ask anything related to money..."
                            sx={{ backgroundColor: "#D2D1E6", borderRadius: "8px", zIndex: 1, }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessageWithDelay(); // Call the new function with delay
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSendMessageWithDelay} // Call the new function with delay
                            sx={{
                                backgroundColor: "#000000",
                                width: "58px",
                                height: "58px",
                                borderRadius: "50%",
                            }}
                        >
                            <ArrowForwardIcon />
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChatBot;

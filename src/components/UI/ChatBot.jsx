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
    Fade,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FiMaximize2 } from "react-icons/fi";
import avtar from "../../../public/images/logo/piLogo.png";
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

    const [isLoading, setIsLoading] = useState(false); // Tracks whether the bot is processing
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        if (showChatbot && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showChatbot]);

    const simulateBotResponse = async () => {
        // Simulate a delay (but no response is provided)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(""); // Empty response simulating no further message after analyzing
            }, 3000); // Simulate 3 seconds delay for response
        });
    };

    const handleSendMessageWithDelay = async () => {
        handleSendMessage();
        setIsLoading(true);

        // Add the "Analyzing..." message
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "Analyzing..." },
        ]);

        // Simulate or fetch the bot's response (but in this case, it doesn't return anything)
        await simulateBotResponse();

        setIsLoading(false); // Analysis complete, stop loading
    };

    const formatBotResponse = (text) => {
        // Remove all occurrences of ### markers and the content in between
        const cleanText = text.replace(/###.*?###/g, '');
    
        // Split text into parts for bold formatting
        const parts = cleanText.split(/(\*\*.*?\*\*)/g);
    
        return (
            <Typography
                variant="body1"
                sx={{
                    whiteSpace: "pre-line",
                    wordBreak: "break-word",
                    marginBottom: "10px",
                }}
            >
                {parts.map((part, index) => {
                    // If the part is bold (wrapped with **), render it in <strong>
                    if (/^\*\*(.*?)\*\*$/.test(part)) {
                        return (
                            <strong key={index}>
                                {part.slice(2, -2)}
                            </strong>
                        );
                    }
                    return part;
                })}
            </Typography>
        );
    };

    return (
        <Box>
            <Box
                onClick={() => setShowChatbot(!showChatbot)}
                sx={{
                    background: "linear-gradient(90deg, #adc5ea, #8bbce8, #c8cdce)",
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "45px",
                    width: "100px",
                    height: "70px",
                    cursor: "pointer",
                    zIndex: 10,
                }}
            >
                {showChatbot ? (
                    <>
                        <CloseIcon />
                        <Typography variant="h6" color="#101828" fontWeight={600} sx={{ ml: 1 }}>
                            Close
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" color="#101828" fontWeight={600} sx={{ mr: 1 }}>
                            Ask
                        </Typography>
                        <Avatar src={avtar} alt="Avatar" sx={{ height: 32, width: 32 }} />
                    </>
                )}
            </Box>

            {showChatbot && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 111,
                        right: 30,
                        width: isMaximized ? "600px" : "500px",
                        height: isMaximized ? "430px" : "300px",
                        transition: "height 0.3s ease, width 0.3s ease",
                        borderRadius: "16px",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 4,
                        "@media (max-width: 600px)": {
                            width: "80%",
                            height: "50vh",
                            bottom: 80,
                        },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#adc5ea",
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "#101828", fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                            Ask <Avatar src={avtar} alt="Avatar" sx={{ height: 32, width: 32 }} />
                        </Typography>
                        <IconButton onClick={() => setIsMaximized(!isMaximized)} size="small">
                            <FiMaximize2 />
                        </IconButton>
                    </Box>

                    <List
                        sx={{
                            flex: 1,
                            padding: "16px",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
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
                                        backgroundColor: msg.sender === "user" ? "#000" : "#f1f1f1",
                                        color: msg.sender === "user" ? "#fff" : "#000",
                                    }}
                                    primary={
                                        msg.sender === "bot" ? (
                                            formatBotResponse(msg.text)
                                        ) : (
                                            msg.text
                                        )
                                    }
                                />
                            </ListItem>
                        ))}
                        {isLoading && (
                            <Fade in timeout={1000}>
                                <ListItem sx={{ display: "flex", justifyContent: "flex-start" }}>
                                    <ListItemText
                                        sx={{
                                            padding: "10px 16px",
                                            borderRadius: "12px",
                                            backgroundColor: "#f1f1f1",
                                            color: "#000",
                                        }}
                                        primary="Analyzing..."
                                    />
                                </ListItem>
                            </Fade>
                        )}
                        <div ref={messagesEndRef} />
                    </List>

                    <Box sx={{ padding: "16px", display: "flex", gap: "8px" }}>
                        <TextField
                            fullWidth
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Ask anything related to money..."
                            sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSendMessageWithDelay();
                            }}
                            inputRef={inputRef}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSendMessageWithDelay}
                            sx={{
                                backgroundColor: "#000",
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

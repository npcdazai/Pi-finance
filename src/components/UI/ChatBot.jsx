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

    const [isLoading, setIsLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
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
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Analyzing..." },
            ]);
            setFadeOut(true);

            setTimeout(() => {
                setFadeOut(false);
                setMessages((prevMessages) =>
                    prevMessages.filter((msg) => msg.text !== "Analyzing...")
                );
                setIsLoading(false);
            }, 2000);
        }, 1000);
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
                        width: isMaximized ? "600px" : "400px", // Default size for PC
                        height: isMaximized ? "500px" : "300px", // Default size for PC
                        transition: "height 0.3s ease, width 0.3s ease",
                        borderRadius: "16px",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 4,
                        "@media (max-width: 600px)": {
                            width: "80%", // Ensure chatbot is 80% of the width on mobile
                            height: "60vh", // Ensure height is 60vh on mobile
                            bottom: 80, // Adjust bottom position on smaller screens
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
                        <Typography variant="h6" sx={{ color: "#101828", fontWeight: 600 }}>
                            Ask Pi
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
                                    primary={msg.text}
                                />
                            </ListItem>
                        ))}
                        {isLoading && (
                            <Fade in={!fadeOut} timeout={1000}>
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
    
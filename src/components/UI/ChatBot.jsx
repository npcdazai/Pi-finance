import React, { useState } from "react";
import {
    Box,
    IconButton,
    TextField,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import avtar from "../../../public/images/logo/logo.png"

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! How can I help you today?", sender: "bot" },
    ]);
    const [userMessage, setUserMessage] = useState("");

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessages = [
            ...messages,
            { text: userMessage, sender: "user" },
        ];
        setMessages(newMessages);
        setUserMessage("");

        // Simulate bot response after a delay
        setTimeout(() => {
            setMessages([
                ...newMessages,
                { text: "I'm still learning to respond!", sender: "bot" },
            ]);
        }, 1000);
    };

    return (
        <Box>
            {/* Chatbot toggler */}

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
                }}
            >

                {showChatbot ? <CloseIcon /> :
                    <>
                        <Typography
                            variant="h6"
                            color="#101828"
                            fontWeight={600}
                            sx={{ marginRight: '8px' }}
                        >
                            Ask
                        </Typography>
                        <Box
                            component="img"
                            src={avtar}
                            alt="Avatar"
                            sx={{
                                height: '32px',
                                width: '32px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    </>
                }

            </Box>
            {showChatbot && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 90,
                        right: 30,
                        width: 400,
                        height: 500,
                        background: "#D0CEE5CC",
                        borderRadius: 2,
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "#D0CEE5CC",
                            color: "white",
                            textAlign: "center",
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        }}
                    >
                        <Typography variant="h6">Chatbot</Typography>
                    </Box>

                    {/* Chat messages */}
                    <List
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: 2,
                            bgcolor: "#D0CEE5CC",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        bgcolor: msg.sender === "user" ? "#724ae8" : "#f2f2f2",
                                        color: msg.sender === "user" ? "white" : "black",
                                        p: 1.5,
                                        borderRadius: 2,
                                        maxWidth: "70%",
                                    }}
                                    primary={msg.text}
                                />
                            </ListItem>
                        ))}
                    </List>

                    {/* Input */}
                    <Box
                        sx={{
                            p: 2,
                            borderTop: "1px solid #ddd",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            fullWidth
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Enter a message..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            sx={{ mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSendMessage}
                            sx={{ bgcolor: "#724ae8", "&:hover": { bgcolor: "#5a3abc" } }}
                        >
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChatBot;

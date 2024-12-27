import React, { useState } from "react";
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

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! How can I help you today?", sender: "bot" },
    ]);
    const [userMessage, setUserMessage] = useState("");
    const [conversationId, setConversationId] = useState(""); // To store the conversation ID from the backend
    const [token, setToken] = useState(null); // To store the token

    // Function to fetch token
    const getToken = async () => {
        if (token) return token; // Reuse token if already fetched

        const requestBody = {
            hr_id: "E001", // Replace with actual ID if dynamic
            user_info: {
                first_name: "ABC",
                last_name: "PQR",
            },
        };

        try {
            const response = await fetch("https://staging.getpi.in/backend/v1/hrms/hr/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok && data?.data?.data?.token) {
                setToken(data.data.data.token); // Store the token
                return data.data.data.token;
            } else {
                console.error("Failed to fetch token:", data?.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching token:", error);
            return null;
        }
    };

    // Function to send user message and fetch bot response
    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        // Update messages with user's input
        const newMessages = [...messages, { text: userMessage, sender: "user" }];
        setMessages(newMessages);

        // Prepare request payload
        const payload = {
            chats: messages.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
            })),
            new_message: { role: "user", content: userMessage },
            conversation_id: conversationId,
        };

        setUserMessage(""); // Clear input field

        try {
            // Fetch the token
            const token = await getToken();
            if (!token) {
                console.error("Unable to fetch token");
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Sorry, something went wrong. Please try again.", sender: "bot" },
                ]);
                return;
            }

            // Send message to chatbot API
            const response = await fetch("https://staging.getpi.in/backend/v1/router/llm/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                setConversationId(data.data.conversation_id); // Update conversation ID
                const botMessage = data.data.new_message;
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botMessage.content, sender: "bot" },
                ]);
            } else {
                console.error("Error from backend:", data.message);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Sorry, something went wrong. Please try again.", sender: "bot" },
                ]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Network error. Please check your connection and try again.", sender: "bot" },
            ]);
        }
    };

    const vh = window.innerHeight;
    const result = 711 - (0.8 * vh - 200);

    return (
        <Box>
            {/* Chatbot Toggle Button */}
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
                        height: isMaximized ? result : "282px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#d0cee5fa",
                        display: "flex",
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
                    </List>

                    {/* Input Field */}
                    <Box sx={{ padding: "16px", display: "flex", gap: "8px" }}>
                        <TextField
                            fullWidth
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Ask anything related to money..."
                            sx={{ backgroundColor: "#D2D1E6", borderRadius: "8px" }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSendMessage}
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

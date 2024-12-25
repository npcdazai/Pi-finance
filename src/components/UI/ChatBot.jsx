import React, { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import MaximizeIcon from "@mui/icons-material/Maximize";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import avtar from "../../../public/images/logo/logo.png"

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! How can I help you today?", sender: "bot" },
    ]);
    const [userMessage, setUserMessage] = useState("");

    const handleSendMessage = () => {
        if (!userMessage.trim()) return;

        const newMessages = [
            ...messages,
            { text: userMessage, sender: "user" },
        ];
        setMessages(newMessages);
        setUserMessage("");

        setTimeout(() => {
            setMessages([...
                newMessages,
            { text: "I'm still learning to respond!", sender: "bot" },
            ]);
        }, 1000);
    };

    return (
        <Box>
            {/* Chatbot Toggle Button */}
            {/* <Box
                onClick={() => setShowChatbot(!showChatbot)}
                sx={{
                    background: "linear-gradient(90deg, #ADC5EA, #8BBCE8, #C8CDCE)",
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    borderRadius: "24px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                }}
            >
                {showChatbot ? (
                    <CloseIcon />
                ) : (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        <Avatar
                            sx={{ width: 32, height: 32 }}
                            src="/path/to/avatar.png"
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 500, color: "#101828" }}
                        >
                            Ask
                        </Typography>
                    </Box>
                )}
            </Box> */}

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

                {showChatbot ?
                    <>
                        <CloseIcon />
                        <Typography
                            variant="h6"
                            color="#101828"
                            fontWeight={600}
                            sx={{ marginRight: '8px' }}
                        >
                            Close
                        </Typography>
                    </>
                    :
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

            {/* Chatbot Panel */}
            {showChatbot && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 111,
                        right: 30,
                        width: 400,
                        height: isMaximized ? "80vh" : "282px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#F4F5F7",
                        display: "flex",
                        flexDirection: "column",
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
                        <Typography
                            variant="h6"
                            sx={{ color: "#101828", fontWeight: 600 }}
                        >
                            Ask Pi
                        </Typography>
                        <IconButton
                            onClick={() => setIsMaximized(!isMaximized)}
                            size="small"
                            sx={{ color: "#101828" }}
                        >
                            <MaximizeIcon />
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
                        }}
                    >
                        {messages.map((msg, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        msg.sender === "user"
                                            ? "flex-end"
                                            : "flex-start",
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        padding: "10px 16px",
                                        borderRadius: "12px",
                                        backgroundColor:
                                            msg.sender === "user"
                                                ? "#724AE8"
                                                : "#E4E7EB",
                                        color:
                                            msg.sender === "user"
                                                ? "white"
                                                : "#101828",
                                    }}
                                    primary={msg.text}
                                />
                            </ListItem>
                        ))}
                    </List>

                    {/* Input Field */}
                    <Box
                        sx={{
                            padding: "16px",
                            display: "flex",
                            gap: "8px",
                        }}
                    >
                        <TextField
                            fullWidth
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Ask anything related to money..."
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                            }}
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
                                backgroundColor: "#724AE8",
                                "&:hover": {
                                    backgroundColor: "#5a3abc",
                                },
                            }}
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

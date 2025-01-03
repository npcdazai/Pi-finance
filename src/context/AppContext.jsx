import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userDatas, setUserData] = useState(null);
    const [userTax, setUserTax] = useState([])
    const [isError, setIsError] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! How can I help you today?", sender: "bot" },
    ]);
    const [userMessage, setUserMessage] = useState("");
    const [conversationId, setConversationId] = useState("");
    const [token, setToken] = useState(null);
    const [getusers, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(true)

    // Fetch token function
    const getToken = async () => {
        if (token) return token;

        const requestBody = {
            hr_id: "E001",
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
                setToken(data.data.data.token);
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

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessages = [...messages, { text: userMessage, sender: "user" }];
        setMessages(newMessages);

        const payload = {
            chats: messages.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
            })),
            new_message: { role: "user", content: userMessage },
            conversation_id: conversationId,
        };

        setUserMessage("");

        try {
            const token = await getToken();
            if (!token) {
                console.error("Unable to fetch token");
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Sorry, something went wrong. Please try again.", sender: "bot" },
                ]);
                return;
            }

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
                setConversationId(data.data.conversation_id);
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

    const apihost = "https://staging.getpi.in/backend/v1/hrms/hr/";

    const getUser = async (id) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await axios.get(`${apihost}/users/${id}`);


            if (response.status === 200) {
                const mappedData = response.data.data.map(item => item.userData)
                const mappedTaxData = response.data.data.map(item => item.userTax)
                setUserData(mappedData)
                setUserTax(mappedTaxData)
            }

        } catch (err) {
            console.error("Error fetching user data:", err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getUsers = async () => {
        try {
            const response = await axios.get("https://staging.getpi.in/backend/v1/hrms/hr/user_list");
            const res = response?.status === 200 ? response.data.data.user_data : undefined;
            res ? console.log(res) : console.error('error');
            setUsers(res);
        } catch (er) {
            console.error(er);
        } finally {
            setUserLoading(false);
        }
    }


    useEffect(() => {
        getUser(selectedEmployee?.employee_id);
        getUsers();
    }, [selectedEmployee?.employee_id]);

    const updateEmployeeDetails = (updatedDetails) => {
        setSelectedEmployee((prev) => ({
            ...prev,
            ...updatedDetails,
        }));
    };

    // console.log("____________",users,"_________________")

    return (
        <AppContext.Provider value={{
            userDatas, isLoading, isError, selectedEmployee,
            setSelectedEmployee, updateEmployeeDetails, showChatbot,
            setShowChatbot,
            isMaximized,
            setIsMaximized,
            messages,
            setMessages,
            userMessage,
            setUserMessage,
            handleSendMessage,
            getusers,
        }}>
            {children}
        </AppContext.Provider>
    );
};

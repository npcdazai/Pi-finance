import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userDatas, setUserData] = useState(null); // Default to null for initial state
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const apihost = "https://staging.getpi.in/backend/v1/hrms/hr";

    const getUser = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await axios.get(`${apihost}/users/E001`);
            setUserData(response.data);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    

    return (
        <AppContext.Provider value={{ userDatas, isLoading, isError }}>
            {children}
        </AppContext.Provider>
    );
};

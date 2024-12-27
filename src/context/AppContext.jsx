import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userDatas, setUserData] = useState(null);
    const [userTax, setUserTax] = useState([])
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const apihost = "https://staging.getpi.in/backend/v1/hrms/hr";

    const getUser = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await axios.get(`${apihost}/users/E001`);


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

    useEffect(() => {
        getUser();
    }, []);


    console

    return (
        <AppContext.Provider value={{ userDatas, isLoading, isError }}>
            {children}
        </AppContext.Provider>
    );
};

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userDatas, setUserData] = useState(null);
  const [userTax, setUserTax] = useState([]);
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
  const [userLoading, setUserLoading] = useState(true);
  const [getAllData, setAllData] = useState([]);
  const [grossSalary, setGrossSalary] = useState(null);
  const [salaryScore, setSalaryScore] = useState(null);
  const [taxDetails, setTaxDetails] = useState(null);
  const [taxScorePercentage, setTaxScorePercentage] = useState(0);
  const [grossSalaryInput, setGrossSalaryInput] = useState("");
  const [updatedSalaryData, setUpdatedSalaryData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const resetChatbotState = () => {
    setMessages([{ text: "Hi there! How can I help you today?", sender: "bot" }]);
    setConversationId("");
    setUserMessage("");
  };


  const getToken = async () => {
    if (token) return token;
  
    if (!selectedEmployee || !selectedEmployee.employee_id) {
      console.error("No employee selected. Cannot fetch token.");
      return null;
    }
  
    const requestBody = {
      hr_id: selectedEmployee.employee_id, // Use the current selected employee ID
      user_info: {
        first_name: selectedEmployee.first_name || "ABC", // Use employee's first name, or a default
        last_name: selectedEmployee.last_name || "PQR",   // Use employee's last name, or a default
      },
    };
  
    try {
      const response = await fetch(
        "https://staging.getpi.in/backend/v1/hrms/hr/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
  
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
          {
            text: "Sorry, something went wrong. Please try again.",
            sender: "bot",
          },
        ]);
        return;
      }

      const response = await fetch(
        "https://staging.getpi.in/backend/v1/router/llm/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            source: "hr",
          },
          body: JSON.stringify(payload),
        }
      );

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
          {
            text: "Sorry, something went wrong. Please try again.",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Network error. Please check your connection and try again.",
          sender: "bot",
        },
      ]);
    }
  };

  const apihost = "https://staging.getpi.in/backend/v1/hrms/hr/";


  const getUser = async (id) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(`${apihost}/users/${id}`);

      if (response.status === 200 && response.data?.data) {
        const { data } = response.data;

        const mappedData = data.map((item) => item?.userData || {});
        const mappedTaxData = data.map((item) => item?.userTax || {});

        setAllData(response.data);
        setUserData(mappedData);
        setUserTax(mappedTaxData);
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
      const response = await axios.get(
        "https://staging.getpi.in/backend/v1/hrms/hr/user_list"
      );
      const res =
        response?.status === 200 ? response.data.data.user_data : undefined;
      res ? console.log(res) : console.error("error");
      setUsers(res);
    } catch (er) {
      console.error(er);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getUser(selectedEmployee?.employee_id);
    getUsers();
  }, [selectedEmployee?.employee_id, updatedSalaryData]);

  const updateEmployeeDetails = (updatedDetails) => {
    setSelectedEmployee((prev) => ({
      ...prev,
      ...updatedDetails,
    }));
  };

  const handleSave = async () => {
    if (!grossSalaryInput) {
      alert("Please enter a gross salary");
      return;
    }

    try {
      const response = await axios.put(
        `https://staging.getpi.in/backend/v1/hrms/hr/user/salary/${selectedEmployee.employee_id}`,
        {
          gross_salary: grossSalaryInput, 
        }
      );

      if (response.status === 200) {
        alert("Salary data updated successfully");
        setUpdatedSalaryData(response.data.data);
        fetchSalaryData();
        setRefreshTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error updating salary:", error);
      alert("Failed to update salary data");
    }
  };

  const fetchSalaryData = async () => {
    try {
      // Fetch user data (salary and tax-related details)
      const userDataResponse = await fetch(
        `https://staging.getpi.in/backend/v1/hrms/hr/users/${selectedEmployee.employee_id}`
      );
      const userDataResult = await userDataResponse.json();

      if (userDataResult.status_code === 200) {
        const userData = userDataResult.data[0];

        // Fetch gross salary
        const grossSalaryResponse = await fetch(
          "https://staging.getpi.in/backend/v1/hrms/hr/users/fetch/gross_annual_salary/" +
            selectedEmployee.employee_id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ year: userData.userTax[3].fy }),
          }
        );

        console.error(userData.userTax[3].fy);

        const grossSalaryResult = await grossSalaryResponse.json();

        console.warn(grossSalaryResult);

        if (grossSalaryResult.status_code === 200) {
          const fetchedGrossSalary = grossSalaryResult.data;
          setGrossSalary(fetchedGrossSalary);

          // Fetch salary score using gross salary
          const salaryScoreResponse = await fetch(
            `https://staging.getpi.in/backend/v1/hrms/tax/salary_score/${selectedEmployee.employee_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ salary: fetchedGrossSalary.toString() }),
            }
          );

          const salaryScoreResult = await salaryScoreResponse.json();
          if (salaryScoreResult.status_code === 200) {
            setSalaryScore(salaryScoreResult.data.salary_score);
          }

          // Prepare tax calculation data dynamically from userData
          const taxCalculationResponse = await fetch(
            `https://staging.getpi.in/backend/v1/hrms/tax/tax_calculation/${selectedEmployee.employee_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                totalSalary: fetchedGrossSalary,
                basicSalary: userData.userSalary[0].basic_salary,
                hra: userData.userSalary[0].hra,
                ltaAllowance: userData.userSalary[0].lta,
                foodAllowance: 0,
                rentPaid: userData.userTax[0].HRA.rent_amount_annual,
                metroCity: userData.userData.location === "Mumbai",
                homeLoanInterest:
                  userData.userTax[0].section_24b.interest_on_home_loan,
                lifeInsurance: userData.userTax[0]["80C"].life_insurance,
                elss: userData.userTax[0]["80C"].ELSS,
                providentFund: userData.userSalary[0].pf_contribution,
                taxSavingFDs: 0,
                otherTaxSavingInvestment: userData.userTax[0]["80C"].any_other_tax_saving_instrument,
                nps: userData.userTax[0]["80CCD"].NPS,
                healthInsuranceSelfSpouse:
                  userData.userTax[0]["80D"]
                    .health_insurance_for_self_and_family,
                healthInsuranceParents:
                  userData.userTax[0]["80D"].health_insurance_for_parents,
                selfOrSpouseIsSenior: false,
                seniorCitizenParents: false,
                preventiveHealthCareExpenditure: 0,
                interestPaidOnEducationLoan: userData.userTax[0]["80E"].education_loan_interest,
                interestOnHousingLoan80EE: 0,
                donations80G: userData.userTax[0]["80G"].donations,
                interestIncomeSavingsAccount: 0,
                gratuity: 0,
                medicalAllowance: 0,
              }),
            }
          );

          const taxCalculationResult = await taxCalculationResponse.json();
          console.log(taxCalculationResult?.data?.response.taxScore);

          if (taxCalculationResult.status_code === 200) {
            setTaxDetails(taxCalculationResult.data.response);
            setTaxScorePercentage(
              taxCalculationResult?.data?.response.taxScore
            );
            // Avoid division by zero
          }
        }
      }
    } catch (error) {
      console.error("Error fetching salary and tax data:", error);
    }
  };

  useEffect(() => {
    if (!selectedEmployee) return;
    setToken(null); // Clear the previous token
    getToken();
    resetChatbotState();
    fetchSalaryData();
  }, [selectedEmployee]);

  return (
    <AppContext.Provider
      value={{
        userDatas,
        isLoading,
        isError,
        selectedEmployee,
        setSelectedEmployee,
        updateEmployeeDetails,
        showChatbot,
        setShowChatbot,
        isMaximized,
        setIsMaximized,
        messages,
        setMessages,
        userMessage,
        setUserMessage,
        handleSendMessage,
        getusers,
        getAllData,
        setIsLoading,
        salaryScore,
        taxScorePercentage,
        setSalaryScore,
        setGrossSalary,
        setTaxDetails,
        grossSalary,
        setTaxScorePercentage,
        setUpdatedSalaryData,
        setGrossSalaryInput,
        grossSalaryInput,
        updatedSalaryData,
        handleSave,
        refreshTrigger,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

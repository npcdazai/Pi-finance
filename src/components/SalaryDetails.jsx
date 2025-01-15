import React, { useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SalaryTable from "./UI/SalaryTable";
import { AppContext } from "../context/AppContext";

const SalaryDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { grossSalaryInput, handleSave, setGrossSalaryInput, grossSalary } = useContext(AppContext);

  const formatToLPA = (value) => {
    if (!value || isNaN(value)) return "0 LPA";
    const roundedValue = Math.round(value / 100000); // Round off the value in LPA
    return `${roundedValue} LPA`; // Return the rounded value
  };

  // const formatToINR = (value) => {
  //   if (!value) return "";
  //   value = String(value).replace(/\D/g, ""); 
  //   return value.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"); 
  // };

  const formatToINR = (value) => {
    if (!value) return "";
    const stringValue = value.toString(); 
    return stringValue
      .replace(/\D/g, "") 
      .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"); 
  };

  const handleInputChange = (e) => {
    const inputElement = e.target;
    const rawValue = inputElement.value.replace(/,/g, ""); // Remove commas for processing
    const cursorPosition = inputElement.selectionStart; // Save cursor position
  
    // Format the value as INR
    const formattedValue = formatToINR(rawValue);
    setGrossSalaryInput(formattedValue.replace(/,/g, "")); // Update the state without commas
  
    // Restore the cursor position
    setTimeout(() => {
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };
  
  useEffect(() => {
    if (isEditing) {
      setGrossSalaryInput(grossSalary);
    }
  }, [isEditing, grossSalary, setGrossSalaryInput]);

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h5">Salary Details</Typography>
            <Typography variant="caption" sx={{ color: "#667085" }}>
              View your Salary Structure
            </Typography>
          </Box>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "grey.400",
              borderRadius: 2,
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: isEditing ? "auto" : "250px",
            }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={formatToINR(grossSalaryInput)}
                  onChange={handleInputChange}
                  style={{
                    flexGrow: 1,
                    marginRight: "8px",
                    border: "none",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    padding: "4px 8px",
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleSave(); // Save the new value
                    setIsEditing(false); // Switch back to non-editable state
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  INR {formatToLPA(grossSalary)} {/* Display LPA in non-editing mode */}
                </Typography>
                <button
                  style={{
                    padding: "4px 8px",
                    background: "transparent",
                    border: "1px solid #1976d2",
                    borderRadius: "4px",
                    color: "#1976d2",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsEditing(true)} // Set isEditing to true when "Edit" is clicked
                >
                  Edit
                </button>
              </>
            )}
          </Box>
        </Box>
        <SalaryTable numericPart={grossSalaryInput} />
      </Box>
    </div>
  );
};

export default SalaryDetails;
import React, { useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import SalaryTable from "./UI/SalaryTable";
import { AppContext } from "../context/AppContext";

const SalaryDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { grossSalaryInput, handleSave, setGrossSalaryInput, grossSalary } = useContext(AppContext);

  // Format to LPA (non-editing mode)
  const formatToLPA = (value) => {
    if (!value || isNaN(value)) return "0 LPA";
    return `${Math.floor(value / 100000)} LPA`; // Convert to LPA and round down
  };

  // Format to Indian numbering system (editing mode)
  const formatToINR = (value) => {
    if (!value) return "";
    return value.replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"); // Add commas as per INR format
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value; // Raw input value
    const formattedValue = formatToINR(rawValue); // Format to INR
    setGrossSalaryInput(formattedValue.replace(/,/g, "")); // Store unformatted value
  };

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
                  INR {formatToLPA(grossSalary)}
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
                  onClick={() => setIsEditing(true)}
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

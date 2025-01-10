import React, { useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SalaryTable from "./UI/SalaryTable";
import { AppContext } from "../context/AppContext";

const SalaryDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { grossSalaryInput, handleSave, setGrossSalaryInput,grossSalary } = useContext(AppContext);

  // Format the numeric input to "LPA" (no decimals)
  const formatToLPA = (value) => {
    if (!value || isNaN(value)) return "0 LPA";
    return `${Math.floor(value / 100000)} LPA`; // Convert to LPA and round down to the nearest whole number
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
                  type="number"
                  value={grossSalaryInput}
                  onChange={(e) => setGrossSalaryInput(e.target.value)}
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

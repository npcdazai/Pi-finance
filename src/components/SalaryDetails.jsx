import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import SalaryTable from "./UI/SalaryTable";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SalaryDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [numericPart, setNumericPart] = useState(20);
  const { grossSalaryInput, handleSave, setGrossSalaryInput } = useContext(AppContext)

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


          <Box sx={{ marginBottom: 2, width: "25%", display: "flex", flexDirection: "row", gap: 2 }}>
            {/* <Typography>Enter New Gross Salary</Typography> */}
            <TextField
              label="Annual CTC"
              value={grossSalaryInput}
              onChange={(e) => setGrossSalaryInput(e.target.value)}
              placeholder="Enter amount"
              fullWidth
              variant="outlined"
              sx={{
                height: "40px",
                "& .MuiInputBase-root": {
                  height: "40px",
                  padding: "0 14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#cccccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#666666",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                },
              }}
            />
            <Button sx={{ height: "40px" }} onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Box>

        </Box>
        <SalaryTable numericPart={numericPart} />
      </Box>
    </div>
  );
};

export default SalaryDetails;

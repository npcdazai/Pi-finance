import React, { useContext, useState } from "react";
import { Box, Typography, Grid, TextField, Button, Tabs, Tab, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import IncomeSection from "./IncomeSection";
import DeductionSection from "./DeductionSection";
import HRASection from "./HRASection";
import { AppContext } from "../../context/AppContext";

// Helper function to format the financial year from yyyy-yyyy to yyyy-yy
const formatFinancialYear = (year) => {
  if (!year || year.split("-").length !== 2) {
    console.error("Invalid financial year format:", year);
    return "";
  }

  const [startYear, endYear] = year.split("-");
  return `${startYear}-${endYear.slice(2)}`;  // Formatting as yyyy-yy
};

const TaxTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [financialYear, setFinancialYear] = useState("2023-2024");
  const [formattedFinancialYear, setFormattedFinancialYear] = useState("2023-24");  // State to hold the formatted year
  const { userDatas, selectedEmployee, setSelectedEmployee, getusers } = useContext(AppContext);
  const employeeId = selectedEmployee?.employee_id;

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Handle financial year selection
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setFinancialYear(selectedYear);

    // Format the selected financial year and store it
    const formattedYear = formatFinancialYear(selectedYear);
    setFormattedFinancialYear(formattedYear);
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", marginTop: 4, position: "relative", zIndex: 1 }}>
      {/* Dropdown for Financial Year */}
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2, width: "30%" }}>
        <InputLabel id="financial-year-label">Select Financial Year</InputLabel>
        <Select
          labelId="financial-year-label"
          value={financialYear}
          onChange={handleYearChange}
          label="Select Financial Year"
        >
          <MenuItem value={"2024-2025"}>2024-2025</MenuItem>
          <MenuItem value={"2023-2024"}>2023-2024</MenuItem>
          <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
          <MenuItem value={"2021-2022"}>2021-2022</MenuItem>
        </Select>
      </FormControl>

      {/* Tabs Section */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#A55EEC",
            height: "8px",
            borderTopRightRadius: "18px",
            borderTopLeftRadius: "18px"
          },
        }}
        textColor="inherit"
        sx={{
          "& .MuiTab-root": {
            fontSize: "16px",
            textTransform: "none",
          },
          "& .Mui-selected": {
            color: "#A55EEC",
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="1 Income" />
        <Tab label="2 Deductions" />
        <Tab label="3 HRA Exemptions" />
      </Tabs>

      {/* Form */}
      <Box sx={{ marginTop: 4 }}>
        {selectedTab === 0 && (
          <IncomeSection financialYear={formattedFinancialYear} employeeId={employeeId} />
        )}
        {selectedTab === 1 && formattedFinancialYear && (
          <Box>
            <DeductionSection financialYear={formattedFinancialYear} employeeId={employeeId} />
          </Box>
        )}
        {selectedTab === 2 && (
          <Box>

            <HRASection financialYear={formattedFinancialYear} employeeId={employeeId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaxTabs;

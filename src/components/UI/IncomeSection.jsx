import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

const IncomeSection = ({ financialYear, employeeId }) => {
  const [incomeData, setIncomeData] = useState({
    annualIncome: 0,
    grossSalary: 0,
    houseProperty: 0,
    otherSources: 0,
    interest: 0,
    shortTermCapitalGains: 0,
    longTermCapitalGains: 0,
  });
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await fetch(
          `https://staging.getpi.in/backend/v1/hrms/hr/users/fetch/income/${employeeId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ year: financialYear }),
          }
        );
        const incomeData = await incomeResponse.json();

        const salaryResponse = await fetch(
          `https://staging.getpi.in/backend/v1/hrms/hr/users/fetch/gross_annual_salary/${employeeId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ year: financialYear }),
          }
        );
        const salaryData = await salaryResponse.json();

        setIncomeData({
          annualIncome: incomeData?.data?.annual_income || 0,
          grossSalary: salaryData?.data || 0,
          houseProperty: incomeData?.data?.house_property || 0,
          otherSources: incomeData?.data?.other_sources || 0,
          interest: incomeData?.data?.interest || 0,
          shortTermCapitalGains: incomeData?.data?.capital_gains?.short_term || 0,
          longTermCapitalGains: incomeData?.data?.capital_gains?.long_term || 0,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [financialYear, employeeId]);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4, marginTop: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5">Income Details</Typography>
        <Button
          variant="outlined"
          onClick={handleEditToggle}
          sx={{
            height: "40px",
            width: "100px",
            border: "none",
            color: "#6941C6",
            textTransform: "capitalize",
          }}
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {Object.entries(incomeData).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "#667085" }}>
                {key.replace(/([A-Z])/g, " $1").replace(/^[a-z]/, (m) => m.toUpperCase())}
              </Typography>
              {isEditable ? (
                <TextField
                  variant="outlined"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  size="small"
                />
              ) : (
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(value || 0)}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

IncomeSection.propTypes = {
  financialYear: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
};

export default IncomeSection;

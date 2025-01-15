import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";

const HRASection = ({ financialYear, employeeId }) => {
  const [hraData, setHraData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatToINR = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://staging.getpi.in/backend/v1/hrms/hr/fetch/hra_deductible/${employeeId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ year: financialYear }),
          }
        );
        const data = await response.json();
        setHraData({
          city: data?.data?.city || "",
          houseType: data?.data?.house_type || "",
          rentPaidAnnual: data?.data?.rent_paid_annual || 0,
          hraReceived: data?.data?.hra_received || 0,
          state1: data?.data?.state1 || 0,
          state2: data?.data?.state2 || 0,
          hraDeductible: data?.data?.hra_deductible || 0,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [financialYear, employeeId]);

  if (loading) return <Typography>Loading...</Typography>;

  // Function to format and capitalize the keys
  const getLabel = (key) => {
    const labelMap = {
      city: "City",
      houseType: "House Type",
      rentPaidAnnual: "Rent Paid (Annual)",
      hraReceived: "HRA Received",
      state1: "Rent Paid - 10% of Basic",
      state2: "40%/50% of Basic Salary",
      hraDeductible: "HRA Deductible",
    };

    // Return the mapped label for each key or default capitalized version of the key
    return labelMap[key] || key.replace(/([A-Z])/g, " $1").replace(/^[a-z]/, (m) => m.toUpperCase());
  };

  return (
    <Box sx={{ padding: 4, marginTop: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        HRA Exemption
      </Typography>
      <Grid container spacing={2}>
        {hraData &&
          Object.entries(hraData).map(([key, value]) => (
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
                  {getLabel(key)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {typeof value === "number" ? formatToINR(value) : value}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

HRASection.propTypes = {
  financialYear: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
};

export default HRASection;

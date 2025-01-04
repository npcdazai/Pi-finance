import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

const HRASection = ({ financialYear, employeeId }) => {
  const [hraData, setHraData] = useState({
    city: "",
    houseType: "",
    rentPaidAnnual: 0,
    hraReceived: 0,
    state1: 0,
    state2: 0,
    hraDeductible: 0,
  });
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHraData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4, marginTop: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5">HRA Exemption</Typography>
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
        {Object.entries(hraData).map(([key, value]) => (
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
                  {value || 0}
                </Typography>
              )}
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

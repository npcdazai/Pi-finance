import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, TextField, Divider } from "@mui/material";
import PropTypes from "prop-types";

const DeductionSection = ({ financialYear, employeeId }) => {
  const [deductionData, setDeductionData] = useState({
    "80C": {
      PPF: 0,
      ELSS: 0,
      life_insurance: 0,
      NPS: 0,
      any_other_tax_saving_instrument: 0,
      EPF: 0,
    },
    "80CCD": {
      NPS: 0,
    },
    "80D": {
      health_insurance_for_self_and_family: 0,
      health_insurance_for_parents: 0,
    },
    "80E": {
      education_loan_interest: 0,
    },
    section_24b: {
      interest_on_home_loan: 0,
    },
    "80G": {
      donations: 0,
    },
    HRA: {
      rent_amount_annual: 0,
    },
    lta: {
      lta_claimed: 0,
    },
  });

  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://staging.getpi.in/backend/v1/hrms/hr/users/fetch/deductions/${employeeId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              year: financialYear,
            }),
          }
        );
        const data = await response.json();

        if (data.status && data.data) {
          const userTaxData = data.data;

          setDeductionData({
            "80C": userTaxData?.["80C"] || {},
            "80CCD": userTaxData?.["80CCD"] || {},
            "80D": userTaxData?.["80D"] || {},
            "80E": userTaxData?.["80E"] || {},
            section_24b: userTaxData?.["section_24b"] || {},
            "80G": userTaxData?.["80G"] || {},
            HRA: userTaxData?.HRA || {},
            lta: userTaxData?.lta || {},
          });
        } else {
          console.error("Failed to fetch valid tax data.");
        }
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
    setDeductionData((prev) => ({
      ...prev,
      [name.split(".")[0]]: {
        ...prev[name.split(".")[0]],
        [name.split(".")[1]]: value,
      },
    }));
  };

  const formatSectionTitle = (section) => {
    // Replace underscores with spaces, capitalize the first letter of each word
    return section
      .replace(/_/g, " ")
      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()) // Capitalize the first letter of each word
      .replace("Section", "Section ");
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3, marginTop: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
        <Typography variant="h5">Deduction Details</Typography>
        <Button
          variant="outlined"
          onClick={handleEditToggle}
          sx={{
            height: "35px",
            width: "90px",
            border: "none",
            color: "#6941C6",
            textTransform: "capitalize",
          }}
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>
      </Box>
      <Grid container spacing={1}>
        {Object.entries(deductionData).map(([section, data]) => (
          <Grid item xs={12} md={6} key={section}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                padding: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#6941C6",
                  marginBottom: 0,
                  borderBottom: "2px solid #6941C6",
                  paddingBottom: 0,
                  fontSize: "1.1rem",
                }}
              >
                {formatSectionTitle(section)}
              </Typography>
              <Divider sx={{ marginBottom: 1 }} />
              {Object.entries(data).map(([key, value]) => (
                <Box key={key} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#667085",
                      fontWeight: "normal",
                      width: "60%",
                    }}
                  >
                    {key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").replace(/^[a-z]/, (m) => m.toUpperCase())}
                  </Typography>
                  {isEditable ? (
                    <TextField
                      variant="outlined"
                      name={`${section}.${key}`}
                      value={value}
                      onChange={handleChange}
                      placeholder="Enter Amount"
                      size="small"
                      sx={{
                        width: "30%",
                        backgroundColor: "#f3f3f3",
                        borderRadius: 1,
                      }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        minWidth: "120px",
                        textAlign: "right",
                      }}
                    >
                      {value || 0}
                    </Typography>
                  )}
                </Box>
              ))}
              <Divider sx={{ marginTop: 1 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

DeductionSection.propTypes = {
  financialYear: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
};

export default DeductionSection;

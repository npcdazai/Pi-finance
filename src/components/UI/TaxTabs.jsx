import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Tabs, Tab } from "@mui/material";

const TaxTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box sx={{ width: "100%", margin: "auto", marginTop: 4 }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
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
      <Box sx={{ padding: 4, marginTop: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Gross Salary Income"
              variant="outlined"
              placeholder="Enter Amount"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Annual Income from other sources"
              variant="outlined"
              placeholder="Enter Amount"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Annual Income from Interest"
              variant="outlined"
              placeholder="Enter Amount"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Annual Income from let-out house property (Rental Income)"
              variant="outlined"
              placeholder="Enter Amount"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Annual Interest paid on Home Loan (Self occupied)"
              variant="outlined"
              placeholder="Enter Amount"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Annual Interest paid on Home Loan (Self occupied)"
              variant="outlined"
              placeholder="Enter Amount"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <Button variant="contained" sx={{ bgcolor: "#9747FF", color: "#fff", borderRadius: "58px", textTransform: "capitalize" }} >
            Save & Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaxTabs;

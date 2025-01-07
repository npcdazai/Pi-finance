import React, { useContext, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const SalaryRow = ({ label, rowData, isHighlighted }) => (
  <TableRow sx={{ backgroundColor: isHighlighted ? "#F5F5F5" : "inherit" }}>
    <TableCell
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        position: "sticky",
        left: 0,
        backgroundColor: "#fff",
        fontWeight: isHighlighted ? 700 : 400,
        zIndex: 1,
      }}
    >
      <InsertDriveFileIcon
        sx={{ color: "#9747FF", height: "16.67px", width: "13px" }}
      />
      {label}
    </TableCell>
    {rowData.map((cellData, index) => (
      <TableCell
        key={index}
        align="right"
        sx={{ fontWeight: isHighlighted ? 700 : 400 }}
      >
        {cellData}
      </TableCell>
    ))}
  </TableRow>
);

const formatCurrency = (value) => {
  const num = parseFloat(value);
  if (!isNaN(num)) {
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  }
  return value;
};

const FormatYearMonth = ({ isoDate }) => {
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Apr 2021";
    }

    const date = new Date(dateString);
    date.setMonth(date.getMonth() - 1);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      timeZone: "Asia/Kolkata",
    });
  };

  return <div>{formatDate(isoDate)}</div>;
};

const SalaryTable = () => {
  // const [grossSalaryInput, setGrossSalaryInput] = useState("");
  // const [updatedSalaryData, setUpdatedSalaryData] = useState(null);
  const { handleSave, getAllData, setUpdatedSalaryData, setGrossSalaryInput, grossSalaryInput, updatedSalaryData } = useContext(AppContext);

  const salaryDataToUse = updatedSalaryData?.data || getAllData?.data;


  if (!salaryDataToUse) return <div>No data available</div>;


  console.log('====================================');
  console.log(updatedSalaryData);
  console.log('====================================');

  const salaryData = [
    {
      label: "Basic Salary",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) =>
          formatCurrency(salary?.basic_salary || 0)
        )
      ),
    },
    {
      label: "HRA",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) => formatCurrency(salary?.hra || 0))
      ),
    },
    {
      label: "LTA",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) => formatCurrency(salary?.lta || 0))
      ),
    },
    {
      label: "Special Allowance",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) =>
          formatCurrency(salary?.special_allowance || 0)
        )
      ),
    },
  ];

  const netSalaryData = [
    {
      label: "PF Contribution",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) =>
          formatCurrency(salary?.pf_contribution || 0)
        )
      ),
    },
    {
      label: "Professional Tax",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) =>
          formatCurrency(salary?.professional_tax || 0)
        )
      ),
    },
    {
      label: "Income Tax",
      rowData: salaryDataToUse.flatMap((row) =>
        row?.userSalary?.map((salary) =>
          formatCurrency(salary?.income_tax_tds || 0)
        )
      ),
    },
  ];

  const grossSalaryData = salaryDataToUse.map((row) => {
    return row?.userSalary?.map((salary) => {
      const basic = salary?.basic_salary || 0;
      const hra = salary?.hra || 0;
      const lta = salary?.lta || 0;
      const special = salary?.special_allowance || 0;
      return basic + hra + lta + special;
    });
  });

  const grossSalaryRowData = grossSalaryData
    .flat()
    .map((value) => formatCurrency(value));

  const calculateNetSalary = (grossSalaries, deductions) => {
    const pfContributions = deductions[0]?.rowData.map((pf) => {
      const pfValue = pf.replace ? pf.replace(/[₹,]/g, "") : pf;
      return parseFloat(pfValue) || 0;
    });

    const professionalTaxes = deductions[1]?.rowData.map((tax) => {
      const taxValue = tax.replace ? tax.replace(/[₹,]/g, "") : tax;
      return parseFloat(taxValue) || 0;
    });

    const incomeTaxes = deductions[2]?.rowData.map((tax) => {
      const taxValue = tax.replace ? tax.replace(/[₹,]/g, "") : tax;
      return parseFloat(taxValue) || 0;
    });

    const grossSalariesFlat = grossSalaries.flat().map((salary) => {
      const salaryValue = salary.replace ? salary.replace(/[₹,]/g, "") : salary;
      return parseFloat(salaryValue) || 0;
    });

    const netSalaries = grossSalariesFlat.map(
      (gross, index) =>
        gross - (pfContributions[index] || 0) - (professionalTaxes[index] || 0) - (incomeTaxes[index] || 0)
    );

    return netSalaries;
  };

  const netSalaries = calculateNetSalary(grossSalaryRowData, netSalaryData).map(
    (netSalary) => formatCurrency(netSalary)
  );

  // const handleSave = async () => {
  //   if (!grossSalaryInput) {
  //     alert("Please enter a gross salary");
  //     return;
  //   }

  //   try {
  //     const response = await axios.put(
  //       "https://staging.getpi.in/backend/v1/hrms/hr/user/salary/E001",
  //       {
  //         gross_salary: grossSalaryInput,
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert("Salary data updated successfully");
  //       setUpdatedSalaryData(response.data.data); 
  //     }
  //   } catch (error) {
  //     console.error("Error updating salary:", error);
  //     alert("Failed to update salary data");
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflowX: "auto",
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Enter New Gross Salary</Typography>
        <TextField
          label="New Gross Salary"
          value={grossSalaryInput}
          onChange={(e) => setGrossSalaryInput(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 700, overflowY: "hidden", width: "100%" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "sticky",
                  left: 0,
                  top: 0,
                  backgroundColor: "#fff",
                  zIndex: 3,
                }}
              >
                Salary Structure
              </TableCell>
              {salaryDataToUse
                .flatMap((row) =>
                  row?.userSalary?.map((val, index) => (
                    <TableCell sx={{ zIndex: 1 }} key={index} align="center">
                      <FormatYearMonth isoDate={val?.month} />
                    </TableCell>
                  ))
                )
                .slice(1)
                .reverse()}
              <TableCell sx={{ zIndex: 1 }} align="center">
                Apr 2021
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryData.map((item, index) => (
              <SalaryRow key={index} label={item.label} rowData={item.rowData} />
            ))}

            <SalaryRow
              label="Gross Salary"
              rowData={grossSalaryRowData}
              isHighlighted={true}
            />

            {netSalaryData.map((item, index) => (
              <SalaryRow key={index} label={item.label} rowData={item.rowData} />
            ))}

            <SalaryRow
              label="Net Salary"
              rowData={netSalaries}
              isHighlighted={true}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SalaryTable;

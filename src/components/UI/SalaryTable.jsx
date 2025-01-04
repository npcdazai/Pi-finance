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

const SalaryRow = ({ label, rowData, isHighlighted }) => (

    <TableRow
        sx={{
            backgroundColor: isHighlighted ? "#F5F5F5" : "inherit", // Light background for Gross Salary
        }}
    >
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
                sx={{
                    color: "#9747FF",
                    height: "16.67px",
                    width: "13px",
                }}
            />
            {label}
        </TableCell>
        {rowData.map((cellData, index) => (
            <TableCell
                key={index}
                align="center"
                sx={{
                    fontWeight: isHighlighted ? 700 : 400,
                    // color: isHighlighted ? "#FF5722" : "inherit",
                }}
            >
                {cellData}
            </TableCell>
        ))}
    </TableRow>
);

const FormatYearMonth = ({ isoDate }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", { year: "numeric", month: "long" });
    };

    return <div>{formatDate(isoDate)}</div>;
};

const SalaryTable = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("20LPA");
    const { getAllData } = useContext(AppContext);

    if (!getAllData?.data) return <div>No data available</div>;

    const salaryData = [
        {
            label: "Basic Salary",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => `₹${salary.basic_salary || 0}`)
            ),
        },
        {
            label: "HRA",
            rowData: getAllData.data.flatMap((row) =>
                row?.userTax.map((tax) => `₹${tax?.HRA?.rent_amount_annual || 0}`)
            ),
        },
        {
            label: "LTA",
            rowData: getAllData.data.flatMap((row) =>
                row?.userTax.map((tax) => `₹${tax?.lta?.lta_claimed || 0}`)
            ),
        },
        {
            label: "Special Allowance",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => `₹${salary.special_allowance || 0}`)
            ),
        },
    ];

    const netSalaryData = [
        {
            label: "PF Contribution",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => `₹${salary.pf_contribution || 0}`)
            ),
        },
        {
            label: "Professnal Tax",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => `₹${salary.professional_tax || 0}`)
            ),
        },
        {
            label: "Income Tax",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => `₹${salary.income_tax_tds || 0}`)
            ),
        },
    ];

    const grossSalaryData = getAllData.data.map((row) => {
        return row?.userSalary.map((salary, index) => {
            const basic = salary?.basic_salary || 0;
            const hra = row?.userTax[index]?.HRA?.rent_amount_annual || 10;
            const lta = row?.userTax[index]?.lta?.lta_claimed || 10;
            const special = salary?.special_allowance || 10;
            return basic + hra + lta + special;
        });
    });

    const grossSalaryRowData = grossSalaryData.flat().map((value) => `₹${value}`);



    const calculateNetSalary = (grossSalaries, deductions) => {
        const pfContributions = deductions[0]?.rowData.map((pf) => parseFloat(pf.replace(/[₹,]/g, '')) || 0);
        const professionalTaxes = deductions[1]?.rowData.map((tax) => parseFloat(tax.replace(/[₹,]/g, '')) || 0);
        const incomeTaxes = deductions[2]?.rowData.map((tax) => parseFloat(tax.replace(/[₹,]/g, '')) || 0);

        const grossSalariesFlat = grossSalaries.flat().map((salary) => parseFloat(salary.replace(/[₹,]/g, '')) || 0);

        const netSalaries = grossSalariesFlat.map((gross, index) =>
            gross - (pfContributions[index] || 0) - (professionalTaxes[index] || 0) - (incomeTaxes[index] || 0)
        );

        return netSalaries;
    };

    const netSalaries = calculateNetSalary(grossSalaryRowData, netSalaryData);



    return (
        <div style={{ overflowX: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
            <Box
                sx={{
                    border: "1px solid",
                    borderColor: "grey.400",
                    borderRadius: 2,
                    padding: 1,
                    // width: "150px",
                    width: isEditing ? "auto" : "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {isEditing ? (
                    <>
                        <TextField
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            size="small"
                            sx={{ flexGrow: 1, marginRight: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={() => setIsEditing(false)}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                            {text}
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                    </>
                )}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ position: "sticky", top: 0 , zIndex:4 }} >
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
                            {getAllData?.data.flatMap((row) =>
                                row?.userSalary.map((val, index) => (
                                    <TableCell sx={{ zIndex: "1" }} key={index} align="center">
                                        <FormatYearMonth isoDate={val?.month} />
                                    </TableCell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {salaryData.map((item, index) => (
                            <SalaryRow
                                key={index}
                                label={item.label}
                                rowData={item.rowData}
                            />
                        ))}

                        <SalaryRow
                            label="Gross Salary"
                            rowData={grossSalaryRowData}
                            isHighlighted={true}
                        />

                        {netSalaryData.map((item, index) => (
                            <SalaryRow
                                key={index}
                                label={item.label}
                                rowData={item.rowData}
                            />
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

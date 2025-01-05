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
            <InsertDriveFileIcon sx={{ color: "#9747FF", height: "16.67px", width: "13px" }} />
            {label}
        </TableCell>
        {rowData.map((cellData, index) => (
            <TableCell key={index} align="center" sx={{ fontWeight: isHighlighted ? 700 : 400 }}>
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

const formatCurrency = (value) => {
    // Ensure the value is a number
    const num = parseFloat(value);
    if (!isNaN(num)) {
        return num.toLocaleString("en-IN", { style: "currency", currency: "INR" });
    }
    return value; // Return the original value if it's not a valid number
};

const SalaryTable = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { getAllData } = useContext(AppContext);

    if (!getAllData?.data) return <div>No data available</div>;

    const salaryData = [
        {
            label: "Basic Salary",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => formatCurrency(salary?.basic_salary || 0))
            ),
        },
        {
            label: "HRA",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((_, index) => {
                    const rentAmountAnnual = row?.userTax?.[index]?.HRA?.rent_amount_annual;
                    return formatCurrency(rentAmountAnnual !== undefined && rentAmountAnnual !== null ? rentAmountAnnual : 0);
                })
            ),
        },
        {
            label: "LTA",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((_, index) => {
                    const ltaClaimed = row?.userTax?.[index]?.lta?.lta_claimed;
                    return formatCurrency(ltaClaimed !== undefined && ltaClaimed !== null ? ltaClaimed : 0);
                })
            ),
        },
        {
            label: "Special Allowance",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => formatCurrency(salary?.special_allowance || 0))
            ),
        },
    ];

    const netSalaryData = [
        {
            label: "PF Contribution",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => formatCurrency(salary.pf_contribution || 0))
            ),
        },
        {
            label: "Professional Tax",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => formatCurrency(salary.professional_tax || 0))
            ),
        },
        {
            label: "Income Tax",
            rowData: getAllData.data.flatMap((row) =>
                row?.userSalary.map((salary) => formatCurrency(salary.income_tax_tds || 0))
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

    const grossSalaryRowData = grossSalaryData.flat().map((value) => formatCurrency(value));

    const calculateNetSalary = (grossSalaries, deductions) => {
        const pfContributions = deductions[0]?.rowData.map((pf) => {
            const pfValue = pf.replace ? pf.replace(/[₹,]/g, "") : pf; // Ensure the value has replace method
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

        const netSalaries = grossSalariesFlat.map((gross, index) =>
            gross - (pfContributions[index] || 0) - (professionalTaxes[index] || 0) - (incomeTaxes[index] || 0)
        );

        return netSalaries;
    };

    const netSalaries = calculateNetSalary(grossSalaryRowData, netSalaryData).map((netSalary) => formatCurrency(netSalary));

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflowX: "auto",
            }}
        >
            <TableContainer
                component={Paper}
                sx={{ maxHeight: "80vh", overflowY: "hidden", width: "100%" }}
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
                            {getAllData?.data.flatMap((row) =>
                                row?.userSalary.map((val, index) => (
                                    <TableCell sx={{ zIndex: 1 }} key={index} align="center">
                                        <FormatYearMonth isoDate={val?.month} />
                                    </TableCell>
                                ))
                            )}
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

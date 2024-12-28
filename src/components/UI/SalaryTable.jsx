import React, { useState, useEffect, useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { AppContext } from "../../context/AppContext";

const months = ["Mar 2024", "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024"];

const SalaryTable = () => {
    const { userDatas } = useContext(AppContext);
    const [salaryData, setSalaryData] = useState([]); // State for salary data
    const [loading, setLoading] = useState(true); // State for loading status

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://staging.getpi.in/backend/v1/hrms/hr/users/E001");
                const result = await response.json();
                console.log("API Response:", result);

                if (result.status && result.data?.length > 0) {
                    const rawData = result.data[0].userSalary;

                    // Map month names to corresponding data
                    const filteredMonths = rawData.filter((item) => {
                        const itemMonth = new Date(item.month).toLocaleString("en-US", {
                            month: "short",
                            year: "numeric",
                        });
                        return months.includes(itemMonth);
                    });

                    // Transform the filtered data
                    const groupedData = [
                        { structure: "Basic Salary", values: filteredMonths.map((item) => item.basic_salary || 0) },
                        { structure: "Gross Salary", values: filteredMonths.map((item) => item.gross_salary || 0) },
                        { structure: "Income Tax TDS", values: filteredMonths.map((item) => item.income_tax_tds || 0) },
                        { structure: "Net Salary", values: filteredMonths.map((item) => item.net_salary || 0) },
                        { structure: "PF Contribution", values: filteredMonths.map((item) => item.pf_contribution || 0) },
                        { structure: "Professional Tax", values: filteredMonths.map((item) => item.professional_tax || 0) },
                        { structure: "Special Allowance", values: filteredMonths.map((item) => item.special_allowance || 0) },
                    ];

                    setSalaryData(groupedData);
                } else {
                    console.error("Invalid data structure:", result);
                }
            } catch (error) {
                console.error("Error fetching salary data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading salary data...</p>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Salary Structure</TableCell>
                        {months.map((month, index) => (
                            <TableCell key={index} align="center">{month}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {salaryData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                                <InsertDriveFileIcon sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }} />
                                {row.structure || "N/A"}
                            </TableCell>
                            {row.values.map((value, i) => (
                                <TableCell key={i} align="center">₹{value.toLocaleString()}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SalaryTable;

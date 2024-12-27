import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { AppContext } from "../../context/AppContext";

const salaryData = [
    { structure: "Basic Salary", values: [20000, 20000, 20000, 20000, 20000, 20000, 20000] },
    { structure: "HRA", values: [10000, 10000, 10000, 10000, 10000, 10000, 10000] },
    { structure: "DA", values: [10000, 10000, 10000, 10000, 10000, 10000, 10000] },
    { structure: "LTA", values: [10000, 10000, 10000, 10000, 10000, 10000, 10000] },
    { structure: "Bonuses", values: [10000, 10000, 10000, 10000, 10000, 10000, 10000] },
    { structure: "PF", values: [10000, 10000, 10000, 10000, 10000, 10000, 10000] },
    { structure: "Gratuity", values: [10000, 10000, 10000, 10000, 10000, 10000, 10000] },
];

const months = ["Mar 2024", "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024"];

const SalaryTable = () => {
    const { userDatas } = useContext(AppContext)

    console.log(userDatas)
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
                            <TableCell sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }} ><InsertDriveFileIcon sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }} /> {row.structure}</TableCell>
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

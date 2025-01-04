import React, { useContext } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";

const SalaryTable = () => {
    const { getAllData } = useContext(AppContext);

    console.log(getAllData);

    const salaryData = [
        {
            structure: "Basic Pay",
            values: [50000, 52000, 53000, 54000],
        },
        {
            structure: "HRA",
            values: [15000, 16000, 16500, 17000],
        },
        {
            structure: "LTA",
            values: [3000, 3200, 3300, 3400],
        },
        {
            structure: "Special Allowance",
            values: [7000, 7200, 7500, 7700],
        },
    ];



    const grossSalaryValues = salaryData[0]?.values.map((_, index) =>
        salaryData.reduce((total, item) => total + item.values[index], 0)
    );



    function FormatYearMonth({ isoDate }) {
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleString("en-US", { year: "numeric", month: "long" });
        };

        return <div>{formatDate(isoDate)}</div>;
    }

    return (
        <div style={{ overflowX: "auto" }}>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
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
                                    backgroundColor: "#fff",
                                    zIndex: 1
                                }}
                            >Salary Structure</TableCell>

                            {getAllData?.data.map((month, index) =>
                                month?.userSalary.map((val, i) => (
                                    <TableCell key={`${index}-${i}`} align="center">
                                        <FormatYearMonth isoDate={val?.month} />
                                    </TableCell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getAllData?.data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        position: "sticky",
                                        left: 0,
                                        backgroundColor: "#fff",
                                        zIndex: 1
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }}
                                    />
                                    Basic Salary
                                </TableCell>
                                {row?.userSalary.map((value, i) => (
                                    <TableCell key={i} align="center">
                                        {`₹${value?.basic_salary}`}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                        {getAllData?.data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        position: "sticky",
                                        left: 0,
                                        backgroundColor: "#fff",
                                        zIndex: 1
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }}
                                    />
                                    HRA
                                </TableCell>

                                {row?.userTax.map((value, i) => (
                                    <TableCell key={i} align="center">
                                        {`₹${value?.HRA?.rent_amount_annual}`}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                        {getAllData?.data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        position: "sticky",
                                        left: 0,
                                        backgroundColor: "#fff",
                                        zIndex: 1
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }}
                                    />
                                    LTA
                                </TableCell>
                                {row?.userTax.map((value, i) => (
                                    <TableCell key={i} align="center">
                                        {`₹${value?.lta?.lta_claimed}`}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {getAllData?.data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        position: "sticky",
                                        left: 0,
                                        backgroundColor: "#fff",
                                        zIndex: 1
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }}
                                    />
                                    Special Allowance
                                </TableCell>
                                {row?.userSalary.map((value, i) => (
                                    <TableCell key={i} align="center">
                                        {`₹${value?.special_allowance}`}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                        {/* Add Gross Salary Row */}
                        <TableRow>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    position: "sticky",
                                    left: 0,
                                    backgroundColor: "#fff",
                                    zIndex: 1
                                }}
                            >
                                <InsertDriveFileIcon
                                    sx={{ color: "#7F56D9", height: "16.67px", width: "13px" }}
                                />
                                Gross Salary
                            </TableCell>
                            {grossSalaryValues.map((value, index) => (
                                <TableCell key={index} align="center" sx={{ fontWeight: 700 }}>
                                    {`₹${value}`}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SalaryTable;

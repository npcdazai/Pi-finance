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

const SalaryRow = ({ label, rowData, isHighlighted }) => (
    <TableRow
        sx={{
            backgroundColor: isHighlighted ? "#F5F5F5" : "inherit", 
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
                    color: "#FF5722" ,
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

    const grossSalaryData = getAllData.data.map((row) => {
        return row?.userSalary.map((salary, index) => {
            const basic = salary?.basic_salary || 0;
            const hra = row?.userTax[index]?.HRA?.rent_amount_annual || 0;
            const lta = row?.userTax[index]?.lta?.lta_claimed || 0;
            const special = salary?.special_allowance || 0;
            return basic + hra + lta + special;
        });
    });

    const grossSalaryRowData = grossSalaryData.flat().map((value) => `₹${value}`);

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
                                    zIndex: 1,
                                }}
                            >
                                Salary Structure
                            </TableCell>
                            {getAllData?.data.flatMap((row) =>
                                row?.userSalary.map((val, index) => (
                                    <TableCell key={index} align="center">
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
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SalaryTable;

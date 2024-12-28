import React, { useContext, useState } from 'react';
import { Box, Card, Container, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import PiButton from '../components/UI/PiButton';
import TaxCards from '../components/UI/TaxCards';
import EmployeeDetails from '../components/UI/EmployeeDetails';
import SalaryTable from '../components/SalaryDetails';
import TaxDeclarations from '../components/taxDeclarations';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppContext } from '../context/AppContext';

const Home = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const { userDatas } = useContext(AppContext); // Assuming userDatas is fetched and stored here

    // Select the first employee by default if no one is selected
    React.useEffect(() => {
        if (userDatas && userDatas.length > 0) {
            setSelectedEmployee(userDatas[0]);
        }
    }, [userDatas]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setAnchorEl(null);
    };

    if (!selectedEmployee) {
        return <div>Loading...</div>; // Ensure the component doesn’t break if there's no selected employee
    }

    return (
        <Container maxWidth="lg"
        // maxWidth={{ md: "lg", lg: "lg" }}
            sx={{ mt: "4rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Header */}
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: "2rem", justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography sx={{ color: "#101828", fontWeight: 600, fontSize: "30px" }}>
                            Welcome back {selectedEmployee.name}, Talk to Pi to grow & save more money!
                        </Typography>
                        <Typography sx={{ color: "#667085", fontSize: "16px", fontWeight: 400 }}>
                            Track, manage and forecast your customers and orders.
                        </Typography>
                    </Box>
                    <PiButton text={"Talk to Pi"} />
                </Box>

                {/* ProfileCard as Menu */}
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 14 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                        <Typography sx={{ color: "#000000B2", fontWeight: 500, fontSize: "16px" }}>
                            Select Employee
                        </Typography>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                boxShadow: 1,
                                p: 1,
                                gap: 2,
                                borderRadius: "16px",
                                cursor: "pointer",
                                width: "100%",
                                
                                height: "100%",
                            }}
                            onClick={handleMenuOpen}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    component="img"
                                    src={selectedEmployee.avatar}
                                    height="72px"
                                    width="72px"
                                    borderRadius="50%"
                                    alt={selectedEmployee.name}
                                />
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography sx={{ fontSize: "16px", color: "#000000", fontWeight: 500 }}>
                                        {selectedEmployee.name}
                                    </Typography>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "2px", alignItems: "center" }}>
                                        <span style={{ fontSize: "14px", color: "#000000", fontWeight: 400 }}>
                                            {selectedEmployee.location}
                                        </span> .
                                        <span style={{ fontSize: "14px", color: "#000000", fontWeight: 400 }}>
                                            Salary: {selectedEmployee.salary}
                                        </span>
                                    </Box>
                                </Box>
                                <IconButton>
                                    <KeyboardArrowDownIcon />
                                </IconButton>
                            </Box>
                        </Card>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {userDatas.map((employee) => (
                                <MenuItem
                                    key={employee.id}
                                    onClick={() => handleEmployeeSelect(employee)}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Box
                                            component="img"
                                            src={employee.avatar}
                                            height="40px"
                                            width="40px"
                                            borderRadius="50%"
                                            alt={employee.name}
                                        />
                                        <Typography sx={{ fontSize: "14px", color: "#000000", fontWeight: 500 }}>
                                            {employee.name}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <TaxCards employee={selectedEmployee} />
                </Box>

                {/* Other Components */}
                <EmployeeDetails employee={selectedEmployee} />
                <SalaryTable employee={selectedEmployee} />
                <TaxDeclarations employee={selectedEmployee} />
            </Box>
        </Container>
    );
};

export default Home;

import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import PiButton from '../components/UI/PiButton';
import TaxCards from '../components/UI/TaxCards';
import EmployeeDetails from '../components/UI/EmployeeDetails';
import SalaryTable from '../components/SalaryDetails';
import TaxDeclarations from '../components/TaxDeclarations';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import pfp from '../../public/images/Avtar/avtar.png';
import { AppContext } from '../context/AppContext';

const Home = () => {
    // const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const { userDatas, selectedEmployee, setSelectedEmployee } = useContext(AppContext);

    useEffect(() => {
        if (userDatas?.length > 0) {
            setSelectedEmployee(userDatas[0]);
        }
    }, [userDatas, selectedEmployee, setSelectedEmployee]);

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
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    const renderMenuItem = (employee) => (
        <MenuItem key={employee.id} onClick={() => handleEmployeeSelect(employee)}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    component="img"
                    src={employee.avatar || pfp}
                    alt={employee.name}
                    sx={{ height: 40, width: 40, borderRadius: '50%' }}
                />
                <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{employee.name}</Typography>
            </Box>
        </MenuItem>
    );

    return (
        <Box
            sx={{
                mt: 8,
                px: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: '2rem',
                    }}
                >
                    <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 30, color: '#101828' }}>
                            Welcome back {selectedEmployee.name}, Talk to Pi to grow & save more money!
                        </Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#667085' }}>
                            Track, manage and forecast your customers and orders.
                        </Typography>
                    </Box>
                    <PiButton text="Talk to Pi" />
                </Box>

                {/* Profile Card with Menu */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 4,
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#000000B2' }}>
                            Select Employee
                        </Typography>
                        <Card
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                gap: 2,
                                boxShadow: 1,
                                borderRadius: 2,
                                cursor: 'pointer',
                            }}
                            onClick={handleMenuOpen}
                        >
                            <Box
                                component="img"
                                src={selectedEmployee.avatar || pfp}
                                alt={selectedEmployee.name}
                                sx={{ height: 72, width: 72, borderRadius: '50%' }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{selectedEmployee.name}</Typography>
                                <Typography sx={{ fontSize: 14, color: '#000000' }}>
                                    {selectedEmployee.location} • Salary: {selectedEmployee.salary}
                                </Typography>
                            </Box>
                            <IconButton>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </Card>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            {userDatas.map(renderMenuItem)}
                        </Menu>
                    </Box>

                    <TaxCards employee={selectedEmployee} />
                </Box>

                {/* Other Components */}
                <EmployeeDetails employee={selectedEmployee} />
                <SalaryTable employee={selectedEmployee} />
                <TaxDeclarations employee={selectedEmployee} />
            </Box>
        </Box>
    );
};

export default Home;

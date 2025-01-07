import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import PiButton from '../components/UI/PiButton';
import TaxCards from '../components/UI/TaxCards';
import EmployeeDetails from '../components/UI/EmployeeDetails';
import SalaryTable from '../components/SalaryDetails';
import TaxDeclarations from '../components/TaxDeclarations';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import pfp from '../../public/images/Avtar/kunal.jpg';
import pfp2 from '../../public/images/Avtar/avtar.png';
import { AppContext } from '../context/AppContext';

const Home = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { userDatas, selectedEmployee, setSelectedEmployee, getusers } = useContext(AppContext);

    useEffect(() => {
        if (getusers?.length > 0 && !selectedEmployee) {
            setSelectedEmployee(getusers[0]);
        }
    }, [getusers, selectedEmployee]);

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

    const getAvatar = (name) => {
        const lowercaseName = name?.toLowerCase();
        return ["priya", "ritika", "meena"].includes(lowercaseName) ? pfp2 : pfp;
    };

    if (!selectedEmployee) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    const renderMenuItem = (employee) => (
        <MenuItem
            key={employee.id}
            onClick={() => handleEmployeeSelect(employee)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                <Box
                    component="img"
                    src={getAvatar(employee.name)}
                    alt={employee.name}
                    sx={{ height: 40, width: 40, borderRadius: '50%' }}
                />
                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{employee.name}</Typography>
                <Typography sx={{ fontSize: 14, color: '#000000' }}>
                    Emp No: {employee.employee_id}
                </Typography>
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
                '@media (max-width: 600px)': {
                    px: 4,
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: '2rem',
                        '@media (max-width: 600px)': {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        },
                    }}
                >
                    <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 30, color: '#101828' }}>
                            Welcome <span style={{ color: '#9747FF' }}>{selectedEmployee.name}</span>, Talk to Pi to grow & save more money!
                        </Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#667085' }}>
                            Track, manage and forecast your customers and orders.
                        </Typography>
                    </Box>
                    <PiButton text="Talk to Pi" />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 4,
                        '@media (max-width: 600px)': {
                            flexDirection: 'column',
                            gap: 2,
                        },
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#000000B2', mb: 1 }}>
                            Select Employee
                        </Typography>
                        <Card
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                gap: 2,
                                height: "100%",
                                boxShadow: 1,
                                borderRadius: 2,
                                cursor: 'pointer',
                                '@media (max-width: 600px)': {
                                    width: '100%',
                                },
                            }}
                            onClick={handleMenuOpen}
                        >
                            <Box
                                component="img"
                                src={getAvatar(selectedEmployee.name)}
                                alt={selectedEmployee.name}
                                sx={{ height: 80, width: 80, borderRadius: '50%' }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                                    {selectedEmployee.name} {selectedEmployee.last_name}
                                </Typography>
                                <Typography sx={{ fontSize: 16, color: '#000000' }}>
                                    Emp No: {selectedEmployee.employee_id}
                                </Typography>
                            </Box>
                            <IconButton>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </Card>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            {getusers.map(renderMenuItem)}
                        </Menu>
                    </Box>

                    <TaxCards employee={selectedEmployee} />
                </Box>

                <EmployeeDetails employee={selectedEmployee} />
                <SalaryTable employee={selectedEmployee} />
                <TaxDeclarations employee={selectedEmployee} />
            </Box>
        </Box>
    );
};

export default Home;

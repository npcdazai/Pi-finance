import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UserProfile from './UserProfile';
import { AppContext } from '../../context/AppContext';



const EmployeeDetails = () => {
    const { selectedEmployee, updateEmployeeDetails } = useContext(AppContext); // Use context for employee data
    const [isEdit, setIsEdit] = useState(() => {
        const savedState = sessionStorage.getItem('isEdit');
        return savedState !== null ? JSON.parse(savedState) : false;
    });

    const [formData, setFormData] = useState(selectedEmployee || {});

    const toggleEditMode = () => {
        setIsEdit((prev) => {
            const newState = !prev;
            sessionStorage.setItem('isEdit', JSON.stringify(newState));
            return newState;
        });
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        updateEmployeeDetails(formData);
        toggleEditMode();
    };


    const info = [
        { title: 'Designation', value: selectedEmployee.job_title },
        { title: 'Interest Income', value: '1,210' },
        { title: 'Age', value: selectedEmployee.age },
        { title: 'Rent', value: '₹32k' },
        { title: 'House', value: 'Rented' },
        { title: 'Company', value: 'IT' },
        { title: 'Marital Status', value: selectedEmployee.marital_status },
    ]


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} >
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }} >
                <Box display="flex" flexDirection="column" alignItems="flex-start" >
                    <Typography variant='h5' sx={{}} >Employee Details</Typography>
                    <Typography variant='caption' sx={{ color: "#667085" }} >View & Edit Employee Details</Typography>
                </Box>
                <Button
                    onClick={toggleEditMode}
                    variant="outlined"
                    sx={{
                        height: "40px",
                        width: "100px",
                        border: "none",
                        color: "#6941C6",
                        textTransform: "capitalize",
                    }}
                    startIcon={<EditIcon />}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </Button>
            </Box>
            {isEdit ?
                <UserProfile />
                :

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#fff',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    {info.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: '1',
                                // minWidth: '150px',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold', textAlign: 'center' }}
                            >
                                {item.value}
                                {/* {selectedEmployee.job_title} */}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                sx={{ textAlign: 'center' }}
                            >
                                {item.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            }
        </Box>
    )
}

export default EmployeeDetails
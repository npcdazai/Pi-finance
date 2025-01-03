import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UserProfile from './UserProfile';
import { AppContext } from '../../context/AppContext';



const EmployeeDetails = () => {
    const { selectedEmployee, updateEmployeeDetails, userDatas } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(() => {
        const savedState = sessionStorage.getItem('isEdit');
        return savedState !== null ? JSON.parse(savedState) : false;
    });

    console.log(selectedEmployee, "__________________")

    const [formData, setFormData] = useState(selectedEmployee || {});

    const toggleEditMode = () => {
        setIsEdit((prev) => {
            const newState = !prev;
            sessionStorage.setItem('isEdit', JSON.stringify(newState));
            return newState;
        });
    };

    const InfoBox = ({ title, subtitle }) => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'center' }}>
                {subtitle}
            </Typography>
        </Box>
    );


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
                    {userDatas.map((val) => {
                        return (
                            <Box key={val.employee_id} sx={{ display: "flex", gap: 3 , width:"100%"}} >
                                <InfoBox title={val.job_title} subtitle="Designation" />
                                <InfoBox title="1,210" subtitle="Interest Income" />
                                <InfoBox title={val.age} subtitle="Age" />
                                <InfoBox title="₹32k" subtitle="Rent" />
                                <InfoBox title="Rented" subtitle="House" />
                                <InfoBox title="IT" subtitle="Company" />
                                <InfoBox title={val.marital_status} subtitle="Marital Status" />
                            </Box>
                        )
                    })}
                </Box>
            }
        </Box>
    )
}

export default EmployeeDetails
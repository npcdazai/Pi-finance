import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UserProfile from './UserProfile';

const info = [
    { title: 'Designation', value: 'Product Designer' },
    { title: 'Interest Income', value: '1,210' },
    { title: 'Age', value: '27' },
    { title: 'Rent', value: '₹32k' },
    { title: 'House', value: 'Rented' },
    { title: 'Company', value: 'IT' },
    { title: 'Marital Status', value: 'Unmarried' },
]

const EmployeeDetails = () => {
    const [isEdit, setIsEdit] = useState(() => {
        const savedState = sessionStorage.getItem('isEdit');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    const toggleEditMode = () => {
        setIsEdit(prevState => {
            const newState = !prevState;
            sessionStorage.setItem('isEdit', JSON.stringify(newState));
            return newState;
        });
    };

    useEffect(() => {
        sessionStorage.setItem('isEdit', JSON.stringify(isEdit));
    }, [isEdit]);


    // console.log(toggleEditMode, "__________________")

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} >
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }} >
                <Box display="flex" flexDirection="column" alignItems="flex-start" >
                    <Typography variant='h5' sx={{}} >Employee Details</Typography>
                    <Typography variant='caption' sx={{ color: "#667085" }} >View & Edit Employee Details</Typography>
                </Box>
                <Button onClick={toggleEditMode} variant="outlined" sx={{ height: "40px", width: "100px", border: "none", color: "#6941C6", }} startIcon={<EditIcon />}>
                    {isEdit ? "Edit" : "Cancel"}
                </Button>
            </Box>
            {isEdit ? <Box
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
            </Box> : <UserProfile />}
        </Box>
    )
}

export default EmployeeDetails

import { Box, Button, Card, Typography, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import UserProfile from './UserProfile';
import { AppContext } from '../../context/AppContext';

const EmployeeDetails = () => {
    const [isEdit, setIsEdit] = useState(() => {
        const savedState = sessionStorage.getItem('isEdit');
        return savedState !== null ? JSON.parse(savedState) : false;
    });

    const { user } = useContext(AppContext); // Assuming `user` is part of the context
    const userDetails = user?.details || []; // Default to an empty array if no user details

    const toggleEditMode = () => {
        setIsEdit((prev) => {
            const newState = !prev;
            sessionStorage.setItem('isEdit', JSON.stringify(newState));
            return newState;
        });
    };

    useEffect(() => {
        sessionStorage.setItem('isEdit', JSON.stringify(isEdit));
    }, [isEdit]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Employee Details
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#667085" }}>
                        View & Edit Employee Details
                    </Typography>
                </Box>
                <Button
                    onClick={toggleEditMode}
                    variant="outlined"
                    sx={{
                        height: "40px",
                        border: "1px solid #6941C6",
                        color: "#6941C6",
                        textTransform: "capitalize",
                    }}
                    startIcon={<EditIcon />}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </Button>
            </Box>

            {/* Content */}
            {isEdit ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        padding: 2,
                        backgroundColor: "#fff",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {userDetails.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                flex: "1 1 calc(33.333% - 16px)",
                                minWidth: "150px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 2,
                                textAlign: "center",
                                borderRadius: "12px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", marginBottom: 1 }}
                            >
                                {item.value}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {item.title}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            ) : (
                <UserProfile />
            )}
        </Box>
    );
};

export default EmployeeDetails;

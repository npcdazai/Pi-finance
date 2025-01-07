import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const EmployeeDetails = () => {
    const { userDatas } = useContext(AppContext);

    const InfoBox = ({ title, subtitle }) => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                padding: 1,
                textAlign: 'center',
                maxWidth: '250px',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
                {subtitle}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant='h5'>Employee Details</Typography>
                <Typography variant='caption' sx={{ color: "#667085" }}>View Employee Details</Typography>
            </Box>

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
                <Box sx={{ display: "flex", gap: 3, flexWrap: 'wrap', width: "100%" }}>
                    {userDatas?.map((val) => (
                        <React.Fragment key={val.employee_id}>
                            <InfoBox title={val.job_title} subtitle="Designation" />
                            <InfoBox title={val.department} subtitle="Department" />
                            <InfoBox title={val.age} subtitle="Age" />
                            <InfoBox title={val.gender} subtitle="Gender" />
                            <InfoBox title={val.location} subtitle="Location" />
                            <InfoBox title={val.marital_status} subtitle="Marital Status" />
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default EmployeeDetails;

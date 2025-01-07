import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import pfp from '../../../public/images/logo/piLogo.png';
import { AppContext } from '../../context/AppContext';

export default function TaxCards() {
    const { selectedEmployee, setTaxScorePercentage, taxScorePercentage, salaryScore, setSalaryScore, setGrossSalary, taxDetails, setTaxDetails, grossSalary } = useContext(AppContext);

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }} >
            <Box
                sx={{
                    backgroundColor: '#865DDB',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'left',
                    width: { xs: 'auto', md: '333px', lg: '333px' },
                    height: { xs: 'auto', md: '110px', lg: '110px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    fontFamily: 'Arial, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-40px',
                        left: '-40px',
                        width: '200px',
                        height: '200px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        opacity: 0.2,
                    }}
                />
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    You’re in top
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {salaryScore !== null ? salaryScore + "%" : "Loading..."} {/* Display salary score */}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Salary Score
                </Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: '#06AD44',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'left',
                    width: { xs: 'auto', md: '333px', lg: '333px' },
                    height: { xs: 'auto', md: '110px', lg: '110px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    fontFamily: 'Arial, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-40px',
                        left: '-40px',
                        width: '200px',
                        height: '200px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        opacity: 0.2,
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '24px',
                        padding: '4px',
                        paddingX: "8px",
                        width: 'fit-content',
                        height: "28px"
                    }}
                >
                    <img src={pfp} alt="Efficient" style={{ width: '24px', height: '24px' }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        Efficient
                    </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {taxScorePercentage ? taxScorePercentage + "%" : "10%"} {/* Display tax score percentage */}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Tax Score
                </Typography>
            </Box>
        </Box>
    );
}

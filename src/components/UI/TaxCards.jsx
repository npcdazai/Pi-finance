import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import pfp from '../../../public/images/logo/logo.png';
export default function TaxCards() {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }} >
            <Box
                sx={{
                    backgroundColor: '#865DDB',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'left',
                    width: '333px',
                    height: '100%',
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
                    1%
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Salary Bracket
                </Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: '#06AD44',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'left',
                    width: '333px',
                    height: '100%',
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
                        paddingX:"8px",
                        // marginBottom: '12px',
                        width: 'fit-content',
                        height:"28px"
                    }}
                >
                    <img src={pfp} alt="Efficient" style={{ width: '24px', height: '24px' }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        Efficient
                    </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    82%
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Tax Score
                </Typography>
            </Box>

        </Box>
    );
}

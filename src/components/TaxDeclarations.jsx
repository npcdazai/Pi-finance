import { Box, Typography } from '@mui/material'
import React from 'react'
import TaxTabs from "./UI/TaxTabs"

const TaxDeclarations = () => {
    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} >
                <Box display="flex" flexDirection="column" alignItems="flex-start" >
                    <Typography variant='h5' sx={{}} >Tax Declarations</Typography>
                    <Typography variant='caption' sx={{ color: "#667085" }} >Calculate your taxes</Typography>
                </Box>
                <TaxTabs />
            </Box>
        </div>
    )
}

export default TaxDeclarations

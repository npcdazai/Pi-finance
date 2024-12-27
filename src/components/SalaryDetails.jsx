import { Box, Typography } from '@mui/material'
import React from 'react'
import SalaryTable from './UI/SalaryTable'

const SalaryDetails = () => {

    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column" , gap:2 }} >
                <Box display="flex" flexDirection="column" alignItems="flex-start" >
                    <Typography variant='h5' sx={{}} >Salary Details</Typography>
                    <Typography variant='caption' sx={{ color: "#667085" }} >View your Salary Structure</Typography>
                </Box>
                <SalaryTable />
            </Box>
        </div>
    )
}

export default SalaryDetails

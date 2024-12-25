import React from 'react'
import Appbar from '../components/Appbar'
import { Box, Card, Container, Paper, Typography } from '@mui/material'
import PiButton from '../components/UI/PiButton'
import ProfileCard from '../components/UI/ProfileCard'
import avtar from "../../public/images/Avtar/avtar.png"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TaxCards from '../components/UI/TaxCards'
import EmployeeDetails from '../components/UI/EmployeeDetails'
import SalaryTable from '../components/SalaryDetails'

const Home = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: "4rem" }}>
            <Box display="flex" flexDirection="column" gap={4} >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: "2rem", justifyContent: "space-between", width: "100%" }} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
                        <Typography sx={{ color: "#101828", fontWeight: 600, fontSize: "30px" }} >Welcome back Abhijit, Talk to Pi to grow & save more money!</Typography>
                        <Typography sx={{ color: "#667085", fontSize: "16px", fontWeight: 400 }} >Track, manage and forecast your customers and orders.</Typography>
                    </Box>
                    <PiButton text={"Talk to Pi"} />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }} >
                        <Typography sx={{ color: "#000000B2", fontWeight: 500, fontSize: "16px" }} >Select Employee</Typography>
                        {/* <ProfileCard /> */}
                        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", boxShadow: 1, p: 1, gap: 2, borderRadius: "16px", width: "100%", height: "100%" }} >
                            <Box
                                component="img"
                                src={avtar}
                                height="72px"
                                width="72px"
                                borderRadius="50%"
                            />
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
                                <Typography sx={{ fontSize: "16px", color: "#000000", fontWeight: 500 }}>Abhijit Kumar</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: "2px", alignItems: "center" }} >
                                    <span style={{ fontSize: "14px", color: "#000000", fontWeight: 400 }} >Mumbai</span> .
                                    <span style={{ fontSize: "14px", color: "#000000", fontWeight: 400 }} >Salary: ₹20,000</span>
                                </Box>
                            </Box>
                            <KeyboardArrowDownIcon sx={{ height: "32px" }} />
                        </Card>
                    </Box>

                    <TaxCards />

                </Box>

                <EmployeeDetails />
                <SalaryTable/>
            </Box>
        </Container >
    )
}

export default Home

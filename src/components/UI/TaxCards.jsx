import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import pfp from '../../../public/images/logo/piLogo.png';
import { AppContext } from '../../context/AppContext';

export default function TaxCards() {
    const { selectedEmployee } = useContext(AppContext);
    const [grossSalary, setGrossSalary] = useState(null);
    const [salaryScore, setSalaryScore] = useState(null);
    const [taxDetails, setTaxDetails] = useState(null);
    const [taxScorePercentage, setTaxScorePercentage] = useState(0);

    // Fetch gross salary and salary score whenever selectedEmployee changes
    useEffect(() => {
        if (!selectedEmployee) return; // Exit if no employee is selected

        const fetchSalaryData = async () => {
            try {
                // Fetch user data (salary and tax-related details)
                const userDataResponse = await fetch(
                    `https://staging.getpi.in/backend/v1/hrms/hr/users/${selectedEmployee.employee_id}`
                );
                const userDataResult = await userDataResponse.json();

                if (userDataResult.status_code === 200) {
                    const userData = userDataResult.data[0];
                    
                    // Fetch gross salary
                    const grossSalaryResponse = await fetch(
                        'https://staging.getpi.in/backend/v1/hrms/hr/users/fetch/gross_annual_salary/' + selectedEmployee.employee_id,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ year: '2022-23' }),
                        }
                    );

                    const grossSalaryResult = await grossSalaryResponse.json();
                    if (grossSalaryResult.status_code === 200) {
                        const fetchedGrossSalary = grossSalaryResult.data;
                        setGrossSalary(fetchedGrossSalary);

                        // Fetch salary score using gross salary
                        const salaryScoreResponse = await fetch(
                            'https://staging.getpi.in/backend/v1/hrms/tax/salary_score',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ salary: fetchedGrossSalary.toString() }),
                            }
                        );

                        const salaryScoreResult = await salaryScoreResponse.json();
                        if (salaryScoreResult.status_code === 200) {
                            setSalaryScore(salaryScoreResult.data.salary_score);
                        }

                        // Prepare tax calculation data dynamically from userData
                        const taxCalculationResponse = await fetch(
                            'https://staging.getpi.in/backend/v1/hrms/tax/tax_calculation',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    totalSalary: fetchedGrossSalary,
                                    basicSalary: userData.userSalary[0].basic_salary,
                                    hra: userData.userSalary[0].hra,
                                    ltaAllowance: userData.userSalary[0].lta,
                                    foodAllowance: 0, // Use if available
                                    rentPaid: userData.userTax[0].HRA.rent_amount_annual,
                                    metroCity: userData.userData.location === 'Mumbai', // Assuming Mumbai is a metro city
                                    homeLoanInterest: userData.userTax[0].section_24b.interest_on_home_loan,
                                    lifeInsurance: userData.userTax[0]["80C"].life_insurance,
                                    elss: userData.userTax[0]["80C"].ELSS,
                                    providentFund: userData.userSalary[0].pf_contribution,
                                    taxSavingFDs: 0, // Include if available
                                    otherTaxSavingInvestment: 0, // Include if available
                                    nps: userData.userTax[0]["80CCD"].NPS,
                                    healthInsuranceSelfSpouse: userData.userTax[0]["80D"].health_insurance_for_self_and_family,
                                    healthInsuranceParents: userData.userTax[0]["80D"].health_insurance_for_parents,
                                    selfOrSpouseIsSenior: false, // Adjust based on user data
                                    seniorCitizenParents: false, // Adjust based on user data
                                    preventiveHealthCareExpenditure: 0, // Include if available
                                    interestPaidOnEducationLoan: 0, // Include if available
                                    interestOnHousingLoan80EE: 0, // Include if available
                                    donations80G: userData.userTax[0]["80G"].donations,
                                    interestIncomeSavingsAccount: 0, // Include if available
                                    gratuity: 0, // Include if available
                                    medicalAllowance: 0, // Include if available
                                }),
                            }
                        );

                        const taxCalculationResult = await taxCalculationResponse.json();
                        if (taxCalculationResult.status_code === 200) {
                            setTaxDetails(taxCalculationResult.data.response);
                            // Convert the tax score into a percentage
                           const totalTaxPayable = taxCalculationResult.data.response.newRegime?.totalTaxPayable || 5000; // Dummy value if undefined

                        // Ensure maxTaxPayable is not zero
                        const maxTaxPayable = grossSalaryResult.data * 0.3; // Assuming a max tax payable of 30% of gross salary
                        
                        // Avoid division by zero
                        if (maxTaxPayable > 0) {
                            const calculatedTaxScore = ((maxTaxPayable - totalTaxPayable) / maxTaxPayable) * 100;
                            setTaxScorePercentage(calculatedTaxScore.toFixed(2)); // Set the tax score as a percentage
                        } else {
                            setTaxScorePercentage(0); // Set 0% if maxTaxPayable is zero or invalid
                        }
                    
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching salary and tax data:', error);
            }
        };

        fetchSalaryData();
    }, [selectedEmployee]);

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

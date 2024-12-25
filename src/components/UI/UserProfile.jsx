import  { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

const UserProfile = () => {

    const [formData, setFormData] = useState({
        designation: 'Product Designer',
        interestIncome: '',
        age: '',
        rent: '',
        house: '',
        company: '',
        maritalStatus: '',
    });

    const [errors, setErrors] = useState({});

    // Validation function
    const validate = () => {
        const newErrors = {};

        if (!formData.designation.trim()) newErrors.designation = 'Designation is required.';
        if (!formData.interestIncome.match(/₹\d+(,\d{3})*(\.\d{2})?/)) newErrors.interestIncome = 'Invalid currency format.';
        if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) <= 0)
            newErrors.age = 'Age must be a positive number.';
        if (!formData.rent.match(/₹\d+(k)?/)) newErrors.rent = 'Invalid rent format.';
        if (!formData.house.trim()) newErrors.house = 'House field is required.';
        if (!formData.company.trim()) newErrors.company = 'Company field is required.';
        if (!['Unmarried', 'Married', 'Divorced'].includes(formData.maritalStatus))
            newErrors.maritalStatus = 'Invalid marital status.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            alert('Form submitted successfully!');
        } else {
            alert('Please fix the errors before submitting.');
        }
    };

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    padding: 4,
                }}
            >
                <Box>
                    <Typography variant="subtitle2">Designation</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.designation}
                        onChange={handleChange('designation')}
                        error={!!errors.designation}
                        helperText={errors.designation}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2">Interest Income</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.interestIncome}
                        onChange={handleChange('interestIncome')}
                        error={!!errors.interestIncome}
                        helperText={errors.interestIncome}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2">Age</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.age}
                        onChange={handleChange('age')}
                        error={!!errors.age}
                        helperText={errors.age}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2">Rent</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.rent}
                        onChange={handleChange('rent')}
                        error={!!errors.rent}
                        helperText={errors.rent}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2">House</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.house}
                        onChange={handleChange('house')}
                        error={!!errors.house}
                        helperText={errors.house}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2">Company</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.company}
                        onChange={handleChange('company')}
                        error={!!errors.company}
                        helperText={errors.company}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2">Marital Status</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={formData.maritalStatus}
                        onChange={handleChange('maritalStatus')}
                        error={!!errors.maritalStatus}
                        helperText={errors.maritalStatus}
                        fullWidth
                    />
                </Box>
            </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}  >
                    <Button sx={{ bgcolor: "#9747FF", color: "#fff", textTransform: "capitalize" }} type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>



        </div>
    );
};

export default UserProfile;

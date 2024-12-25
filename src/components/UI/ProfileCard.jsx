import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Card, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import pfp from '../../../public/images/Avtar/avtar.png';

export default function ProfileCard() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Card
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p:"1rem" , borderRadius: '12px', boxShadow: 3, justifyContent: "space-between", width: "100%" , height:"100%" }}
            >
                <Box
                    component="img"
                    src={pfp}
                    alt="CardAvatar"
                    sx={{ width: '60px', height: '60px', borderRadius: '50%' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 2 }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
                        Abhijit Kumar
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                        Mumbai • Salary: ₹20,000
                    </Typography>
                </Box>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    <KeyboardArrowDownIcon />
                </Box>
            </Card>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{width:"100%"}}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

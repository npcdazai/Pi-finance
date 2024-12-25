import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { HiMenuAlt4 } from 'react-icons/hi';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import logo from '../../public/images/logo/logo.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '0 2rem',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: '#000',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1.25),
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
}));

const LogoText = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: '#344054',
  fontSize: '14px',
  textTransform: 'lowercase',
  border: '1px solid #D0D5DD',
  borderRadius: '48px',
  padding: theme.spacing(1),
}));

const LogoutIconStyled = styled(LogoutIcon)(({ theme }) => ({
  height: '15.42px',
  width: '15.42px',
}));

export default function Appbar() {
  return (
    <Box sx={{ zIndex: "100", top: "0", position: "sticky" }} >
      <StyledAppBar sx={{boxShadow:"none"}} >
        <StyledToolbar>
          <Box display="flex" flexDirection="row" alignItems="center">
            <MenuButton size="large" edge="start" color="inherit" aria-label="menu">
              <HiMenuAlt4 />
            </MenuButton>
            <LogoContainer>
              <LogoImage src={logo} alt="Pi-Finance Logo" />
              <LogoText>
                <Typography color="#000000" fontWeight={700} fontSize="14px">
                  Financial
                </Typography>
                <Typography color="#8E8E8E" fontSize="14px" fontWeight={400}>
                  Dashboard
                </Typography>
              </LogoText>
            </LogoContainer>
          </Box>
          <LogoutButton>
            logout
            <LogoutIconStyled />
          </LogoutButton>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { HiMenuAlt4 } from 'react-icons/hi';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material/styles';
import logo from '../../public/images/logo/piLogo.png';

const drawerWidth = 240;

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
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch('https://staging.getpi.in/backend/v1/hrms/hr/user/refresh_data', {
        method: 'PUT',
      });
      if (response.ok) {
        console.log('Data refreshed successfully');
        // You can also add additional handling here if needed (e.g., showing a success message)
      } else {
        console.error('Failed to refresh data');
      }
    } catch (error) {
      console.error('Error while refreshing data:', error);
    }
  };

  const drawerContent = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleRefresh}>
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          <ListItemText primary="Refresh" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ zIndex: 100, top: 0, position: 'sticky' }}>
      <StyledAppBar sx={{ boxShadow: 'none' }}>
        <StyledToolbar>
          <Box display="flex" flexDirection="row" alignItems="center">
            <MenuButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

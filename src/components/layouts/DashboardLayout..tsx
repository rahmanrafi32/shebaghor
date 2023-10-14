import {ReactNode, useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar, Button} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {useRouter} from "next/navigation";
import isLoggedIn from "@/utils/isLoggedIn";
import MoreIcon from '@mui/icons-material/MoreVert';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Link from 'next/link'

type IProps = {
    children: ReactNode,
}

const adminMenu = [
    {
        name: 'Manage Service',
        icon: <DashboardIcon/>,
        link: '/manage-service'
    },
    {
        name: 'Manage User',
        icon: <AccountCircleIcon/>,
        link: '/manage-user'
    },
    {
        name: 'Manage Bookings',
        icon: <LocalMallIcon/>,
        link: '/manage-bookings'
    },
    {
        name: 'Manage Content',
        icon: <FileCopyIcon/>,
        link: '/manage-content'
    },
]

const userMenu = [
    {
        name: 'Manage Profile',
        icon: <AccountCircleIcon/>
    },
    {
        name: 'Bookings',
        icon: <LocalMallIcon/>
    },
]

const drawerWidth = 240;
const DashboardLayout = ({children}: IProps) => {
    const router = useRouter();
    const userLoggedIn = isLoggedIn();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        !userLoggedIn ? router.push('/login') : null
    }, [router, userLoggedIn]);

    const logout = () => {
        handleMobileMenuClose();
        localStorage.removeItem('token');
    }

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {adminMenu.map((item, index) => (
                    <Link key={index} href={`/dashboard${item.link}`} style={{textDecoration:'none', color:'#000'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link href={'/'} style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">Home</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={'/profile'} style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">Profile</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={'/all-services'} style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">All Services</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={'/service-orders'} style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">Service Orders</Typography>
                </Link>
            </MenuItem>
            <MenuItem onClick={() => logout()}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
    );


    return (
        <Box sx={{display: 'flex'}}>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
                color={'secondary'}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Link href={'/'}>
                            <Button sx={{color: '#fff'}}>
                                Home
                            </Button>
                        </Link>
                        <Link href={'/all-services'}>
                            <Button sx={{color: '#fff'}}>All Services </Button>
                        </Link>
                        <Box sx={{ml: 1}}>
                            <Avatar sx={{cursor: 'pointer'}} onClick={handleOpenUserMenu}>
                                <PersonIcon/>
                            </Avatar>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link href={'/profile'} style={{color: '#000', textDecoration: 'none'}}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Service Orders</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => logout()}>
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                {children}
            </Box>
            {renderMobileMenu}
        </Box>
    );
};

export default DashboardLayout;

import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, Button} from "@mui/material";
import {useEffect, useState} from "react";
import isLoggedIn from "@/utils/isLoggedIn";
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link'

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '40vw',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '35vw',
        },
    },
}));

export default function Appbar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [showSearchBar, setShowSearchBar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowSearchBar(true);
            } else {
                setShowSearchBar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        handleCloseUserMenu();
        handleMobileMenuClose();
        localStorage.removeItem('token');
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={mobileMenuId}
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
            {
                !isLoggedIn() ? (<MenuItem>
                    <Link href={'/login'} style={{color: '#000', textDecoration: 'none'}}>
                        <Typography textAlign="center">Login</Typography>
                    </Link>
                </MenuItem>) : (<MenuItem onClick={() => logout()}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>)
            }
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" color={'secondary'}>
                <Toolbar>
                    <Link href={'/'} style={{color: '#fff', textDecoration: 'none'}}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'none', sm: 'block'}}}
                        >
                            Sheba Ghor
                        </Typography>
                    </Link>
                    {
                        !showSearchBar ? <Box sx={{flexGrow: 1}}/> : null
                    }
                    <Box sx={{flexGrow: 1, display: showSearchBar ? 'block' : 'none'}}>
                        <Box
                            sx={{display: 'flex', justifyContent: 'center'}}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </Search>
                        </Box>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Link href={'/'}>
                            <Button sx={{color: '#fff'}}>
                                Home
                            </Button>
                        </Link>
                        <Link href={'/all-services'}>
                            <Button sx={{color: '#fff'}}>All Services </Button>
                        </Link>
                        {
                            !isLoggedIn() ? (<Link href={'/login'}>
                                <Button sx={{color: '#fff'}}>
                                    Login
                                </Button>
                            </Link>) : (<Box sx={{ml:1}}>
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
                                    </MenuItem><
                                    MenuItem onClick={() => logout()}>
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                                </Menu>
                            </Box>)
                        }
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
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}

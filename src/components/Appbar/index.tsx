import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import {Avatar, Button} from "@mui/material";
import {useEffect, useState} from "react";
import isLoggedIn from "@/utils/isLoggedIn";
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link'
import {getUserInfo} from "@/utils/getUserInfo";
import {useRouter, usePathname} from "next/navigation";
import CustomSearch from "@/components/CustomSearch";
import {useUserInfoQuery} from "@/redux/api/userApi";
import Image from "next/image";

export default function Appbar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [userImage, setUserImage] = useState('')
    const userLoggedIn = isLoggedIn();
    const router = useRouter();
    const pathName = usePathname();
    const {role} = getUserInfo() as any;

    const {data: userInfo} = useUserInfoQuery({});

    useEffect(() => {
        setUserImage(userInfo?.data?.image)
    }, [userInfo]);
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
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');
    }

    useEffect(() => {
        !userLoggedIn ? router.push('/login') : null
    }, [router, userLoggedIn]);


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
                <Link href={'/dashboard/profile'} style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">Profile</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={'/all-services'} style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">All Services</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={role === 'user' ? '/dashboard/user/bookings' : '/dashboard/manage-service'}
                      style={{color: '#000', textDecoration: 'none'}}>
                    <Typography textAlign="center">Dashboard</Typography>
                </Link>
            </MenuItem>)
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
                        pathName !== '/all-services' ? <Box sx={{flexGrow: 1}}/> : null
                    }
                    <Box sx={{flexGrow: 1, display: pathName === '/all-services' ? 'block' : 'none'}}>
                        <Box
                            sx={{display: 'flex', justifyContent: 'center'}}>
                            <CustomSearch/>
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
                            </Link>) : (<Box sx={{ml: 1}}>
                                <Avatar sx={{cursor: 'pointer'}} onClick={handleOpenUserMenu}>
                                    {
                                        userImage && userImage !== '' ?
                                            <Image src={userImage} alt={"user_image"} width={300}
                                                   height={300}
                                                   layout={'responsive'}/> :
                                            <PersonIcon/>
                                    }
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
                                        <Link href={'/dashboard/profile'}
                                              style={{color: '#000', textDecoration: 'none'}}>
                                            <Typography textAlign="center">Profile</Typography>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href={role === 'user' ? '/dashboard/user/bookings' : '/dashboard/manage-service'}
                                            style={{color: '#000', textDecoration: 'none'}}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => logout()}>
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

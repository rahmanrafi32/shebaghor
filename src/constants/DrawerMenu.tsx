import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Person3Icon from '@mui/icons-material/Person3';
import * as React from "react";
import {JSX} from "react";

interface DrawerItem {
    name: string;
    icon: JSX.Element;
    link: string;
}

export const adminMenu: DrawerItem[] = [
    {
        name: 'Profile',
        icon: <Person3Icon/>,
        link: '/profile'
    },
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

export const superAdmin: DrawerItem[] = [
    {
        name: 'Profile',
        icon: <Person3Icon/>,
        link: '/profile'
    },
    {
        name: 'Manage Service',
        icon: <DashboardIcon/>,
        link: '/manage-service'
    },
    {
        name: 'Manage User',
        icon: <Person3Icon/>,
        link: '/manage-user'
    },
    {
        name: 'Manage Admin',
        icon: <AccountCircleIcon/>,
        link: '/manage-admin'
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

export const userMenu: DrawerItem[] = [
    {
        name: 'Profile',
        icon: <Person3Icon/>,
        link: '/profile'
    },
    {
        name: 'Bookings',
        icon: <LocalMallIcon/>,
        link: '/user/bookings'
    }
]

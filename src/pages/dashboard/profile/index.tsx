import {ReactElement} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Link from "next/link";
import {useUserInfoQuery} from "@/redux/api/userApi";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = () => {
    const {data: userInfo, isLoading} = useUserInfoQuery({});
    return (
        <Container>
            <Toolbar/>
            {
                isLoading ? <CircularProgress/> : (<Box sx={{minHeight: '70vh'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Avatar sx={{width: 250, height: 250, backgroundColor: '#6c757d', marginBottom: '10px'}}>
                                {
                                    userInfo?.data?.image && userInfo?.data?.image !== '' ?
                                        <Image src={userInfo?.data?.image} alt={"user_image"} width={300} height={300}
                                               layout={'responsive'}/> :
                                        <Typography>{userInfo?.data?.firstName}</Typography>
                                }
                            </Avatar>
                            <Typography sx={{
                                typography: {
                                    md: 'h4',
                                    xs: 'h5'
                                }
                            }}>{userInfo?.data?.firstName} {userInfo?.data?.lastName}</Typography>
                        </Box>
                        <Grid
                            container
                            sx={{
                                width: {md: '30vw'},
                                p: 2,
                                mt: 2
                            }}
                        >
                            <Grid item xs={12} md={4}>
                                <Typography sx={{typography: {md: 'h5', xs: 'h6'}}}>Email</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography sx={{typography: {md: 'h5', xs: 'h6'}}}>{userInfo?.data?.email}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                width: {md: '30vw'},
                                p: 2,
                                mt: 1
                            }}
                        >
                            <Grid item xs={12} md={4}>
                                <Typography sx={{typography: {md: 'h5', xs: 'h6'}}}>Contact No</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography
                                    sx={{typography: {md: 'h5', xs: 'h6'}}}>{userInfo?.data?.contactNo}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                width: {md: '30vw'},
                                p: 2,
                                mt: 1
                            }}
                        >
                            <Grid item xs={12} md={4}>
                                <Typography variant={'h5'}>Address</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {
                                    userInfo?.data.houseNo === undefined
                                    || userInfo?.data.roadNo === undefined
                                    || userInfo?.data.area === undefined ?
                                        <Typography>NA</Typography> :
                                        <Typography variant={'h5'}>{userInfo?.data?.houseNo} <br/> Road
                                            No: {userInfo?.data?.roadNo}, <br/> {userInfo?.data?.area}</Typography>
                                }
                            </Grid>
                        </Grid>
                        <Link href={'/dashboard/profile/edit-profile'}>
                            <Button
                                variant={'contained'}
                                color={'secondary'}
                                sx={{mt: 5}}
                            >
                                Edit Profile
                            </Button>
                        </Link>
                    </Box>
                </Box>)
            }
        </Container>
    );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}


import {ReactElement} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Person2Rounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Profile = () => {
    return (
        <Container>
            <Toolbar/>
            <Box sx={{minHeight: '70vh'}}>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2}}>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar sx={{width: 100, height: 100, backgroundColor: '#6c757d', marginBottom: '10px'}}>
                            <Person2Rounded fontSize={'large'}/>
                        </Avatar>
                        <Typography sx={{typography: {md: 'h4', xs: 'h5'}}}>Md Minhazur Rahman</Typography>
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
                            <Typography sx={{typography: {md: 'h5', xs: 'h6'}}}>rafi.rahman03@gmail.com</Typography>
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
                            <Typography sx={{typography: {md: 'h5', xs: 'h6'}}}>01686823262</Typography>
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
                            <Typography variant={'h5'}>183/56 kazi villa, <br/> Road No: 12, <br/> Bagbari</Typography>
                        </Grid>
                    </Grid>
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        sx={{mt: 5}}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}


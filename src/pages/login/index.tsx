import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import loginImage from '../../assets/12146011_Wavy_Gen-01_Single-07.jpg'
import Image from "next/image";
import TextField from "@mui/material/TextField";

const Login = () => {
    return (
        <Grid
            container
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{height: '100vh', padding: 10}}
        >
            <Grid
                item
                xs={12}
                md={6}
                sx={{display: 'flex', justifyContent: 'center'}}
            >
                <Image src={loginImage} alt={'login image'} layout="responsive"  width={500} height={600}/>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            >
                <Typography variant={'h3'} sx={{mb: 10}}>Login</Typography>
                <TextField fullWidth placeholder={'Enter username'} label={'Username'} sx={{mb: 5, width: {md: '30vw', xs: '80vw'}}}/>
                <TextField placeholder={'Enter password'} label={'Password'} sx={{mb: 5, width: {md: '30vw', xs: '80vw'}}}/>
            </Grid>
        </Grid>
    )
};

export default Login;

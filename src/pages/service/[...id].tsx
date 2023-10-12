import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Image from "next/image";
import BannerImage from "@/assets/colorful-2174045_1280.webp";
import Typography from "@mui/material/Typography";
import {Avatar, Button, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import PersonIcon from '@mui/icons-material/Person';
import TextField from "@mui/material/TextField";

const Service = () => {
    return (
        <Box>
            <Box sx={{position: 'relative', width: '100%', height: '550px'}}>
                <Image
                    src={BannerImage}
                    alt="Banner Image"
                    layout="fill"
                    objectFit="cover"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <Typography variant={'h2'}>Your Personal Assistant</Typography>
                    <Typography variant={'h6'}>One-stop solution for your services. Order any service,
                        anytime.</Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', m: 5}}>
                <Typography variant={'h4'}>Overview Of Service</Typography>
            </Box>
            <Container>
                <Typography sx={{fontWeight: 'bold'}} variant={'h6'}>What is included</Typography>
                <ul>
                    <li>First</li>
                    <li>Second</li>
                </ul>
            </Container>
            <Container>
                <Typography sx={{fontWeight: 'bold'}} variant={'h6'}>What is Excluded</Typography>
                <ul>
                    <li>First</li>
                    <li>Second</li>
                </ul>
            </Container>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 5, mb: 5}}>
                <Typography variant={'h4'}>FAQ</Typography>
            </Box>
            <Container>
                <ul>
                    <li>First</li>
                    <li>Second</li>
                </ul>
            </Container>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 5, mb: 5}}>
                <Typography variant={'h4'}>Reviews</Typography>
            </Box>
            <Container>
                <Grid container direction={'column'} alignItems={'start'}>
                    <Grid item sx={{display: 'flex', justifyContent: "center", alignItems: 'center', mb: 2}}>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                        <Box sx={{ml: 2}}>
                            <Typography variant={'h6'}>Name</Typography>
                            <Typography>This is sample review</Typography>
                        </Box>
                    </Grid>
                    <Grid item sx={{display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                        <Box sx={{ml: 2}}>
                            <Typography variant={'h6'}>Name</Typography>
                            <Typography>This is sample review</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{mt: 5, width: '50vw'}}>
                    <TextField
                        fullWidth
                        label={"Review"}
                        multiline
                        maxRows={4}
                        placeholder={'Write your review here.'}
                        sx={{mb: 2}}
                    />
                    <Button variant={'contained'}>Submit</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Service;

Service.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

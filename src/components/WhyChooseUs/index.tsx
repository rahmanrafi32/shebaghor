import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import Image from "next/image";

import img_mask from '@/assets/img.png';
import img_call from '@/assets/img_1.png';
import img_sanitize from '@/assets/img_2.png';
import img_gloves from '@/assets/img_3.png';
import img_team from '@/assets/img_4.png';
import Box from "@mui/material/Box";

const WhyChooseUs = () => {
    return (
        <Box sx={{mt: 10,backgroundColor: '#f7faff', height: {md:'45vh'}}}>
            <Container sx={{ p: 3}}>
                <Typography>Why Choose Us?</Typography>
                <Typography variant={'h4'}>Because we care about your safety..</Typography>
                <Grid container spacing={4} sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: {md: '14vw'}, height: {md: '13vh'}, p: 1}}>
                                    <Image src={img_mask} alt={'mask_image'} width={70} height={70}/>
                                    <Typography variant={'h6'}>Ensuring <br/> Masks</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: {md: '14vw'}, height: {md: '13vh'}, p: 1}}>
                                    <Image src={img_call} alt={'call_image'} width={60} height={60}/>
                                    <Typography variant={'h6'}>24/7 <br/> Support</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: {md: '14vw'}, height: {md: '13vh'}, p: 1}}>
                                    <Image src={img_sanitize} alt={'sanitize_image'} width={60} height={60}/>
                                    <Typography variant={'h6'}>Sanitising <br/> Hands &<br/>Equipment</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: {md: '14vw'}, height: {md: '13vh'}, p: 1}}>
                                    <Image src={img_gloves} alt={'gloves_image'} width={60} height={60}/>
                                    <Typography variant={'h6'}>Sanitising <br/> Hands &<br/>Equipment</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Image src={img_team} alt={'team_image'} width={300} height={400} layout={'responsive'}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};

export default WhyChooseUs;

import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {renderTimeViewClock} from '@mui/x-date-pickers/timeViewRenderers';
import Box from "@mui/material/Box";
import EventIcon from '@mui/icons-material/Event';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import Divider from "@mui/material/Divider";
import HomeWorkSharpIcon from '@mui/icons-material/HomeWorkSharp';
import TextField from "@mui/material/TextField";
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import Button from "@mui/material/Button";

const Checkout = () => {
    return (
        <Container>
            <Grid container sx={{p: {md: 5, xs: 2}}} spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{display: 'flex', p: 2}}>
                        <EventIcon fontSize={'large'} sx={{mr: 2}} color={'primary'}/>
                        <Box>
                            <Typography variant={'h5'}>Book Schedule</Typography>
                            <Typography variant={'subtitle2'} sx={{mb: 1}}>Expert will arrive at your given address
                                within this time</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    defaultValue={moment()}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    disablePast
                                    onChange={(value) => console.log(moment(value).unix())}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Paper>
                    <Paper sx={{display: 'flex', mt: 2, p: 2}}>
                        <PersonSharpIcon fontSize={'large'} sx={{mr: 2}} color={'primary'}/>
                        <Box>
                            <Typography variant={'h5'}>Contact Person</Typography>
                            <Typography variant={'subtitle2'} sx={{mb: 1}}>
                                Expert will contact with following person
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: {xs: 'column', md: 'row'},
                                justifyContent: 'center'
                            }}>
                                <Typography variant={'h6'}>Md Minhazur Rahman</Typography>
                                <Divider sx={{display: {xs: 'none', md: 'block'}}} orientation={'horizontal'}
                                         variant={'middle'}/>
                                <Typography variant={'h6'}>01686823262</Typography>
                                <Divider sx={{display: {xs: 'none', md: 'block'}}} orientation={'horizontal'}
                                         variant={'middle'}/>
                                <ModeEditSharpIcon/>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper sx={{display: 'flex', mt: 2, p: 2}}>
                        <HomeWorkSharpIcon fontSize={'large'} sx={{mr: 2}} color={'primary'}/>
                        <Box>
                            <Typography variant={'h5'}>Home Address</Typography>
                            <Typography variant={'subtitle2'} sx={{mb: 1}}>
                                Expert will arrive at the address given below
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: {xs: 'column', md: 'row'},
                                justifyContent: 'center'
                            }}>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <TextField sx={{mt: 2, mr: {md: 2}}}/>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField sx={{mt: 2}}/>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField sx={{mt: 2, mr: {md: 2}}}/>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField sx={{mt: 2}}/>
                                    </Grid>
                                </Grid>
                                <ModeEditSharpIcon sx={{ml: 2, mt: 2}}/>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper sx={{display: 'flex', mt: 2, p: 2}}>
                        <DescriptionRoundedIcon fontSize={'large'} sx={{mr: 2}} color={'primary'}/>
                        <Box>
                            <Typography variant={'h5'}>Contact Person</Typography>
                            <Typography variant={'subtitle2'} sx={{mb: 1}}>
                                Our service provider will confirm the following service
                            </Typography>
                            <Box sx={{
                                display: 'flex'
                            }}>
                                <Typography variant={'h6'} sx={{fontWeight: 'bold'}}>Gas Stove/Burner
                                    Installation</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{minWidth: '20vw', minHeight: '77vh', p: 2}}>
                        <Typography variant={'h5'}>Order Summary</Typography>
                        <Box sx={{mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>Gas Stove/Burner
                                Installation</Typography>
                            <Typography variant={'h6'}>$1200</Typography>
                        </Box>

                        <Divider sx={{mt: 3}}/>

                        <Box sx={{mt: 5, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>
                                Subtotal
                            </Typography>
                            <Typography variant={'h6'}>$1200</Typography>
                        </Box>
                        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>
                                Delivery Charge
                            </Typography>
                            <Typography variant={'h6'}>$0</Typography>
                        </Box>
                        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>
                                Discount
                            </Typography>
                            <Typography variant={'h6'}>$0</Typography>
                        </Box>

                        <Divider sx={{mt: 3}}/>
                        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>
                                Amount To be Paid
                            </Typography>
                            <Typography variant={'h6'}>$1200</Typography>
                        </Box>
                        <Typography variant={'subtitle1'} sx={{mt: 1, color: '#9a9a9a'}}>
                            *Prices are VAT exclusive
                        </Typography>
                        <Typography variant={'subtitle1'} sx={{mt: 1, color: '#9a9a9a'}}>
                            *Price may vary depending on product availability
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10}}>
                            <Button
                                variant={'contained'}
                                size={'large'}
                                color={'secondary'}
                                sx={{width: {md: '30vw', xs: '100vw'}}}
                            >
                                Place Order
                            </Button>
                        </Box>
                        <Typography variant={'subtitle1'} sx={{mt: 1, color: '#9a9a9a'}}>
                            By placing order, I agree to the terms & conditions
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;

Checkout.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}


import {ReactElement, useEffect, useState} from "react";
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
import Divider from "@mui/material/Divider";
import HomeWorkSharpIcon from '@mui/icons-material/HomeWorkSharp';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import Button from "@mui/material/Button";
import {useUserInfoQuery} from "@/redux/api/userApi";
import {useRouter} from "next/router";
import isLoggedIn from "@/utils/isLoggedIn";
import {useGetServiceByIdQuery} from "@/redux/api/serviceApi";
import {useCreateBookingMutation} from "@/redux/api/bookingApi";
import CustomSnackBar from "@/components/CustomSnackbar";

const Checkout = () => {
    const [deliveryCharge, setDeiveryCharge] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('success');
    const router = useRouter();
    const userLoggedIn = isLoggedIn();
    const id = router.query.id as string;
    const {data: serviceInfo, isLoading: isServiceInfoLoading} = useGetServiceByIdQuery(id);

    useEffect(() => {
        !userLoggedIn ? router.push('/login') : null
    }, [router, userLoggedIn]);

    const [bookingTime, setBookingTime] = useState(moment().unix())
    const [bookingData, setBookingData] = useState({
        bookingTime: moment().unix(),
        user: '',
        service: '',
        totalAmount: 0
    });
    const {data: userInfo, isLoading} = useUserInfoQuery({});
    const serviceInfoPrice = serviceInfo?.data?.price || 0;
    const totalAmount = Number(serviceInfoPrice) + deliveryCharge - discount;

    useEffect(() => {
        const updatedBookingData = {
            bookingTime: bookingTime,
            user: userInfo?.data?.id,
            service: serviceInfo?.data?.id,
            totalAmount
        };
        setBookingData(updatedBookingData);
    }, [bookingTime, userInfo, serviceInfo, totalAmount]);

    const [confirmBooking] = useCreateBookingMutation();
    const handleBooking = async () => {
        console.log('booking', bookingData)
        const response = await confirmBooking(bookingData).unwrap();
        if (response.success) {
            setOpen(true);
            setSeverity('success');
            setSnackbarMessage(response.message)
            setTimeout(() => {
                router.push('/');
            }, 2100);
        }
    }

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
                                    defaultValue={moment.unix(bookingTime)}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    disablePast
                                    onChange={(value) => setBookingTime(moment(value).unix())}
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
                                <Typography
                                    variant={'h6'}>{userInfo?.data?.firstName} {userInfo?.data?.lastName}</Typography>
                                <Divider sx={{display: {xs: 'none', md: 'block'}}} orientation={'horizontal'}
                                         variant={'middle'}/>
                                <Typography variant={'h6'}>{userInfo?.data?.contactNo}</Typography>
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
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography>House No : {userInfo?.data?.houseNo}</Typography>
                                <Typography>Road No : {userInfo?.data?.roadNo}</Typography>
                                <Typography>Floor : {userInfo?.data?.floor}</Typography>
                                <Typography>Area : {userInfo?.data?.area}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper sx={{display: 'flex', mt: 2, p: 2}}>
                        <DescriptionRoundedIcon fontSize={'large'} sx={{mr: 2}} color={'primary'}/>
                        <Box>
                            <Typography variant={'h5'}>Service</Typography>
                            <Typography variant={'subtitle2'} sx={{mb: 1}}>
                                Our service provider will confirm the following service
                            </Typography>
                            <Box sx={{
                                display: 'flex'
                            }}>
                                <Typography variant={'h6'}
                                            sx={{fontWeight: 'bold'}}>{serviceInfo?.data?.name}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{minWidth: '20vw', minHeight: '72vh', p: 2}}>
                        <Typography variant={'h5'}>Order Summary</Typography>
                        <Box sx={{mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>
                                {serviceInfo?.data?.name}
                            </Typography>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold',}}>
                                ${serviceInfo?.data?.price}
                            </Typography>
                        </Box>
                        <Divider sx={{mt: 3}}/>
                        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'}>
                                Delivery Charge
                            </Typography>
                            <Typography variant={'h6'}>${deliveryCharge}</Typography>
                        </Box>
                        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'}>
                                Discount
                            </Typography>
                            <Typography variant={'h6'}>${discount}</Typography>
                        </Box>

                        <Divider sx={{mt: 3}}/>
                        <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant={'h6'}>
                                Amount To be Paid
                            </Typography>
                            <Typography variant={'h6'} sx={{fontWeight: 'bold'}}>${totalAmount}</Typography>
                        </Box>
                        <Typography variant={'subtitle1'} sx={{mt: 1, color: '#9a9a9a'}}>
                            *Prices are VAT exclusive
                        </Typography>
                        <Typography variant={'subtitle1'} sx={{mt: 1, color: '#9a9a9a'}}>
                            *Price may vary depending on product availability
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20}}>
                            <Button
                                variant={'contained'}
                                size={'large'}
                                color={'secondary'}
                                sx={{width: {md: '30vw', xs: '100vw'}}}
                                onClick={handleBooking}
                            >
                                Confirm Booking
                            </Button>
                        </Box>
                        <Typography variant={'subtitle1'} sx={{mt: 1, color: '#9a9a9a'}}>
                            By placing order, I agree to the terms & conditions
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Container>
    );
};

export default Checkout;

Checkout.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}


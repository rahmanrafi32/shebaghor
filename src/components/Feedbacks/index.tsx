import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Box,
} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import {useGetFeedbacksQuery} from "@/redux/api/feedbackApi";

const Feedbacks = () => {
    const {data: feedbacks} = useGetFeedbacksQuery({});
    return (
        <Container>
            <Typography sx={{typography: {md: 'h4', xs: 'h5'}, mt: 10, mb: 5}} align={'center'}>What Our Valuable
                Customer
                Says</Typography>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination]}
            >
                <Grid container spacing={3}>
                    {feedbacks?.data?.map((testimonial: any) => (
                        <SwiperSlide key={testimonial.id}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Avatar src={testimonial?.feedbackerId?.image}
                                                    alt={testimonial?.feedbackerId?.firstName}/>
                                            <Typography variant="h6" sx={{textAlign: "center"}}>
                                                {testimonial?.feedbackerId?.firstName} {testimonial?.feedbackerId?.lastName}
                                            </Typography>
                                        </Box>
                                        <Typography paragraph sx={{width: {md: '25vw'}, height: {md: '10vh'}}}>
                                            {testimonial.feedback}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </SwiperSlide>
                    ))}
                </Grid>
            </Swiper>
        </Container>
    );
};

export default Feedbacks;

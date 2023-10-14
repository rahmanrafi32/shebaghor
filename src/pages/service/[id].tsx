import {ReactElement, useState} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {Avatar, Button, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import PersonIcon from '@mui/icons-material/Person';
import TextField from "@mui/material/TextField";
import {useAddReviewMutation, useGetServiceByIdQuery} from "@/redux/api/serviceApi";
import {useRouter} from "next/router";
import CircularProgress from '@mui/material/CircularProgress';

const Service = () => {
    const {query} = useRouter();
    const {data, isLoading} = useGetServiceByIdQuery(query.id);

    const [visibleReviews, setVisibleReviews] = useState(5);
    const [reviews, setReviews] = useState({
        reviewer: 'Mahfuz Rahman',
        review: '',
        id: query.id
    });
    const [addReview] = useAddReviewMutation();

    const onReviewSubmit = async () => {
        const res = await addReview(reviews).unwrap();
        if (res.success) {
            setReviews({...reviews, review: ''})
        }
    }

    return isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <CircularProgress/>
        </div>
    ) : (
        <Box>
            <Box sx={{position: 'relative', width: '100%', height: '550px'}}>
                <Image
                    src={data?.data?.image}
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
                    <Typography variant={'h2'}>{data?.data?.name}</Typography>
                    <Typography variant={'h4'}>Price: {data?.data?.price}</Typography>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        color={'secondary'}
                        sx={{mt: 7}}
                    >
                        Order service
                    </Button>
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', m: 5}}>
                <Typography variant={'h4'}>Overview Of Service</Typography>
            </Box>
            <Container>
                <Typography sx={{fontWeight: 'bold'}} variant={'h6'}>What is included</Typography>
                <ul>
                    {
                        data?.data?.whatsInclude.map((item: string, index: number) => <li key={index}>{item}</li>)
                    }
                </ul>
            </Container>
            <Container>
                <Typography sx={{fontWeight: 'bold'}} variant={'h6'}>What is Excluded</Typography>
                <ul>
                    {
                        data?.data?.whatsExclude.map((item: string, index: number) => <li key={index}>{item}</li>)
                    }
                </ul>
            </Container>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 5, mb: 5}}>
                <Typography variant={'h4'}>Reviews</Typography>
            </Box>
            <Container>
                <Grid container direction={'column'} alignItems={'start'}>
                    {
                        data?.data?.reviews.slice(0, visibleReviews).map((item: { reviewer: string, review: string }, index: number) => (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    mb: 2
                                }}
                            >
                                <Avatar>
                                    <PersonIcon/>
                                </Avatar>
                                <Box sx={{ml: 2, width: '10vw'}}>
                                    <Typography variant={'h6'}>{item.reviewer}</Typography>
                                    <Typography>{item.review}</Typography>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
                {data?.data?.reviews.length > visibleReviews ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 5, mb: 5}}>
                        <Button
                            variant="contained"
                            onClick={() => setVisibleReviews(visibleReviews + 5)} // Load the next 5 reviews
                        >
                            View More
                        </Button>
                    </Box>) : null}
                <Box sx={{mt: 5, width: '50vw'}}>
                    <TextField
                        fullWidth
                        label={"Review"}
                        multiline
                        maxRows={4}
                        value={reviews.review}
                        placeholder={'Write your review here.'}
                        sx={{mb: 2}}
                        onChange={(event) => setReviews({...reviews, review: event.target.value})}
                    />
                    <Button
                        variant={'contained'}
                        onClick={() => onReviewSubmit()}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Service;

Service.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

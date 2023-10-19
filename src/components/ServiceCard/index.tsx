import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from 'next/link'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Service} from "@/interfaces/common";
import Container from "@mui/material/Container";

type ServiceCardProps = {
    serviceType: string;
    serviceData: Service[];
};

const ServiceCards = ({serviceType, serviceData}: ServiceCardProps) => {
    return (
        <Container>
            <Grid container
                  direction={'column'}
                  alignItems={'center'}
            >
                <Grid item xs={12}
                      sx={{display: 'flex', justifyContent: 'space-between', width: {md: '70vw', xs: '95vw'}}}>
                    <Typography sx={{typography: {md: 'h4', xs: 'h6'}, mt: 10, mb: 5}}>{serviceType}</Typography>
                    <Link href={'/all-services'} style={{textDecoration: 'none'}}>
                        <Typography
                            sx={{typography: {md: 'h6', xs: 'body'}, mt: 10, mb: 5, display: 'flex', alignItems: 'center'}}
                            color={'secondary'}>
                            View More
                            <KeyboardArrowRightIcon/>
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Grid container direction={'row'} justifyContent={'center'} spacing={4}>
                        {
                            serviceData?.map((service: Service, index: number) => (
                                <Grid
                                    item
                                    key={index}
                                >
                                    <Link href={`/service/${service.id}`} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: '#000'
                                    }}>

                                        <Image
                                            src={service.image}
                                            alt={'gas stove image'}
                                            width={250}
                                            height={150}
                                            style={{borderRadius: '5px', marginBottom: 5}}
                                        />
                                        <Typography align={'center'} sx={{typography: {md: 'h5', xs: 'h6'}}}>
                                            {service.name}
                                        </Typography>

                                    </Link>
                                </Grid>)
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ServiceCards;

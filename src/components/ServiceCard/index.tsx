import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import {Link} from "@mui/material";

type IService = { image: string, name: string }
const ServiceCards = ({serviceType, serviceData}: { serviceType: string, serviceData: any }) => {
    return (
        <Grid container
              direction={'column'}
              alignItems={'center'}
        >
            <Typography variant={'h4'} sx={{mt: 10, mb: 5}}>{serviceType}</Typography>
            <Grid item xs={6} md={3}>
                <Grid container direction={'row'} justifyContent={'center'} spacing={4}>
                    {
                        serviceData?.map((service: IService, index: number) => (
                            <Link href={'all-services'} key={index} style={{textDecoration:'none', color:'#000'}}>
                                <Grid

                                    item
                                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                                >
                                    <Image src={service.image} alt={'gas stove image'} width={250} height={150}
                                           style={{borderRadius: '5px', marginBottom: 5}}/>
                                    <Typography align={'center'} variant="h5">
                                        {service.name}
                                    </Typography>
                                </Grid>
                            </Link>)
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ServiceCards;

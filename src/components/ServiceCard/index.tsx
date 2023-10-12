import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import gasStoveImg from "@/assets/gastove.jpg";

const ServiceCards = ({serviceName}: { serviceName: string }) => {
    return (
        <Grid container
              direction={'column'}
              alignItems={'center'}
        >
            <Typography variant={'h4'} sx={{mt: 10, mb: 5}}>{serviceName}</Typography>
            <Grid item xs={6} md={3}>
                <Grid container direction={'row'} justifyContent={'center'} spacing={4}>
                    <Grid item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Image src={gasStoveImg} alt={'gas stove image'} width={250} height={150}
                               style={{borderRadius: '5px', marginBottom: 5}}/>
                        <Typography align={'center'} variant="h5">
                            Burner Services
                        </Typography>
                    </Grid>
                    <Grid item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Image src={gasStoveImg} alt={'gas stove image'} width={250} height={150}
                               style={{borderRadius: '5px', marginBottom: 5}}/>
                        <Typography align={'center'} variant="h5">
                            Burner Services
                        </Typography>
                    </Grid>
                    <Grid item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Image src={gasStoveImg} alt={'gas stove image'} width={250} height={150}
                               style={{borderRadius: '5px', marginBottom: 5}}/>
                        <Typography align={'center'} variant="h5">
                            Burner Services
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ServiceCards;

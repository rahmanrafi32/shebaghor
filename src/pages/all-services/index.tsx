import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import {GetStaticProps} from "next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Link} from "@mui/material";
import Image from "next/image";

type IService = {
    id: string,
    image: string,
    name: string
}
const AllServicesPage = ({allServices}: any) => {
    return (
        <Grid container
              direction={'column'}
              alignItems={'center'}
        >
            <Typography variant={'h4'} sx={{mt: 10, mb: 5}}>All Services</Typography>
            <Grid item xs={6} md={3}>
                <Grid container direction={'row'} justifyContent={'center'} spacing={4}>
                    {
                        allServices?.map((service: IService, index: number) => (
                                <Grid
                                    item
                                    key={index}
                                >
                                    <Link href={`/service/${service.id}`}
                                          style={{
                                              display: 'flex',
                                              flexDirection: 'column',
                                              alignItems: 'center',
                                              textDecoration: 'none',
                                              color: '#000'
                                          }}>
                                        <Image src={service.image} alt={'gas stove image'} width={250} height={150}
                                               style={{borderRadius: '5px', marginBottom: 5}}/>
                                        <Typography align={'center'} variant="h5">
                                            {service.name}
                                        </Typography>
                                    </Link>
                                </Grid>
                            )
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AllServicesPage;

AllServicesPage.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('http://localhost:8080/api/v1/services');
    const data = await response.json();
    return {
        props: {
            allServices: data.data
        }
    }
}

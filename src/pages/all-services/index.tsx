import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import {GetStaticProps} from "next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from 'next/link'
import {useAppSelector} from "@/redux/hooks";
import {useGetAllServicesQuery} from "@/redux/api/serviceApi";
import CircularProgress from "@mui/material/CircularProgress";

type IService = {
    id: string,
    image: string,
    name: string
}
const AllServicesPage = () => {
    const {name, searchTerm} = useAppSelector((state) => state.service.filterOptions)
    const {data: services, isLoading} = useGetAllServicesQuery({name, searchTerm});
    return (
        <Grid container
              direction={'column'}
              alignItems={'center'}
        >
            <Typography variant={'h4'} sx={{mt: 10, mb: 5}}>All Services</Typography>
            {
                isLoading ? <CircularProgress/> : null
            }
            <Grid item xs={6} md={3}>
                <Grid container direction={'row'} justifyContent={'center'} spacing={4}>
                    {
                        services?.data?.map((service: IService, index: number) => (
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

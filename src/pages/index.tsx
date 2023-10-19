import {Fragment, ReactElement, useEffect, useState} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import AllServices from "@/components/AllServices";
import UpcomingServices from "@/components/UpcomingServices";
import {useGetAllServicesQuery} from "@/redux/api/serviceApi";
import {Service} from "@/interfaces/common";
import Feedbacks from "@/components/Feedbacks";
import WhyChooseUs from "@/components/WhyChooseUs";
import isLoggedIn from "@/utils/isLoggedIn";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [regularServices, setRegularServices] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [upcomingServices, setUpcomingServices] = useState([]);
    const userLoggedIn = isLoggedIn();

    const {data, isLoading, isError} = useGetAllServicesQuery({});

    useEffect(() => {
        !userLoggedIn ? router.push('/login') : null
        if (data && data.data) {
            const regular = data.data.filter((service: Service) => service.serviceType === 'regular').slice(0, 5);
            const featured = data.data.filter((service: Service) => service.serviceType === 'featured').slice(0, 5);
            const upcoming = data.data.filter((service: Service) => service.serviceType === 'upcoming').slice(0, 5);

            setRegularServices(regular);
            setFeaturedServices(featured);
            setUpcomingServices(upcoming);
        }
    }, [data, router, userLoggedIn]);

    return (
        <Fragment>
            <Banner/>
            <Featured featuredServices={featuredServices}/>
            <AllServices allServices={regularServices}/>
            <UpcomingServices upcomingServices={upcomingServices}/>
            <WhyChooseUs/>
            <Feedbacks/>
        </Fragment>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

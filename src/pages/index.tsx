import {Fragment, ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import AllServices from "@/components/AllServices";
import UpcomingServices from "@/components/UpcomingServices";
import {useGetAllServicesQuery} from "@/redux/api/serviceApi";

export default function Home() {
    const {data, isLoading, isError} = useGetAllServicesQuery({});
    const firstFiveServices = data?.data.slice(0, 5);
    return (
        <Fragment>
            <Banner/>
            <Featured/>
            <AllServices allServices={firstFiveServices}/>
            <UpcomingServices/>
        </Fragment>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

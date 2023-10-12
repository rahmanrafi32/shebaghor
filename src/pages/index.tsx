import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import AllServices from "@/components/AllServices";
import UpcomingServices from "@/components/UpcomingServices";

export default function Home() {
    return (
        <>
            <Banner/>
            <Featured/>
            <AllServices/>
            <UpcomingServices/>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

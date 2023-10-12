import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import AllServices from "@/components/AllServices";

const AllServicesPage = () => {
    return (
        <div>
            <AllServices/>
            <AllServices/>
            <AllServices/>
            <AllServices/>
            <AllServices/>
        </div>
    );
};

export default AllServicesPage;

AllServicesPage.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}

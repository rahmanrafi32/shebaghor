import {ReactElement} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const ManageContents = () => {
    return (
        <div>
            <h1>Manage Services</h1>
        </div>
    );
};

export default ManageContents;

ManageContents.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

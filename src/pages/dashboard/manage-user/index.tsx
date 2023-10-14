import {ReactElement} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout.";

const ManageUsers = () => {
    return (
        <div>
            <h1>Manage Services</h1>
        </div>
    );
};

export default ManageUsers;

ManageUsers.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

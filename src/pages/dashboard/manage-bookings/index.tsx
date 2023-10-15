import {ReactElement} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const ManageBookings = () => {
    return (
        <div>
            <h1>Manage Bookings</h1>
        </div>
    );
};

export default ManageBookings;

ManageBookings.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

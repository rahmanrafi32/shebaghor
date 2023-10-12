import Typography from "@mui/material/Typography";
import {ReactElement} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout.";

const AdminDashboard = () => {
    const data = "Hello"
    return (
        <div>
            <Typography>This is Admin Dashboard</Typography>
        </div>
    );
};

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

export default AdminDashboard;

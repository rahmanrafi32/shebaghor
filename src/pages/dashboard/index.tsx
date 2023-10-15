import {ReactElement} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Dashboard = () => {
    return (
        <div>
            <h1>This is dashboard.</h1>
        </div>
    );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

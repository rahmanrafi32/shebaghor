import {ReactElement, useEffect} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useRouter} from "next/navigation";
import {getUserInfo} from "@/utils/getUserInfo";

const ManageContents = () => {
    const router = useRouter();
    const user = getUserInfo() as any;

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);
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

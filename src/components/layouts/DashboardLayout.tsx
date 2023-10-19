import {ReactNode, useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import isLoggedIn from "@/utils/isLoggedIn";
import {useRouter} from "next/navigation";
import {store} from "@/redux/store";
import {Provider} from "react-redux";
import MainDashboard from "@/components/MainDashboard";

type IProps = {
    children: ReactNode
}
const DashboardLayout = ({children}: IProps) => {
    const userLoggedIn = isLoggedIn();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!userLoggedIn) {
            router.push("/login");
        }
        setIsLoading(true);
    }, [router, isLoading, userLoggedIn]);

    if (!isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <Provider store={store}>
            <MainDashboard>{children}</MainDashboard>
        </Provider>
    );
};

export default DashboardLayout;

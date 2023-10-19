import {Fragment, ReactNode, useEffect, useState} from "react";
import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from '@mui/material/CircularProgress';
import isLoggedIn from "@/utils/isLoggedIn";
import {useRouter} from "next/navigation";
import {store} from "@/redux/store";
import {Provider} from "react-redux";

type IProps = {
    children: ReactNode
}
const RootLayout = ({children}: IProps) => {
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
            <Appbar/>
            <Toolbar/>
            <div style={{minHeight: '100vh'}}>{children}</div>
            <Footer/>
        </Provider>
    );
};

export default RootLayout;

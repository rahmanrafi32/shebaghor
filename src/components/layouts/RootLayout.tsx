import {Fragment, ReactNode, useEffect, useState} from "react";
import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from '@mui/material/CircularProgress';
import isLoggedIn from "@/utils/isLoggedIn";
import {useRouter} from "next/navigation";

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
        <Fragment>
            <Appbar/>
            <Toolbar/>
            <div className={'h-full'}>{children}</div>
            <Footer/>
        </Fragment>
    );
};

export default RootLayout;

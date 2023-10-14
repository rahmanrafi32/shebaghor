import {Fragment, ReactNode, useEffect, useState} from "react";
import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import Toolbar from "@mui/material/Toolbar";
import isLoggedIn from "@/utils/isLoggedIn";
import {useRouter} from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';

type IProps = {
    children: ReactNode
}
const RootLayout = ({children}: IProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
    }, [isLoading]);

    if (!isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
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

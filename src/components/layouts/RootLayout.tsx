import {Fragment, ReactNode} from "react";
import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import Toolbar from "@mui/material/Toolbar";

type IProps = {
    children: ReactNode
}
const RootLayout = ({children}: IProps) => {
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

import {ReactElement} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const Profile = () => {
    return (
        <Box>

        </Box>
    );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}


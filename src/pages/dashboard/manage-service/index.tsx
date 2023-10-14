import {ReactElement} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout.";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from 'next/link'


const ManageServices = () => {
    return (
        <Box>
            <Typography variant={'h3'}>Manage Services</Typography>
            <Link href={'/dashboard/manage-service/add-service'}>
                <Button variant={'contained'} sx={{mt: 3}} size={'large'}>Add Service</Button>
            </Link>
        </Box>
    );
};

export default ManageServices;

ManageServices.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

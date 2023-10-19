import {ReactElement, useEffect, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from 'next/link'
import {AlertColor, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteServiceModal from "@/components/DeleteServiceModal";
import {useDeleteServiceMutation, useGetAllServicesQuery} from "@/redux/api/serviceApi";
import CustomSnackBar from "@/components/CustomSnackbar";
import {getUserInfo} from "@/utils/getUserInfo";
import {useRouter} from "next/navigation";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {useAppSelector} from "@/redux/hooks";

type IService = {
    id: string,
    image: string,
    name: string,
    price: string,
    category: string
}
const ManageServices = () => {
    const [deleteService, setDeleteService] = useState<IService | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');
    const user = getUserInfo() as any;
    const router = useRouter();

    const {name, searchTerm} = useAppSelector((state) => state.service.filterOptions)
    const {data: services, isLoading} = useGetAllServicesQuery({name, searchTerm});

    const [deleteServiceApi] = useDeleteServiceMutation();
    const handleDelete = (service: IService) => {
        setDeleteService(service);
        setModalMessage('Are you sure you want to delete this service?')
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteService) {
            const response = await deleteServiceApi(deleteService.id).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message)
            }
        }
        setIsDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setDeleteService(null);
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);

    return (
        <Box>
            <Typography variant={'h4'}>Manage Services</Typography>
            <Link href={'/dashboard/manage-service/add-service'}>
                <Button variant={'contained'} sx={{mt: 3, mb: 2}} size={'large'}>Add Service</Button>
            </Link>
            <Typography variant={'h5'} sx={{mb: 5}}>Service List</Typography>
            <Grid container direction={'row'} justifyContent={'center'} spacing={2}>
                {
                    services?.data?.map((service: IService, index: number) => (
                        <Grid item xs={12} md={3} key={index}>
                            <Card sx={{maxWidth: 350}}>
                                <CardMedia
                                    sx={{height: 150}}
                                    image={service.image}
                                    title={service.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {service.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Category: {service.category}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Price: ${service.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link
                                        href={`/dashboard/manage-service/edit-service/${service.id}`}
                                        style={{textDecoration: 'none', color: '#000'}}
                                    >
                                        <Button size="small">Edit Service</Button>
                                    </Link>
                                    <Button size="small" onClick={() => handleDelete(service)}>Delete Service</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <DeleteServiceModal
                open={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirmDelete={handleConfirmDelete}
                modalMessage={modalMessage}
            />
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Box>
    );
};

export default ManageServices;

ManageServices.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

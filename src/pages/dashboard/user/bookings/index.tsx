import {ReactElement, SyntheticEvent, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useDeleteUserBookingMutation, useGetAllBookingsQuery} from "@/redux/api/bookingApi";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import DeleteServiceModal from "@/components/DeleteServiceModal";
import CustomSnackBar from "@/components/CustomSnackbar";
import {AlertColor} from "@mui/material";

const Bookings = () => {
    const [selectedBooking, setSelectedBooking] = useState('');
    const [modalMessage, setModalMessage] = useState<string>('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const {data: bookings, isLoading} = useGetAllBookingsQuery({});
    const [deleteBooking] = useDeleteUserBookingMutation();

    const tableData = bookings?.data?.map((item: any) => [
        item.service?.name,
        item.service?.price,
        moment(item.bookingTime).format("LLL"),
        item?.bookingStatus,
        item._id
    ]);

    const columns = ["Service Name", "Price", "Booking Time", "Booking Status", {
        name: 'Cancel Booking',
        options: {
            customBodyRender: (_: SyntheticEvent, tableData: any) => {
                console.log('id', tableData.rowData)
                return (
                    <IconButton
                        color={'error'}
                        onClick={() => handleDelete(tableData.rowData[4])}>
                        <DeleteIcon/>
                    </IconButton>
                )
            }
        }
    }];
    const handleDelete = (id: string) => {
        setSelectedBooking(id);
        setModalMessage('Are you sure you want to delete this booking?')
        setDeleteModalOpen(true);
    }

    const handleConfirmDelete = async () => {
        try {
            if (selectedBooking) {
                const response = await deleteBooking(selectedBooking).unwrap();
                if (response && response.success) {
                    setOpen(true);
                    setSeverity('success');
                    setSnackbarMessage(response.message)
                }
                setDeleteModalOpen(false);
            }
        } catch (err: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(err.data)
            setDeleteModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false);
    };


    const options: MUIDataTableOptions = {
        responsive: 'vertical',
        print: false,
        selectableRows: "none",
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant={'h4'} sx={{mb: 3}}>All Bookings</Typography>
            {
                isLoading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box> : <MUIDataTable
                    data={tableData}
                    columns={columns}
                    options={options}
                    title={"Booking Lists"}
                />
            }
            <DeleteServiceModal
                open={isDeleteModalOpen}
                onClose={handleCloseModal}
                onConfirmDelete={handleConfirmDelete}
                modalMessage={modalMessage}
            />
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Box>
    );
};

export default Bookings;

Bookings.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

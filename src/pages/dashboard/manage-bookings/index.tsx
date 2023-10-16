import {ReactElement, SyntheticEvent, useEffect, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {getUserInfo} from "@/utils/getUserInfo";
import {useRouter} from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MUIDataTable from "mui-datatables";
import DeleteServiceModal from "@/components/DeleteServiceModal";
import CustomSnackBar from "@/components/CustomSnackbar";
import {
    useChangeBookingStatusMutation,
    useDeleteBookingMutation,
    useGetAllBookingsForAdminQuery
} from "@/redux/api/bookingApi";
import moment from "moment/moment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const ManageBookings = () => {
    const router = useRouter();
    const user = getUserInfo() as any;
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('success');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState('');
    const [modalMessage, setModalMessage] = useState<string>('')
    const [status, setStatus] = useState('');

    const {data: allBookings, isLoading} = useGetAllBookingsForAdminQuery({});
    const [changeStatus] = useChangeBookingStatusMutation();
    const [deleteBooking] = useDeleteBookingMutation();

    const tableData = allBookings?.data?.map((item: any) => [
        item.service?.name,
        item.service?.price,
        item?.user?.email,
        item?.user?.contactNo,
        `House No: ${item?.user?.houseNo},
        Road No: ${item?.user?.roadNo},
        Floor: ${item?.user?.floor},
        Area: ${item?.user?.area}`,
        moment.unix(item.bookingTime).format("LLL"),
        item?.bookingStatus,
        item._id
    ]);

    const handleChange = async (event: SelectChangeEvent, id: string) => {
        const body = {
            id,
            status: event.target.value
        }
        setStatus(event.target.value)
        try {
            const response = await changeStatus(body).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message)
            }
        } catch (err: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(err.data)
        }

    };

    const columns = ["Service Name", "Price", "Email", "Contact No", "Address", "Booking Time", "Booking Status",
        {
            name: 'Edit Status',
            options: {
                customBodyRender: (_: SyntheticEvent, tableData: any) => {
                    return (
                        <FormControl variant="standard" sx={{minWidth: 80}}>
                            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={status}
                                onChange={(event: SelectChangeEvent) => handleChange(event, tableData.rowData[7])}
                            >
                                <MenuItem value={'pending'}>Pending</MenuItem>
                                <MenuItem value={'accepted'}>Accepted</MenuItem>
                                <MenuItem value={'rejected'}>Rejected</MenuItem>
                            </Select>
                        </FormControl>
                    )
                }
            }
        },
        {
            name: 'Cancel Booking',
            options: {
                customBodyRender: (_: SyntheticEvent, tableData: any) => {
                    return (
                        <IconButton
                            color={'error'}
                            onClick={() => handleDelete(tableData.rowData[7])}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )
                }
            }
        }
    ];

    const options = {
        responsive: 'vertical',
        print: false,
        selectableRows: "none",
    };

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);

    const handleDelete = (id: string) => {
        setSelectedBooking(id);
        setModalMessage('Are you sure you want to delete this booking?')
        setDeleteModalOpen(true);
    }

    const handleConfirmDelete = async () => {
        try {
            if (selectedBooking) {
                console.log('selected booking', selectedBooking)
                const response = await deleteBooking(selectedBooking).unwrap();
                if (response.success) {
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

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant={'h4'} sx={{mb: 5}}>Manage Bookings</Typography>
            {
                isLoading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box> : <MUIDataTable
                    data={tableData}
                    columns={columns}
                    options={options}
                    title={"All Bookings"}
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

export default ManageBookings;

ManageBookings.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

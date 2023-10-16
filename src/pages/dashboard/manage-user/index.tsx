import {ReactElement, SyntheticEvent, useEffect, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MUIDataTable from "mui-datatables";
import DeleteServiceModal from "@/components/DeleteServiceModal";
import EditUserModal from "@/components/EditModal";
import CustomSnackBar from "@/components/CustomSnackbar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteUserMutation, useEditUserMutation, useGetAllUsersQuery} from "@/redux/api/superAdminApi";
import {getUserInfo} from "@/utils/getUserInfo";
import {useRouter} from "next/navigation";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    contactNo: string;
    id: string;
};

const ManageUsers = () => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState<string>('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('success');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const user = getUserInfo() as any;
    const router = useRouter();

    const {data: allUsers, isLoading} = useGetAllUsersQuery({});
    const [deleteUser] = useDeleteUserMutation();
    const [editUserDetails] = useEditUserMutation();

    const tableData = allUsers?.data?.map((item: User) => [
        item.firstName,
        item.lastName,
        item.contactNo,
        item.email,
        item.role,
        item.id
    ]);

    const columns = ["First Name", "Last Name", "Phone Number", "Email", "Role",
        {
            name: 'Edit',
            options: {
                customBodyRender: (_: SyntheticEvent, tableData: any) => {
                    return (
                        <IconButton
                            color={'primary'}
                            onClick={() => handleEdit(tableData.rowData)}>
                            <EditIcon/>
                        </IconButton>
                    )
                }
            }
        },
        {
            name: 'Delete',
            options: {
                customBodyRender: (_: SyntheticEvent, tableData: any) => {
                    return (
                        <IconButton
                            color={'error'}
                            onClick={() => handleDelete(tableData.rowData[5])}>
                            <DeleteIcon/>
                        </IconButton>
                    )
                }
            }
        }];

    const options = {
        responsive: 'vertical',
        print: false,
        selectableRows: "none",
    };

    const handleEdit = (user: string[]) => {
        const selectedUser = {
            firstName: user[0],
            lastName: user[1],
            contactNo: user[2],
            email: user[3],
            role: user[4],
            id: user[5]
        }
        setSelectedUser(selectedUser);
        setEditModalOpen(true);
    };

    const handleConfirmEdit = async (editedUser: Partial<User>) => {
        const response = await editUserDetails(editedUser).unwrap();
        if (response.success) {
            setOpen(true);
            setSeverity('success');
            setSnackbarMessage(response.message)
        }
        setEditModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setSelectedUserId(id);
        setModalMessage('Are you sure you want to delete this user?')
        setDeleteModalOpen(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedUserId) {
            const response = await deleteUser(selectedUserId).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message)
            }
            setDeleteModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false);
    };

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant={'h4'}>Manage Users</Typography>
            <Link href={'/dashboard/manage-user/add-user'} style={{width: '10vw'}}>
                <Button variant={'contained'} sx={{mt: 3, mb: 3, mr: 3}} size={'large'}>Add User</Button>
            </Link>
            {
                isLoading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box> : <MUIDataTable
                    data={tableData}
                    columns={columns}
                    options={options}
                    title={"Users List"}
                />
            }
            <DeleteServiceModal
                open={isDeleteModalOpen}
                onClose={handleCloseModal}
                onConfirmDelete={handleConfirmDelete}
                modalMessage={modalMessage}
            />
            <EditUserModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                user={selectedUser}
                onEdit={handleConfirmEdit}
            />
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Box>
    );
};

export default ManageUsers;

ManageUsers.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

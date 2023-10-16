import {ReactElement, useEffect, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useRouter} from "next/router";
import {useCreateAdminMutation, useCreateUserMutation} from "@/redux/api/superAdminApi";
import CustomSnackBar from "@/components/CustomSnackbar";
import {getUserInfo} from "@/utils/getUserInfo";

interface UserData {
    email: string;
    password: string;
    contactNo: string;
    firstName: string;
    lastName: string;
}

const schema = z.object({
    email: z.string().email({message: 'Invalid email format'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    contactNo: z.string().min(11, {message: 'Invalid contact number'}),
    firstName: z.string().min(1, {message: 'Invalid First Name'}),
    lastName: z.string().min(1, {message: 'Invalid Last Name'}),
});

const AddUser = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('success');
    const user = getUserInfo() as any;

    const [createUser] = useCreateUserMutation();

    const {register, handleSubmit, formState: {errors}} = useForm<UserData>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contactNo: ''
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: UserData) => {
        const response = await createUser(data).unwrap();
        if (response.success) {
            setOpen(true);
            setSeverity('success');
            setSnackbarMessage(response.message)
            setTimeout(() => {
                router.push('/dashboard/manage-user');
            }, 2100);
        }
    };

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                User Registration
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email')}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password')}
                />
                <TextField
                    label="Contact Number"
                    fullWidth
                    margin="normal"
                    error={!!errors.contactNo}
                    helperText={errors.contactNo?.message}
                    {...register('contactNo')}
                />
                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register('firstName')}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register('lastName')}
                />
                <Button
                    type={'submit'}
                    size={'large'}
                    variant={'contained'}
                    color={'secondary'}
                >
                    create
                </Button>
            </form>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Container>
    );
};

export default AddUser;

AddUser.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

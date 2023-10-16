import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import {useCreateUserMutation} from "@/redux/api/superAdminApi";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomSnackBar from "@/components/CustomSnackbar";
import Container from "@mui/material/Container";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import loginImage from "@/assets/12146011_Wavy_Gen-01_Single-07.jpg";
import Link from "next/link";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";
import {setToLocalStorage} from "@/utils/local-storage";

interface UserData {
    email: string;
    password: string;
    contactNo: string;
    firstName: string;
    lastName: string;
    houseNo: string
    roadNo: string
    floor: string
    area: string
}

const schema = z.object({
    email: z.string().email({message: 'Invalid email format'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    contactNo: z.string().min(11, {message: 'Invalid contact number'}),
    firstName: z.string().min(1, {message: 'Invalid First Name'}),
    lastName: z.string().min(1, {message: 'Invalid Last Name'}),
    houseNo: z.string().min(1, {message: 'House no is required'}),
    roadNo: z.string().min(1, {message: 'Road no is required'}),
    floor: z.string().min(1, {message: 'Floor is required'}),
    area: z.string().min(1, {message: 'Area is required'}),
});
const SignUp = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('success');

    const [createUser] = useCreateUserMutation();

    const {register, handleSubmit, formState: {errors}} = useForm<UserData>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contactNo: '',
            houseNo: '',
            roadNo: '',
            floor: '',
            area: ''
        },
        resolver: zodResolver(schema),
    });
    const onSubmit = async (data: UserData) => {
        try {
            const response = await createUser(data).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message)
                setTimeout(() => {
                    router.push('/login');
                }, 2100);
            }
        } catch (err: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(err.data)
        }
    };
    return (
        <Container>
            <Grid container
                  direction={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{height: '100vh', padding: 10}}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{display: 'flex', justifyContent: 'center'}}
                >
                    <Image src={loginImage} alt={'login image'} layout="responsive" width={500} height={600}/>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                >
                    <Typography variant="h4" gutterBottom>
                        User Registration
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    {...register('email')}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    {...register('password')}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    label="Contact Number"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.contactNo}
                                    helperText={errors.contactNo?.message}
                                    {...register('contactNo')}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    {...register('firstName')}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    {...register('lastName')}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    label="House No"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    {...register('houseNo')}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    label="Road No"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    {...register('roadNo')}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    label="Floor"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    {...register('floor')}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    label="Area"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    {...register('area')}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                            <Button
                                type={'submit'}
                                size={'large'}
                                variant={'contained'}
                                color={'secondary'}
                                sx={{minWidth: '20vw'}}
                            >
                                create
                            </Button>
                        </Box>
                    </form>
                    <Typography variant={'subtitle1'} sx={{mt: 3}}>Already have an account? <Link href={'/login'}>Sign
                        in</Link></Typography>
                </Grid>

            </Grid>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Container>
    );
};

export default SignUp;

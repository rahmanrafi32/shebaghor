import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import loginImage from '../../assets/12146011_Wavy_Gen-01_Single-07.jpg'
import Image from "next/image";
import TextField from "@mui/material/TextField";
import {AlertColor, Button, InputAdornment} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import {useUserLoginMutation} from "@/redux/api/authApi";
import {useRouter} from "next/navigation";
import {setToLocalStorage} from "@/utils/local-storage";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import jwt_decode from "jwt-decode";
import Container from "@mui/material/Container";
import Link from "next/link";
import CustomSnackBar from "@/components/CustomSnackbar";

const schema = z.object({
    email: z.string().min(1, {message: "Email is Required"}).email("Enter a valid email"),
    password: z.string().min(1, {message: "Password is Required"})
})

type FormValues = {
    email: string;
    password: string;
}
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(schema)
    })
    const {errors} = formState;

    const [userLogin] = useUserLoginMutation();
    const onSubmit = async (data: FormValues) => {
        try {
            const res = await userLogin({...data}).unwrap();
            const decoded = jwt_decode(res.data) as any;
            setToLocalStorage('token', res.data);
            setToLocalStorage('user_email', decoded?.user);
            setToLocalStorage('user_role', decoded?.role);
            router.push('/');
        } catch (err: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(err.data)
        }
    }
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid
                    container
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
                        <Typography
                            variant={'h3'}
                            sx={{mb: 10}}
                        >
                            Login
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder={'Enter email'}
                            label={'Email'}
                            sx={{mb: 5, width: {md: '30vw', xs: '80vw'}}}
                            {...register('email', {
                                required: "Email is required"
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            placeholder={'Enter password'}
                            label={'Password'}
                            type={showPassword ? 'text' : 'password'}
                            sx={{mb: 5, width: {md: '30vw', xs: '80vw'}}}
                            {...register('password', {
                                required: "Email is required"
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type={'submit'} size={'large'} variant={'contained'} color={'secondary'}>Login</Button>
                        <Typography variant={'subtitle1'} sx={{mt: 3}}>Dont have an account? <Link href={'/signup'}>Create
                            An
                            Account</Link></Typography>
                    </Grid>

                </Grid>
            </form>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Container>
    )
};

export default Login;

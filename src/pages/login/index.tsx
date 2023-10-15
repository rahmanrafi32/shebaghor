import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import loginImage from '../../assets/12146011_Wavy_Gen-01_Single-07.jpg'
import Image from "next/image";
import TextField from "@mui/material/TextField";
import {Button, InputAdornment} from "@mui/material";
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
    const [userLogin] = useUserLoginMutation();
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(schema)
    })
    const {errors} = formState;
    const onSubmit = async (data: FormValues) => {
        const res = await userLogin({...data}).unwrap();
        if (res.success) {
            const decoded = jwt_decode(res.data);
            setToLocalStorage('token', res.data);
            setToLocalStorage('user_email', decoded?.user);
            setToLocalStorage('user_role', decoded?.role);
            router.push('/');
        }
    }
    return (
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
                    <Button type={'submit'} size={'large'} variant={'contained'}>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
};

export default Login;

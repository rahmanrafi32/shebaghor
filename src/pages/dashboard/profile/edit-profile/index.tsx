import {ChangeEvent, FormEvent, ReactElement, useEffect} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {getPublicIdFromUrl, handleDeleteImage} from "@/utils/deleteImage";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import axios from "axios";
import {useUpdateUserInfoMutation, useUserInfoQuery} from "@/redux/api/userApi";
import {AlertColor} from "@mui/material";
import CustomSnackBar from "@/components/CustomSnackbar";
import {useRouter} from "next/navigation";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const EditProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        houseNo: '',
        roadNo: '',
        floor: '',
        area: '',
        image: ''
    });
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');

    const {data: userInfo} = useUserInfoQuery({});
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (userInfo && userInfo.data) {
            setFormData({
                firstName: userInfo?.data?.firstName,
                lastName: userInfo?.data?.lastName,
                contactNo: userInfo?.data?.contactNo,
                email: userInfo?.data?.email,
                houseNo: userInfo?.data?.houseNo || "",
                roadNo: userInfo?.data?.roadNo || "",
                floor: userInfo?.data?.floor || "",
                area: userInfo?.data?.area || "",
                image: userInfo?.data?.image || "",
            });
        }
    }, [userInfo]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
        const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
        let publicId;

        const file = event.target.files?.[0];
        if (file) {
            if (userInfo?.data?.image !== '') {
                publicId = getPublicIdFromUrl(formData.image)
                await handleDeleteImage(publicId);
            }
            try {
                const formData = new FormData();
                formData.append('upload_preset', preset);
                formData.append('file', file);
                let config = {
                    method: 'POST',
                    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    data: formData
                };
                const response = await axios.request(config);
                if (response && response.data && response.data.secure_url) {
                    const imageUrl = response.data.secure_url;
                    setFormData((prevServiceData) => ({
                        ...prevServiceData,
                        image: imageUrl,
                    }));
                }
            } catch (error) {
                setOpen(true);
                setSeverity('error');
                setSnackbarMessage('Something went wrong')
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await updateUserInfo({...formData}).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message)
                setTimeout(() => {
                    router.push('/dashboard/profile');
                }, 2100);
            }
        } catch (error: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(error.data)
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        {
                            formData.image ? <Image
                                src={formData.image}
                                alt={'Profile image'}
                                width={300}
                                height={300}
                                style={{borderRadius: '50%'}}
                            /> : null
                        }
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon/>}
                            sx={{width: {md: '10vw'}, mt: 2}}
                            color={'secondary'}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                        </Button>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Contact No"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="House No"
                            name="houseNo"
                            value={formData.houseNo}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Road No"
                            name="roadNo"
                            value={formData.roadNo}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Floor"
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={6}>

                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </form>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Container>
    );
};

export default EditProfile;

EditProfile.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {AlertColor, Button, Container, FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from "@mui/material/styles";
import axios from "axios";
import Image from "next/image";
import {useAddServiceMutation} from "@/redux/api/serviceApi";
import {useRouter} from "next/navigation";
import CustomSnackBar from "@/components/CustomSnackbar";
import {getUserInfo} from "@/utils/getUserInfo";
import MenuItem from "@mui/material/MenuItem";

interface ServiceData {
    name: string;
    image: string;
    price: string;
    category: string;
    whatsInclude: string[];
    whatsExclude: string[];
    details: string;
    serviceType: string
}

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

const AddService = () => {
    const [serviceData, setServiceData] = useState<ServiceData>({
        name: '',
        image: '',
        price: '',
        category: '',
        whatsInclude: [''],
        whatsExclude: [''],
        details: '',
        serviceType: ''
    });
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');

    const [createService] = useAddServiceMutation();
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
        const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
        if (file) {
            try {
                const formData = new FormData();
                formData.append('upload_preset', uploadPreset);
                formData.append('file', file);
                let config = {
                    method: 'POST',
                    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    data: formData
                };
                const response = await axios.request(config);
                if (response && response.data && response.data.secure_url) {
                    const imageUrl = response.data.secure_url;
                    setServiceData((prevServiceData) => ({
                        ...prevServiceData,
                        image: imageUrl,
                    }));
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleChange = (field: keyof ServiceData, index?: number) =>
        (event: any) => {
            const updatedData = {...serviceData};
            if (field === 'whatsInclude' || field === 'whatsExclude') {
                if (index !== undefined) {
                    updatedData[field][index] = event.target.value;
                }
            } else {
                updatedData[field] = event.target.value;
            }
            setServiceData(updatedData);
        };

    const addField = (field: 'whatsInclude' | 'whatsExclude') => {
        const updatedData = {...serviceData};
        updatedData[field].push('');
        setServiceData(updatedData);
    };

    const removeField = (field: 'whatsInclude' | 'whatsExclude', index: number) => {
        const updatedData = {...serviceData};
        updatedData[field].splice(index, 1);
        setServiceData(updatedData);
    };

    const handleSubmit = async () => {
        try {
            const response = await createService(serviceData).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message)
                setTimeout(() => {
                    router.push('/dashboard/manage-service');
                }, 2100);
            }
        } catch (error: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(error.data)
        }
    };

    const user = getUserInfo() as any;

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Create a New Service
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={serviceData.name}
                            onChange={handleChange('name')}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        {
                            serviceData.image ? <Image
                                src={serviceData.image}
                                alt={'service image'}
                                width={200}
                                height={200}
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
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Service Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={serviceData.serviceType}
                                label="Service Type"
                                onChange={handleChange('serviceType')}
                            >
                                <MenuItem value={'regular'}>Regular</MenuItem>
                                <MenuItem value={'featured'}>Featured</MenuItem>
                                <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Price"
                            fullWidth
                            value={serviceData.price}
                            onChange={handleChange('price')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Category"
                            fullWidth
                            value={serviceData.category}
                            onChange={handleChange('category')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Service Details"
                            fullWidth
                            multiline
                            maxRows={4}
                            value={serviceData.details}
                            onChange={handleChange('details')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            What&apos;s Included
                        </Typography>
                        {serviceData.whatsInclude.map((item, index) => (
                            <Box key={index} display="flex" alignItems="center" sx={{mt: 1}}>
                                <TextField
                                    fullWidth
                                    value={item}
                                    onChange={handleChange('whatsInclude', index)}
                                />
                                <AddCircle
                                    color="primary"
                                    onClick={() => addField('whatsInclude')}
                                />
                                {index > 0 && (
                                    <RemoveCircle
                                        color="error"
                                        onClick={() => removeField('whatsInclude', index)}
                                    />
                                )}
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            What&apos;s Excluded
                        </Typography>
                        {serviceData.whatsExclude.map((item, index) => (
                            <Box key={index} display="flex" alignItems="center" sx={{mt: 1}}>
                                <TextField
                                    fullWidth
                                    value={item}
                                    onChange={handleChange('whatsExclude', index)}
                                />
                                <AddCircle
                                    color="primary"
                                    onClick={() => addField('whatsExclude')}
                                />
                                {index > 0 && (
                                    <RemoveCircle
                                        color="error"
                                        onClick={() => removeField('whatsExclude', index)}
                                    />
                                )}
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            disabled={
                                serviceData.name === '' ||
                                serviceData.image === '' ||
                                serviceData.price === '' ||
                                serviceData.category === '' ||
                                serviceData.details === ''
                            }
                        >
                            Create Service
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <CustomSnackBar
                open={open}
                setOpen={setOpen}
                message={snackbarMessage}
                severity={severity}
            />
        </Container>
    );
};

export default AddService;

AddService.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

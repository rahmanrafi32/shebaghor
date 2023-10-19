import React, {useState, ChangeEvent, ReactElement, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import {useEditServiceMutation, useGetServiceByIdQuery} from "@/redux/api/serviceApi";
import {useRouter} from "next/router";
import axios from "axios";
import {getPublicIdFromUrl, handleDeleteImage} from "@/utils/deleteImage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import CircularProgress from "@mui/material/CircularProgress";
import {AlertColor} from "@mui/material";
import CustomSnackBar from "@/components/CustomSnackbar";


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

interface EditData {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    whatsInclude: string[];
    whatsExclude: string[];
    details: string;
    serviceType: string;
}

const EditService = () => {
    const {query} = useRouter();
    const id = query.id as string;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [editedData, setEditedData] = useState<EditData>({
        id: '',
        name: '',
        price: '',
        category: '',
        image: '',
        whatsInclude: [],
        whatsExclude: [],
        details: '',
        serviceType: '',
    });

    const {data: service, isLoading} = useGetServiceByIdQuery(id);
    const [editService] = useEditServiceMutation();

    useEffect(() => {
        if (service && service.data) {
            setEditedData({
                id,
                name: service.data.name,
                price: service.data.price,
                image: service.data.image,
                category: service.data.category,
                whatsInclude: service.data.whatsInclude || [],
                whatsExclude: service.data.whatsExclude || [],
                details: service.data.details || '',
                serviceType: service.data.serviceType || ""
            });
        }
    }, [id, service]);
    const handleFieldChange = (
        field: keyof EditData,
        value: string
    ) => {
        setEditedData({...editedData, [field]: value});
    };

    const handleArrayChange = (
        field: 'whatsInclude' | 'whatsExclude',
        value: string,
        index: number
    ) => {
        const updatedArray = [...editedData[field]];
        updatedArray[index] = value;
        setEditedData({...editedData, [field]: updatedArray});
    };

    const handleAddArrayItem = (field: 'whatsInclude' | 'whatsExclude') => {
        setEditedData({...editedData, [field]: [...editedData[field], '']});
    };

    const handleRemoveArrayItem = (
        field: 'whatsInclude' | 'whatsExclude',
        index: number
    ) => {
        const updatedArray = [...editedData[field]];
        updatedArray.splice(index, 1);
        setEditedData({...editedData, [field]: updatedArray});
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
        const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
        const publicId = getPublicIdFromUrl(editedData.image);
        const {data}: any = await handleDeleteImage(publicId);

        const file = event.target.files?.[0];
        if (file && data.result === 'ok') {
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
                    setEditedData((prevServiceData) => ({
                        ...prevServiceData,
                        image: imageUrl,
                    }));
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleSave = async () => {
        try {
            const response = await editService(editedData).unwrap();
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

    return (
        <Container>
            {
                isLoading ?
                    <Box sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress/>
                    </Box> : (<Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={editedData.name}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Price"
                                fullWidth
                                value={editedData.price}
                                onChange={(e) => handleFieldChange('price', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            {
                                editedData.image ? <Image
                                    src={editedData.image}
                                    alt={'service image'}
                                    width={200}
                                    height={200}
                                    style={{marginLeft: '20px'}}
                                /> : null
                            }
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon/>}
                                sx={{width: {md: '10vw'}, mt: 2, ml: {md: 2}}}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Details"
                                fullWidth
                                multiline
                                maxRows={10}
                                value={editedData.details}
                                onChange={(e) => handleFieldChange('details', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Service Type"
                                fullWidth
                                select
                                value={editedData.serviceType}
                                onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                            >
                                <MenuItem value="featured">Featured</MenuItem>
                                <MenuItem value="regular">Regular</MenuItem>
                                <MenuItem value="upcoming">Upcoming</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Category"
                                fullWidth
                                value={editedData.category}
                                onChange={(e) => handleFieldChange('category', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <p>Whats Included:</p>
                                {editedData.whatsInclude.map((item, index) => (
                                    <Box key={index} display="flex" alignItems="center">
                                        <TextField
                                            fullWidth
                                            value={item}
                                            label={`Item ${index + 1}`}
                                            sx={{mt: 2}}
                                            onChange={(e) =>
                                                handleArrayChange('whatsInclude', e.target.value, index)
                                            }
                                        />
                                        <IconButton
                                            color="error"
                                            aria-label="remove"
                                            onClick={() => handleRemoveArrayItem('whatsInclude', index)}
                                        >
                                            <RemoveIcon/>
                                        </IconButton>
                                    </Box>
                                ))}
                                <Button onClick={() => handleAddArrayItem('whatsInclude')}>
                                    Add Item
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <p>Whats Excluded:</p>
                                {editedData.whatsExclude.map((item, index) => (
                                    <Box key={index} display="flex" alignItems="center">
                                        <TextField
                                            fullWidth
                                            label={`Item ${index + 1}`}
                                            sx={{mt: 2}}
                                            value={item}
                                            onChange={(e) =>
                                                handleArrayChange('whatsExclude', e.target.value, index)
                                            }
                                        />
                                        <IconButton
                                            color="error"
                                            aria-label="remove"
                                            onClick={() => handleRemoveArrayItem('whatsExclude', index)}
                                        >
                                            <RemoveIcon/>
                                        </IconButton>
                                    </Box>
                                ))}
                                <Button onClick={() => handleAddArrayItem('whatsExclude')}>
                                    Add Item
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item
                              xs={12}
                              sx={{display: 'flex', justifyContent: 'center'}}
                        >
                            <Button variant={'contained'} color={'secondary'} size={'large'} onClick={handleSave}>Edit
                                Service</Button>
                        </Grid>
                    </Grid>)
            }
            <CustomSnackBar
                open={open}
                setOpen={setOpen}
                message={snackbarMessage}
                severity={severity}
            />
        </Container>
    );
};

export default EditService;

EditService.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import RootLayout from "@/components/layouts/RootLayout";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import Container from "@mui/material/Container";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useEditServiceMutation, useGetServiceByIdQuery} from "@/redux/api/serviceApi";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import axios from "axios";
import {getPublicIdFromUrl, handleDeleteImage} from "@/utils/deleteImage";
import CustomSnackBar from "@/components/CustomSnackbar";

type editData = {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    whatsInclude: string[];
    whatsExclude: string[];
};

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

const EditService = () => {
    const {query} = useRouter();
    const id = query.id as string;
    const router = useRouter();
    const {data: service, isLoading} = useGetServiceByIdQuery(id);
    const [editService] = useEditServiceMutation();
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<editData>({
        id: "",
        name: "",
        price: "",
        category: "",
        image: "",
        whatsInclude: [],
        whatsExclude: [],
    });
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState('success');
    const {name, price, category, whatsInclude, whatsExclude, image} = editData;

    useEffect(() => {
        if (service && service.data) {
            setEditData({
                id,
                name: service.data.name,
                price: service.data.price,
                image: service.data.image,
                category: service.data.category,
                whatsInclude: service.data.whatsInclude || [],
                whatsExclude: service.data.whatsExclude || [],
            });
        }
    }, [service]);

    const handleFormChange = (field: keyof editData, value: string | string[]) => {
        setEditData({
            ...editData,
            [field]: value,
        });
    };

    const addNewField = (field: keyof editData) => {
        setEditData({
            ...editData,
            [field]: [...editData[field], ""],
        });
    };

    const removeField = (field: string, index: number) => {
        const updatedArray = [...editData[field]];
        updatedArray.splice(index, 1);
        setEditData({
            ...editData,
            [field]: updatedArray,
        });
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const cloudName = 'dttxxnsvp';
        const preset = 'rpmssokb'
        const publicId = getPublicIdFromUrl(editData.image);
        const {data} = await handleDeleteImage(publicId);

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
                    setEditData((prevServiceData) => ({
                        ...prevServiceData,
                        image: imageUrl,
                    }));
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleEditSubmitButton = async () => {
        const response = await editService(editData).unwrap();
        if (response.success) {
            setOpen(true);
            setSeverity('success');
            setSnackbarMessage('Service edited successfully')
            setTimeout(() => {
                router.push('/dashboard/manage-service');
            }, 2100);
        }
    }

    return (
        <Container>
            <Typography variant={'h3'} align={'center'} sx={{m: 3}}>Edit Service</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={price}
                        onChange={(e) => handleFormChange("price", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    {
                        image ? <Image
                            src={image}
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
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={category}
                        onChange={(e) => handleFormChange("category", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">What&apos;s Included</Typography>
                    {whatsInclude.map((item, index: number) => (
                        <Box key={index} display="flex" alignItems="center">
                            <TextField
                                fullWidth
                                label={`Item ${index + 1}`}
                                variant="outlined"
                                value={item}
                                onChange={(e) =>
                                    handleFormChange("whatsInclude", [
                                        ...whatsInclude.slice(0, index),
                                        e.target.value,
                                        ...whatsInclude.slice(index + 1),
                                    ])
                                }
                                sx={{mt: 2}}
                            />
                            <IconButton
                                color="error"
                                aria-label="remove"
                                onClick={() => removeField("whatsInclude", index)}
                            >
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton
                                color="primary"
                                aria-label="add"
                                onClick={() => addNewField("whatsInclude")}
                            >
                                <AddIcon/>
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">What&apos;s Excluded</Typography>
                    {whatsExclude.map((item, index: number) => (
                        <Box key={index} display="flex" alignItems="center">
                            <TextField
                                fullWidth
                                label={`Item ${index + 1}`}
                                variant="outlined"
                                value={item}
                                onChange={(e) =>
                                    handleFormChange("whatsExclude", [
                                        ...whatsInclude.slice(0, index),
                                        e.target.value,
                                        ...whatsInclude.slice(index + 1),
                                    ])
                                }
                                sx={{mt: 2}}
                            />
                            <IconButton
                                color="error"
                                aria-label="remove"
                                onClick={() => removeField("whatsExclude", index)}
                            >
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton
                                color="primary"
                                aria-label="add"
                                onClick={() => addNewField("whatsExclude")}
                            >
                                <AddIcon/>
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        size={"large"}
                        onClick={handleEditSubmitButton}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
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
    return <RootLayout>{page}</RootLayout>;
};
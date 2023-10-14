import {ChangeEvent, ReactElement, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout.";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Button, Container} from "@mui/material";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from "@mui/material/styles";
import axios from "axios";
import Image from "next/image";
import {useAddServiceMutation} from "@/redux/api/serviceApi";

interface ServiceData {
    name: string;
    image: string;
    price: string;
    category: string;
    whatsInclude: string[];
    whatsExclude: string[];
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
    });

    const [createService] = useAddServiceMutation();
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('upload_preset', 'rpmssokb');
                formData.append('file', file);
                let config = {
                    method: 'POST',
                    url: 'https://api.cloudinary.com/v1_1/dttxxnsvp/image/upload',
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
        (event: ChangeEvent<HTMLInputElement>) => {
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

    const addField = (field: keyof ServiceData) => {
        const updatedData = {...serviceData};
        updatedData[field].push('');
        setServiceData(updatedData);
    };

    const removeField = (field: keyof ServiceData, index: number) => {
        const updatedData = {...serviceData};
        updatedData[field].splice(index, 1);
        setServiceData(updatedData);
    };

    const handleSubmit = async () => {
        try {
            const response = await createService(serviceData).unwrap();
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };
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
                    <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        {
                            serviceData.image ? <Image
                                src={serviceData.image}
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
                            sx={{width: {md: '10vw'}, mt: 2}}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            fullWidth
                            value={serviceData.price}
                            onChange={handleChange('price')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Category"
                            fullWidth
                            value={serviceData.category}
                            onChange={handleChange('category')}
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
                            color="primary"
                            onClick={handleSubmit}
                            disabled={serviceData.name === '' || serviceData.image === '' || serviceData.price === '' || serviceData.category === ''}
                        >
                            Create Service
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddService;

AddService.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

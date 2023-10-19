import {ReactElement, useEffect, useState} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useRouter} from "next/navigation";
import {getUserInfo} from "@/utils/getUserInfo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAddContentMutation} from "@/redux/api/contentApi";
import {AlertColor} from "@mui/material";
import CustomSnackBar from "@/components/CustomSnackbar";

interface ContentItem {
    header: string;
    details: string;
}

const ManageContents = () => {
    const router = useRouter();
    const user = getUserInfo() as any;

    useEffect(() => {
        if (user.role === 'user') {
            router.push('/')
        }
    }, [router, user]);

    const [content, setContent] = useState<ContentItem[]>([{header: '', details: ''}]);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [addContent] = useAddContentMutation();
    const addContentField = () => {
        setContent([...content, {header: '', details: ''}]);
    };

    const removeContentField = () => {
        if (content.length > 1) {
            const updatedContent = [...content];
            updatedContent.pop();
            setContent(updatedContent);
        }
    };

    const handleHeaderChange = (index: number, value: string) => {
        const updatedContent = [...content];
        updatedContent[index].header = value;
        setContent(updatedContent);
    };

    const handleDetailsChange = (index: number, value: string) => {
        const updatedContent = [...content];
        updatedContent[index].details = value;
        setContent(updatedContent);
    };

    const handleContentSubmit = async () => {
        try {
            const response = await addContent(content).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message);
                setContent([{header: '', details: ''}])
            }
        } catch (err: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(err.data)
        }
    };

    return (
        <Container>
            <Typography variant={'h4'}>Add Content</Typography>
            {
                content.map((item, index) => (
                    <Grid container key={index} spacing={3} sx={{mt: 2}}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Content Header"
                                value={item.header}
                                onChange={(e) => handleHeaderChange(index, e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={20}
                                label="Content Details"
                                value={item.details}
                                onChange={(e) => handleDetailsChange(index, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                ))
            }

            <Box>
                <Button
                    variant="contained"
                    onClick={addContentField}
                    color={'secondary'}
                    sx={{mt: 2}}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    onClick={removeContentField}
                    color={'secondary'}
                    sx={{ml: 2, mt: 2}}
                >
                    Remove
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    sx={{mt: 2, ml: 2}}
                    onClick={handleContentSubmit}
                >
                    Submit
                </Button>
            </Box>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </Container>

    );
};

export default ManageContents;

ManageContents.getLayout = function getLayout(page: ReactElement) {
    return (<DashboardLayout>{page}</DashboardLayout>)
}

import React, {useState} from 'react';
import {Container, Typography, Link, Grid, Modal, AlertColor} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useGiveFeedbackMutation} from "@/redux/api/feedbackApi";
import CustomSnackBar from "@/components/CustomSnackbar";

const Footer = () => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>('success');

    const [giveFeedback] = useGiveFeedbackMutation()
    const openFeedbackForm = () => {
        setIsFeedbackOpen(true);
    }

    const closeFeedbackForm = () => {
        setIsFeedbackOpen(false);
    }

    const submitFeedback = async () => {
        try {
            const response = await giveFeedback(feedbackMessage).unwrap();
            if (response.success) {
                setOpen(true);
                setSeverity('success');
                setSnackbarMessage(response.message);
            }
        } catch (err: any) {
            setOpen(true);
            setSeverity('error');
            setSnackbarMessage(err.data)
        }
        closeFeedbackForm();
    }

    return (
        <footer>
            <Box bgcolor="secondary.dark" color="white" py={3} sx={{mt: 5}}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">Sheba Ghor</Typography>
                            <Typography variant="body1">
                                Address: 1234 Main St, City, Country
                            </Typography>
                            <Typography variant="body1">
                                Phone: +1 (123) 456-7890
                            </Typography>
                            <Typography variant="body1">
                                Email: contact@shebaghor.com
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{display: 'flex', justifyContent: {md: 'flex-end'}, mt: {xs: 5}}}>
                            < Box>
                                < Typography variant="h6">Connect with Us</Typography>
                                <Link style={{color: 'white'}} href="https://github.com/rahmanrafi32" target="_blank"
                                      rel="noopener noreferrer">
                                    <GitHubIcon fontSize="large"/>
                                </Link>
                                <Link style={{color: 'white'}} href="https://www.linkedin.com/in/yourlinkedin"
                                      target="_blank"
                                      rel="noopener noreferrer">
                                    <LinkedInIcon fontSize="large"/>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{display: 'flex', justifyContent: {md: 'flex-end'}, mt: {xs: 5}}}>
                            <Box>
                                <Typography variant="h6">Have Something To Say?</Typography>
                                <Button sx={{color: '#fff'}} variant="contained" onClick={openFeedbackForm}>
                                    Send Feedback
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Modal open={isFeedbackOpen} onClose={closeFeedbackForm}>
                <Box p={2} bgcolor="white"
                     sx={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         width: '25vw',
                         height: '30vh',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center',
                         borderRadius: '5px'
                     }}>
                    <Typography variant="h6">Send Feedback</Typography>
                    <Box>
                        <TextField
                            label="Your Feedback"
                            variant="outlined"
                            fullWidth
                            multiline
                            maxRows={4}
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                            sx={{mt: 3}}
                        />
                        <Button sx={{mt: 3}} variant="contained" color="primary" onClick={submitFeedback}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Box p={2} bgcolor={'secondary.main'}>
                <Typography variant="body2" align="center" sx={{color: "#fff"}}>
                    &copy; {new Date().getFullYear()} Sheba Ghor. All rights reserved.
                </Typography>
            </Box>
            <CustomSnackBar open={open} setOpen={setOpen} message={snackbarMessage} severity={severity}/>
        </footer>
    );
};

export default Footer;

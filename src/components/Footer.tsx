import React from 'react';
import {Container, Typography, Link, Grid} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from "@mui/material/Box";

const Footer = () => {
    return (
        <footer>
            <Box bgcolor="secondary.dark" color="white" py={3} sx={{mt: 5}}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: {md: 'flex-end'}, mt: {xs: 5}}}>
                            < Box>
                                < Typography variant="h6">Connect with Us</Typography>
                                <Link href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
                                    <GitHubIcon fontSize="large"/>
                                </Link>
                                <Link href="https://www.linkedin.com/in/yourlinkedin" target="_blank"
                                      rel="noopener noreferrer">
                                    <LinkedInIcon fontSize="large"/>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box p={2} bgcolor={'secondary.main'}>
                <Typography variant="body2" align="center" sx={{color: "#fff"}}>
                    &copy; {new Date().getFullYear()} Sheba Ghor. All rights reserved.
                </Typography>
            </Box>

        </footer>
    );
};

export default Footer;

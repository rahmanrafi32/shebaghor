import React, {ReactElement} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RootLayout from "@/components/layouts/RootLayout";
import Toolbar from "@mui/material/Toolbar";
import {useGetContentsQuery} from "@/redux/api/contentApi";

const TermsAndConditions = () => {
    const {data: contents} = useGetContentsQuery({});
    return (
        <Container maxWidth="md">
            <Toolbar/>
            <Typography align={'center'} variant="h4" gutterBottom>
                Terms & Conditions
            </Typography>
            {
                contents?.data?.map((content: { header: string, details: string }, index: number) => (
                    <div key={index}>
                        <Typography variant="h6" gutterBottom>
                            {content.header}
                        </Typography>
                        <Typography variant="body1" paragraph>{content.details}</Typography>
                    </div>
                ))
            }
        </Container>
    );
};

export default TermsAndConditions;

TermsAndConditions.getLayout = function getLayout(page: ReactElement) {
    return (<RootLayout>{page}</RootLayout>)
}


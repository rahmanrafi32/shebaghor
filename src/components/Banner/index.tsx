'use client'
import Image from "next/image";
import BannerImage from '../../assets/banner_image.jpg'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Banner = () => {
    return (
        <Box sx={{position: 'relative', width: '100%', height: '550px'}}>
            <Image
                src={BannerImage}
                alt="Banner Image"
                layout="fill"
                objectFit="cover"
                style={{ filter: 'brightness(40%)' }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Typography variant={'h2'}>Your Personal Assistant</Typography>
                <Typography variant={'h6'}>One-stop solution for your services. Order any service, anytime.</Typography>
            </Box>
        </Box>
    );
};

export default Banner;

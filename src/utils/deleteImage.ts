import axios, {AxiosResponse} from "axios";
import crypto from "crypto";
import moment from "moment";

const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET as string;
const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
type DeleteImageResponse = {
    result: string; // Adjust this to match the actual structure of the response
    // Other properties if applicable
};

export const getPublicIdFromUrl = (url: string): string | null => {
    const regex = /\/v\d+\/([^/]+\/[^/]+)\.\w{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const generateSignature = (publicId: string | null, apiKey: string, apiSecret: string) => {
    const timestamp = moment().unix();
    const dataToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    return crypto.createHash("sha1").update(dataToSign).digest("hex");
};

export const handleDeleteImage = async (publicId: string | null) => {
    const signature = generateSignature(publicId, apiKey, apiSecret);
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    try {
        const response: AxiosResponse<DeleteImageResponse> = await axios.post(url, null, {
            params: {
                public_id: publicId,
                signature: signature,
                api_key: apiKey,
                timestamp: moment().unix(),
            },
        });
        if(response && response.data)
            return response.data;
    } catch (error) {
        console.error(error);
    }
};
